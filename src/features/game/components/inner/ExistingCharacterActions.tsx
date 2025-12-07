
import React from 'react';
import { ArrowRight, Home, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button/Button';

interface ExistingCharacterActionsProps {
  stationName: string | null;
  lineNumber: string | null;
  isLoading: boolean;
  onContinueWithExisting: () => void;
  onGoHome: () => void;
  onAbandonAndCreate: () => void;
}

export const ExistingCharacterActions: React.FC<ExistingCharacterActionsProps> = ({
  stationName,
  lineNumber,
  isLoading,
  onContinueWithExisting,
  onAbandonAndCreate
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
      <Button
        onClick={onContinueWithExisting}
        size="lg"
        fullWidth
        rightIcon={stationName && lineNumber ? <ArrowRight size={20} /> : <Home size={20} />}
      >
        {stationName && lineNumber 
          ? `${stationName}역으로 이동하기` 
          : '이 캐릭터로 계속하기'
        }
      </Button>
      
      <Button
        variant="destructive"
        onClick={onAbandonAndCreate}
        size="lg"
        fullWidth
        disabled={isLoading}
        leftIcon={<Trash2 size={18} />}
      >
        포기하고 새로 만들기
      </Button>
    </div>
  );
};
