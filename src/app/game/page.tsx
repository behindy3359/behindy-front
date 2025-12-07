"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { AppLayout } from '@/shared/components/layout/applayout/AppLayout';

const GamePageContainer = dynamic(
  () => import('@/features/game/components/GamePageContainer').then(mod => ({ default: mod.GamePageContainer })),
  {
    loading: () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        게임 로딩 중...
      </div>
    ),
    ssr: true,
  }
);

export default function GameRoute() {
  return (
    <AppLayout>
      <GamePageContainer />
    </AppLayout>
  );
}