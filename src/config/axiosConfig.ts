import axios from 'axios';
import { env } from '@/config/env';
import { SECURITY_CONFIG, validateSecurityConfig } from '@/shared/utils/common/constants';

if (typeof window !== 'undefined') {
  validateSecurityConfig();
}

class CsrfTokenManager {
  private static token: string | null = null;
  private static lastFetched: number = 0;
  private static pendingRequest: Promise<string | null> | null = null;
  private static readonly TOKEN_TTL = 5 * 60 * 1000;

  static clearToken(): void {
    CsrfTokenManager.token = null;
    CsrfTokenManager.lastFetched = 0;
  }

  static async getCsrfToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;

    const isTokenFresh = CsrfTokenManager.token &&
      (Date.now() - CsrfTokenManager.lastFetched) < CsrfTokenManager.TOKEN_TTL;

    if (isTokenFresh) {
      return CsrfTokenManager.token;
    }

    if (CsrfTokenManager.pendingRequest) {
      return CsrfTokenManager.pendingRequest;
    }

    CsrfTokenManager.pendingRequest = CsrfTokenManager.fetchCsrfToken();
    const token = await CsrfTokenManager.pendingRequest;
    CsrfTokenManager.pendingRequest = null;
    return token;
  }

  private static async fetchCsrfToken(): Promise<string | null> {
    try {
      const response = await fetch(`${env.API_URL}/security/csrf-token`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json() as { token?: string };
      CsrfTokenManager.token = data?.token || null;
      CsrfTokenManager.lastFetched = Date.now();
      return CsrfTokenManager.token;
    } catch (error) {
      console.error('[CSRF] Error while fetching CSRF token:', error);
      return null;
    }
  }
}

class TokenManager {
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS);
  }

  static setAccessToken(accessToken: string): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS, accessToken);
    sessionStorage.setItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS + '_time', Date.now().toString());
  }

  static clearAccessToken(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS);
    sessionStorage.removeItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS + '_time');
  }

  static isTokenValid(): boolean {
    if (typeof window === 'undefined') return false;

    const token = sessionStorage.getItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS);
    const tokenTime = sessionStorage.getItem(SECURITY_CONFIG.TOKEN_KEYS.ACCESS + '_time');

    if (!token || !tokenTime) return false;

    const tokenAge = Date.now() - parseInt(tokenTime);
    const maxAge = SECURITY_CONFIG.JWT.ACCESS_TOKEN_LIFETIME;

    return tokenAge < maxAge;
  }

  static hasValidTokens = (): boolean => {
    return TokenManager.isTokenValid();
  };

  static clearAllTokens(): void {
    TokenManager.clearAccessToken();
    CsrfTokenManager.clearToken();
  }
}

const AUTH_REQUIRED_PATTERNS = [
  '/auth/logout',
  '/auth/me',
  '/characters',
  '/game',
  '/posts',
  '/comments',
  '/multiplayer',
] as const;

const AUTH_REQUIRED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'] as const;

const requiresAuth = (config: {
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  _retry?: boolean;
}): boolean => {
  const url = config.url || '';
  const method = (config.method || 'GET').toUpperCase();
  
  const needsAuthForEndpoint = AUTH_REQUIRED_PATTERNS.some(pattern => 
    url.includes(pattern)
  );
  
  const needsAuthForMethod = AUTH_REQUIRED_METHODS.includes(method as any);
  
  if (method === 'GET' && (url.includes('/posts') || url.includes('/comments'))) {
    return false;
  }
  
  return needsAuthForEndpoint || needsAuthForMethod;
};

const createApiClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    timeout: SECURITY_CONFIG.API.TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    xsrfCookieName: '',
    xsrfHeaderName: '',
  });

  client.interceptors.request.use(
    (async (config: any) => {
      if (!config.headers) {
        config.headers = {};
      }

      const headers = config.headers as Record<string, unknown> & {
        set?: (name: string, value: string) => void;
        delete?: (name: string) => void;
      };
      const setHeader = (key: string, value: string) => {
        if (typeof headers.set === 'function') {
          headers.set(key, value);
        } else {
          (headers as Record<string, string>)[key] = value;
        }
      };
      const removeHeader = (key: string) => {
        if (typeof headers.delete === 'function') {
          headers.delete(key);
        } else if (typeof headers.set === 'function') {
          headers.set(key, undefined as unknown as string);
        } else {
          delete (headers as Record<string, string | undefined>)[key];
        }
      };

      if (requiresAuth(config)) {
        const token = TokenManager.getAccessToken();
        if (token) {
          setHeader('Authorization', `${SECURITY_CONFIG.JWT.TOKEN_TYPE} ${token}`);
        }
      }

      const method = (config.method || 'GET').toUpperCase();
      const needsCsrfProtection = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

      if (!needsCsrfProtection) {
        removeHeader('X-XSRF-TOKEN');
        removeHeader('x-xsrf-token');
      } else {
        const getCookie = (name: string): string | null => {
          if (typeof document === 'undefined') return null;
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            const cookieValue = parts.pop();
            return cookieValue ? cookieValue.split(';').shift() || null : null;
          }
          return null;
        };

        let csrfToken = getCookie('XSRF-TOKEN');

        if (!csrfToken) {
          await CsrfTokenManager.getCsrfToken();
          csrfToken = getCookie('XSRF-TOKEN');
        }

        if (csrfToken) {
          setHeader('X-XSRF-TOKEN', csrfToken);
        }
      }

      return config;
    }) as any,
    (error) => {
      console.error('[API] Request Error:', error);
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: unknown) => {
      const axiosError = error as {
        config?: Record<string, unknown> & { _retry?: boolean };
        response?: {
          status: number;
          data: unknown;
          statusText?: string;
        };
        message?: string;
      };

      const originalRequest = axiosError.config;

      if (axiosError.response?.status === 401 && 
          originalRequest && 
          !originalRequest._retry &&
          requiresAuth(originalRequest)) {
        
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            `${env.API_URL}/auth/refresh`, 
            {}, 
            { 
              withCredentials: true,
              timeout: SECURITY_CONFIG.API.TIMEOUT_MS
            }
          );

          const responseData = refreshResponse.data as { 
            accessToken: string; 
          };
          
          TokenManager.setAccessToken(responseData.accessToken);

          const retryConfig = {
            ...originalRequest,
            headers: {
              ...(originalRequest.headers as Record<string, string> || {}),
              Authorization: `${SECURITY_CONFIG.JWT.TOKEN_TYPE} ${responseData.accessToken}`,
            },
          };
          
          return client(retryConfig as unknown as Parameters<typeof client>[0]);
          
        } catch (refreshError) {
          console.error('[API] Token refresh failed:', refreshError);
          
          TokenManager.clearAllTokens();
          
          try {
            await axios.post(`${env.API_URL}/auth/logout`, {}, {
              withCredentials: true,
              timeout: 3000
            });
          } catch {
          }
          
          try {
            const { useAuthStore } = await import('@/shared/store/authStore');
            await useAuthStore.getState().logout();
          } catch {
          }
          
          if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname + window.location.search;
            const redirectUrl = `/auth/login?redirect=${encodeURIComponent(currentPath)}&reason=session_expired`;
            window.location.href = redirectUrl;
          }
          
          return Promise.reject(refreshError);
        }
      }

      if (error && typeof error === 'object' && 'config' in error && typeof (error as { config?: unknown }).config === 'object') {
        const requestConfig = (error as { config: Record<string, unknown>; response?: Record<string, unknown> }).config;
        const method = ((requestConfig.method as string) || 'GET').toUpperCase();
        const needsCsrfProtection = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

        const responseStatus = (error as { response?: { status?: number } }).response?.status;

        if (responseStatus === 403 && needsCsrfProtection && !requestConfig._csrfRetry) {

          const getCookie = (name: string): string | null => {
            if (typeof document === 'undefined') return null;
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
              const cookieValue = parts.pop();
              return cookieValue ? cookieValue.split(';').shift() || null : null;
            }
            return null;
          };

          let csrfToken = getCookie('XSRF-TOKEN');

          if (!csrfToken) {
            await CsrfTokenManager.getCsrfToken();
            csrfToken = getCookie('XSRF-TOKEN');
          }

          if (csrfToken && requestConfig.headers) {
            (requestConfig.headers as Record<string, string>)['X-XSRF-TOKEN'] = csrfToken;
            requestConfig._csrfRetry = true;
            return client(requestConfig as unknown as Parameters<typeof client>[0]);
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient(env.API_URL);
export const aiClient = createApiClient(env.AI_URL);

export const api = {
  get: async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  post: async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

export const publicApi = {
  getPosts: async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  getPost: async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  getComments: async <T>(url: string, config?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
};

export const aiApi = {
  post: async <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> => {
    const response = await aiClient.post<T>(url, data, config);
    return response.data;
  },
};

export { TokenManager, CsrfTokenManager };
export default api;
