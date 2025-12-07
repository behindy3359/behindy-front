import React from 'react';
import { LoadingSection, GameSpinner } from '../../styles/gameStyles';

export const LoadingStates = {
  Game: () => (
    <LoadingSection>
      <GameSpinner />
      <p>게임을 준비하는 중...</p>
    </LoadingSection>
  ),

  Character: () => (
    <LoadingSection>
      <GameSpinner />
      <p>캐릭터 정보를 확인하는 중...</p>
    </LoadingSection>
  ),

  Story: () => (
    <LoadingSection>
      <GameSpinner />
      <p>스토리를 불러오는 중...</p>
    </LoadingSection>
  ),
};