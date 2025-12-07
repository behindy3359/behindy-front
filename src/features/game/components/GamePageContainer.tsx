"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { GameContainer } from '../styles/gameStyles';
import { useGameFlow } from '../hooks/useGameFlow';
import { GamePageHeader } from '@/shared/components/game';
import { GameContent } from './inner/GameContent';
import { ChoiceEffectModal } from './inner/ChoiceEffectModal';

export const GamePageContainer: React.FC = () => {
  const searchParams = useSearchParams();
  const stationName = searchParams.get('station');
  const lineNumber = searchParams.get('line');

  const {
    gameState,
    character,
    gameData,
    error,
    isChoiceLoading,
    canMakeChoice,
    gameCompletionData,
    showEffectModal,
    selectedEffect,
    handleChoice,
    handleQuitGame,
    handleTypingComplete,
    handleCharacterCreated,
    handleNewGame,
    handleBackToMain,
    handleShareResult,
    handleGoToRandomStory,
    handleViewResults,
    handleCloseEffectModal,
  } = useGameFlow({
    stationName: stationName || '',
    lineNumber: lineNumber || '',
  });

  return (
    <GameContainer>
      <GamePageHeader
        mode="single"
        metadata={{
          stationName: gameData?.stationName || stationName || '',
          lineNumber: gameData?.stationLine?.toString() || lineNumber || '',
        }}
        showQuitButton={gameState === 'GAME_PLAYING'}
        onQuit={handleQuitGame}
      />

      <GameContent
        gameState={gameState}
        character={character}
        gameData={gameData}
        error={error}
        isChoiceLoading={isChoiceLoading}
        canMakeChoice={canMakeChoice}
        gameCompletionData={gameCompletionData}
        stationName={stationName}
        lineNumber={lineNumber}
        onChoice={handleChoice}
        onTypingComplete={handleTypingComplete}
        onCharacterCreated={handleCharacterCreated}
        onNewGame={handleNewGame}
        onBackToMain={handleBackToMain}
        onShareResult={handleShareResult}
        onGoToRandomStory={handleGoToRandomStory}
        onViewResults={handleViewResults}
      />

      <ChoiceEffectModal
        isVisible={showEffectModal}
        effect={selectedEffect?.effect}
        amount={selectedEffect?.amount}
        effectPreview={selectedEffect?.effectPreview}
        onClose={handleCloseEffectModal}
      />
    </GameContainer>
  );
};

export default GamePageContainer;