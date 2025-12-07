'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/shared/components/layout/applayout/AppLayout';
import { ChatRoom } from '@/features/multiplayer/components/ChatRoom';
import { useAuthStore } from '@/shared/store/authStore';
import { gameThemeControls } from '@/shared/hooks/useAutoTheme';

export default function MultiplayerRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    gameThemeControls.enableGameMode();
    return () => {
      gameThemeControls.disableGameMode();
    };
  }, []);

  const roomId = parseInt(params.id as string, 10);

  if (isNaN(roomId)) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <p className="text-red-600 mb-4">유효하지 않은 방 ID입니다</p>
            <button
              onClick={() => router.push('/metro')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              메트로 지도로 돌아가기
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!isAuthenticated()) {
    router.push(`/auth/login?redirect=${encodeURIComponent(`/multiplayer/room/${roomId}`)}`);
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">로그인 페이지로 이동 중...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ChatRoom roomId={roomId} currentUserId={user?.id} />
    </AppLayout>
  );
}
