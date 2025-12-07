import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';
import { requiresAuth, isPublicRoute } from '@/shared/utils/navigation/navigationUtils';
import { TokenManager } from '@/config/axiosConfig';

export interface UseAuthGuardReturn {
  isLoading: boolean;
  isHydrated: boolean;
  shouldRender: boolean;
}

export const useAuthGuard = (): UseAuthGuardReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, status, checkAuthStatus, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateServerSession = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${TokenManager.getAccessToken()}`
        }
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }, []);

  const cleanupClientState = useCallback(async () => {
    try {
      await logout();
      TokenManager.clearAllTokens();
    } catch (error) {
      console.error('Client state cleanup failed:', error);
    }
  }, [logout]);

  useEffect(() => {
    if (!isHydrated) return;

    const initializeAuth = async () => {
      if (isPublicRoute(pathname)) {
        setIsLoading(false);
        return;
      }

      if (requiresAuth(pathname)) {
        const hasClientToken = !!TokenManager.getAccessToken();
        const hasClientAuth = isAuthenticated();

        if (!hasClientToken || !hasClientAuth) {
          await cleanupClientState();
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
          setIsLoading(false);
          return;
        }

        const isServerSessionValid = await validateServerSession();

        if (!isServerSessionValid) {
          await cleanupClientState();
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
          setIsLoading(false);
          return;
        }

        if (status === 'idle' || !isAuthenticated()) {
          try {
            await checkAuthStatus();
          } catch (error) {
            console.error('Auth status check failed:', error);
            await cleanupClientState();
            router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
            setIsLoading(false);
            return;
          }
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [
    pathname,
    checkAuthStatus,
    isAuthenticated,
    status,
    router,
    isHydrated,
    logout,
    validateServerSession,
    cleanupClientState
  ]);

  const shouldRender = isPublicRoute(pathname)
    ? isHydrated && !isLoading
    : isHydrated && !isLoading && status !== 'loading';

  return {
    isLoading: isPublicRoute(pathname)
      ? !isHydrated || isLoading
      : !isHydrated || isLoading || status === 'loading',
    isHydrated,
    shouldRender
  };
};