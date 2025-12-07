import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/config/axiosConfig';
import { useAuthStore } from '@/shared/store/authStore';
import { useToast } from '@/shared/store/uiStore';
import { CharacterGameStatus } from '../types/gameTypes';

interface UseCharacterDataOptions {
  redirectOnUnauth?: boolean;
}

export const useCharacterData = (options: UseCharacterDataOptions = {}) => {
  const { redirectOnUnauth = true } = options;
  const router = useRouter();
  const toast = useToast();
  const toastRef = useRef(toast);
  const { isAuthenticated } = useAuthStore();

  toastRef.current = toast;

  const [character, setCharacter] = useState<CharacterGameStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacterInfo = useCallback(async () => {
    if (!isAuthenticated()) {
      setCharacter(null);
      setIsLoading(false);
      if (redirectOnUnauth) {
        router.push('/auth/login');
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get<CharacterGameStatus>('/characters/current');
      setCharacter(response);
    } catch (error: any) {
      if ((error as { response?: { status?: number } }).response?.status === 404) {
        setCharacter(null);
      } else {
        console.error('캐릭터 조회 실패:', error);
        toastRef.current.error('캐릭터 정보를 불러올 수 없습니다');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, redirectOnUnauth, router]);

  useEffect(() => {
    fetchCharacterInfo();
  }, [fetchCharacterInfo]);

  return {
    character,
    isLoading,
    refetch: fetchCharacterInfo,
  };
};
