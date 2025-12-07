import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  AuthState,
  TokenInfo,
  AuthError,
  CurrentUser,
  LoginRequest,
  SignupRequest
} from '@/shared/types/auth';
import { api, TokenManager } from '@/config/axiosConfig';
import { API_ENDPOINTS, apiErrorHandler } from '@/shared/utils/common/api';
import { env } from '@/config/env';
import { ApiResponse } from '@/shared/types/common';
import { SECURITY_CONFIG } from '@/shared/utils/common/constants';

interface JwtAuthResponse {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  userId: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

interface AuthActions {
  login: (credentials: LoginRequest | Record<string, never>, isDemo?: boolean) => Promise<AuthResult>;
  logout: () => Promise<void>;
  signup: (userData: SignupRequest) => Promise<AuthResult>;
  refreshToken: () => Promise<boolean>;
  clearTokens: () => void;
  checkAuthStatus: () => Promise<void>;
  updateUser: (user: Partial<CurrentUser>) => void;
  fetchCurrentUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  clearError: () => void;
  reset: () => void;
  isAuthenticated: () => boolean;
  hasValidToken: () => boolean;
  needsRefresh: () => boolean;
  getUserPermissions: () => string[];
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  status: 'idle',
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
    tokenType: 'Bearer',
  },
  error: null,
  isLoading: false,
};

const restoreAuthState = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {};

  try {
    const accessToken = TokenManager.getAccessToken();
    const storedUser = sessionStorage.getItem('behindy_user');

    if (accessToken && TokenManager.isTokenValid() && storedUser) {
      const user: CurrentUser = JSON.parse(storedUser);

      return {
        status: 'authenticated',
        user,
        tokens: {
          accessToken,
          refreshToken: null,
          tokenType: SECURITY_CONFIG.JWT.TOKEN_TYPE,
        },
      };
    }
  } catch {
    TokenManager.clearAllTokens();
    sessionStorage.removeItem('behindy_user');
  }

  return {};
};

const saveUserToSession = (user: CurrentUser | null): void => {
  if (typeof window === 'undefined') return;

  try {
    if (user) {
      sessionStorage.setItem('behindy_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('behindy_user');
    }
  } catch {
  }
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      ...restoreAuthState(),

      login: async (credentials: LoginRequest | Record<string, never>, isDemo = false): Promise<AuthResult> => {
        try {
          set({ isLoading: true, error: null }, false, 'auth/login/start');

          const endpoint = isDemo ? API_ENDPOINTS.AUTH.DEMO_LOGIN : API_ENDPOINTS.AUTH.LOGIN;
          const body = isDemo ? {} : {
            email: (credentials as LoginRequest).email,
            password: (credentials as LoginRequest).password,
          };

          const response = await api.post<JwtAuthResponse>(endpoint, body);

          TokenManager.setAccessToken(response.accessToken);

          const user: CurrentUser = {
            id: response.userId,
            name: response.name,
            email: response.email,
            isAuthenticated: true,
            role: (response.role === 'ADMIN' || response.role === 'USER') ? response.role : 'USER',
            permissions: [],
          };

          const tokens: TokenInfo = {
            accessToken: response.accessToken,
            refreshToken: null,
            tokenType: response.tokenType || 'Bearer',
          };

          saveUserToSession(user);

          set(
            {
              status: 'authenticated',
              user,
              tokens,
              error: null,
              isLoading: false,
              lastLoginAttempt: Date.now(),
            },
            false,
            'auth/login/success'
          );

          return { success: true, data: user };
        } catch (error: unknown) {
          console.error('Login failed:', error);
          
          const errorInfo = apiErrorHandler.parseError(error);
          
          const authError: AuthError = {
            code: errorInfo.code,
            message: errorInfo.message,
            details: errorInfo.details,
          };
    
          set(
            {
              status: 'unauthenticated',
              user: null,
              error: authError,
              isLoading: false,
              lastLoginAttempt: Date.now(),
            },
            false,
            'auth/login/error'
          );
    
          return { success: false, error: authError.message };
        }
      },

      signup: async (userData: SignupRequest): Promise<AuthResult> => {
        try {
          set({ isLoading: true, error: null }, false, 'auth/signup/start');

          const response = await api.post<ApiResponse<number>>(
            API_ENDPOINTS.AUTH.SIGNUP,
            {
              name: userData.name,
              email: userData.email,
              password: userData.password,
            }
          );
    
          set(
            {
              status: 'unauthenticated',
              isLoading: false,
              error: null,
            },
            false,
            'auth/signup/success'
          );
    
          return {
            success: true,
            data: {
              userId: response.data,
              message: response.message || '회원가입이 완료되었습니다.'
            }
          };
        } catch (error: unknown) {
          console.error('Signup failed:', error);
          
          const errorInfo = apiErrorHandler.parseError(error);
          
          const authError: AuthError = {
            code: errorInfo.code,
            message: errorInfo.message,
            details: errorInfo.details,
          };
    
          set(
            {
              status: 'error',
              error: authError,
              isLoading: false,
            },
            false,
            'auth/signup/error'
          );
    
          return { success: false, error: authError.message };
        }
      },

      logout: async (): Promise<void> => {
        try {
          await api.post<ApiResponse>(API_ENDPOINTS.AUTH.LOGOUT, {});
        } catch {
        } finally {
          TokenManager.clearAllTokens();
          saveUserToSession(null);

          set(
            {
              status: 'unauthenticated',
              user: null,
              tokens: {
                accessToken: null,
                refreshToken: null,
                tokenType: 'Bearer',
              },
              error: null,
              isLoading: false,
            },
            false,
            'auth/logout'
          );
        }
      },

      refreshToken: async (): Promise<boolean> => {
        try {
          const response = await api.post<JwtAuthResponse>(
            API_ENDPOINTS.AUTH.REFRESH,
            {}
          );

          TokenManager.setAccessToken(response.accessToken);

          set(
            (state) => ({
              tokens: {
                ...state.tokens,
                accessToken: response.accessToken,
              },
            }),
            false,
            'auth/refreshToken/success'
          );

          await get().fetchCurrentUser();

          return true;
        } catch (error: unknown) {
          console.error('Token refresh failed:', error);
          await get().logout();
          return false;
        }
      },

      clearTokens: (): void => {
        TokenManager.clearAllTokens();
        saveUserToSession(null);
        set(
          {
            tokens: {
              accessToken: null,
              refreshToken: null,
              tokenType: SECURITY_CONFIG.JWT.TOKEN_TYPE,
            },
          },
          false,
          'auth/clearTokens'
        );
      },

      checkAuthStatus: async (): Promise<void> => {
        try {
          set({ isLoading: true }, false, 'auth/check/start');

          const accessToken = TokenManager.getAccessToken();

          if (!accessToken) {
            const refreshSuccess = await get().refreshToken();

            if (!refreshSuccess) {
              set(
                {
                  status: 'unauthenticated',
                  user: null,
                  isLoading: false,
                },
                false,
                'auth/check/noTokens'
              );
              return;
            }
          } else {
            if (!TokenManager.isTokenValid()) {
              const refreshSuccess = await get().refreshToken();

              if (!refreshSuccess) {
                set(
                  {
                    status: 'unauthenticated',
                    user: null,
                    isLoading: false,
                  },
                  false,
                  'auth/check/expired'
                );
                return;
              }
            } else {
              await get().fetchCurrentUser();
            }
          }
        } catch (error) {
          console.error('Auth status check failed:', error);
          await get().logout();
        }
      },

      fetchCurrentUser: async (): Promise<void> => {
        try {
          const userResponse = await api.get<ApiResponse<CurrentUser>>(API_ENDPOINTS.AUTH.ME);

          const user: CurrentUser = {
            id: userResponse.data.id,
            name: userResponse.data.name,
            email: userResponse.data.email,
            isAuthenticated: true,
            role: userResponse.data.role,
            permissions: userResponse.data.permissions || [],
          };

          const accessToken = TokenManager.getAccessToken();

          saveUserToSession(user);

          set(
            {
              status: 'authenticated',
              user,
              tokens: {
                accessToken,
                refreshToken: null,
                tokenType: SECURITY_CONFIG.JWT.TOKEN_TYPE,
              },
              isLoading: false,
            },
            false,
            'auth/fetchUser/success'
          );
        } catch (error) {
          console.error('Fetch current user failed:', error);
          await get().logout();
        }
      },

      updateUser: (userUpdate: Partial<CurrentUser>): void => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...userUpdate };

          saveUserToSession(updatedUser);

          set(
            {
              user: updatedUser,
            },
            false,
            'auth/updateUser'
          );
        }
      },

      setLoading: (loading: boolean): void => {
        set({ isLoading: loading }, false, 'auth/setLoading');
      },

      setError: (error: AuthError | null): void => {
        set({ error }, false, 'auth/setError');
      },

      clearError: (): void => {
        set({ error: null }, false, 'auth/clearError');
      },

      reset: (): void => {
        TokenManager.clearAllTokens();
        saveUserToSession(null);
        set(initialState, false, 'auth/reset');
      },

      isAuthenticated: (): boolean => {
        const { status, tokens } = get();
        const isAuth = status === 'authenticated' && !!tokens.accessToken;
        return isAuth;
      },

      hasValidToken: (): boolean => {
        return TokenManager.hasValidTokens();
      },

      needsRefresh: (): boolean => {
        const { lastLoginAttempt } = get();
        
        if (!TokenManager.hasValidTokens()) return false;
        
        const refreshThreshold = SECURITY_CONFIG.JWT.REFRESH_THRESHOLD_MINUTES * 60 * 1000;
        return lastLoginAttempt 
          ? Date.now() - lastLoginAttempt > refreshThreshold 
          : true;
      },

      getUserPermissions: (): string[] => {
        const { user } = get();
        return user?.permissions || [];
      },
    }),
    {
      name: 'auth-store',
      enabled: env.DEV_MODE,
    }
  )
);

export const useAuth = () => {
  const store = useAuthStore();
  return {
    ...store,
    isLoggedIn: store.isAuthenticated(),
    hasToken: store.hasValidToken(),
    shouldRefresh: store.needsRefresh(),
    permissions: store.getUserPermissions(),
  };
};

export default useAuthStore;