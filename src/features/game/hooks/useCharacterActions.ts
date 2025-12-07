import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/store/uiStore';
import { api } from '@/config/axiosConfig';
import { resumeCurrentGame } from '../utils/gameNavigation';

export const useCharacterActions = () => {
  const router = useRouter();
  const toast = useToast();

  const handleResumeGame = useCallback(() => {
    resumeCurrentGame(
      () => toast.success('게임을 재개합니다'),
      (error: unknown) => {
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    );
  }, [toast]);

  const handleNewGame = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleCreateCharacter = useCallback(async () => {
    try {
      const response = await api.get<{
        success: boolean;
        message: string;
        data: any;
      }>('/characters/exists');

      if (response.success && response.data) {
        toast.info('이미 캐릭터가 존재합니다');
        router.push('/character');
      } else {
        router.push('/character/create');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        router.push('/character/create');
      } else {
        console.error('Character check error:', error);
        router.push('/character/create');
      }
    }
  }, [router, toast]);

  return {
    handleResumeGame,
    handleNewGame,
    handleCreateCharacter,
  };
};