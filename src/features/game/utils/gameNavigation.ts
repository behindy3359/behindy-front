import { api } from '@/config/axiosConfig';
import { useAuthStore } from '@/shared/store/authStore';

interface NavigateToGameParams {
  stationName: string;
  lineNumber: number;
  onRequireLogin?: () => void;
  onSuccess?: () => void;
}

export function navigateToGame({
  stationName,
  lineNumber,
  onRequireLogin,
  onSuccess,
}: NavigateToGameParams): void {
  const isAuthenticated = useAuthStore.getState().isAuthenticated();
  if (!isAuthenticated) {
    onRequireLogin?.();

    if (typeof window !== 'undefined') {
      const returnUrl = `/game?station=${encodeURIComponent(stationName)}&line=${lineNumber}`;
      window.location.href = `/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`;
    }
    return;
  }

  onSuccess?.();

  if (typeof window !== 'undefined') {
    const gameUrl = `/game?station=${encodeURIComponent(stationName)}&line=${lineNumber}`;
    window.location.href = gameUrl;
  }
}

export function resumeCurrentGame(
  onSuccess?: () => void,
  onError?: (error: unknown) => void
): void {
  try {
    if (typeof window !== 'undefined') {
      window.location.href = '/game';
    }

    onSuccess?.();
  } catch (error) {
    console.error('Game resume failed:', error);
    onError?.(error);
  }
}