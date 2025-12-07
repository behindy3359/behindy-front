import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button/Button';
import { CharacterGameStatus } from '@/features/game/types/gameTypes';
import { CharacterInfoCard } from './CharacterInfoCard';
import { GameStatsCard } from './GameStatsCard';
import { CurrentGameCard } from './CurrentGameCard';
import { EmptyCharacterState } from './EmptyCharacterState';
import { VisitedStationBadges } from './VisitedStationBadges';
import { useVisitedStations } from '../../hooks/useVisitedStations';
import { ContentGrid } from '../../styles/gameStyles';

interface CharacterContentProps {
  character: CharacterGameStatus | null;
  onResumeGame: () => void;
  onNewGame: () => void;
  onCreateCharacter: () => void;
}

export const CharacterContent: React.FC<CharacterContentProps> = ({
  character,
  onResumeGame,
  onNewGame,
  onCreateCharacter,
}) => {
  const { visitedStations, isLoading: isLoadingStations } = useVisitedStations();

  if (!character) {
    return <EmptyCharacterState onCreateCharacter={onCreateCharacter} />;
  }

  return (
    <ContentGrid>
      <CharacterInfoCard character={character} />

      <GameStatsCard character={character} />

      <VisitedStationBadges
        visitedStations={visitedStations}
        isLoading={isLoadingStations}
      />

      <CurrentGameCard
        character={character}
        onResumeGame={onResumeGame}
        onNewGame={onNewGame}
      />
    </ContentGrid>
  );
};