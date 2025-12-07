"use client";

import React, { Suspense } from 'react';
import { AppLayout } from '@/shared/components/layout/applayout/AppLayout';
import { CharacterCreatePageContainer } from '@/features/game/components/CharacterCreatePageContainer';

function CharacterCreateLoading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      캐릭터 생성 로딩 중...
    </div>
  );
}

export default function CharacterCreateRoute() {
  return (
    <AppLayout>
      <Suspense fallback={<CharacterCreateLoading />}>
        <CharacterCreatePageContainer />
      </Suspense>
    </AppLayout>
  );
}