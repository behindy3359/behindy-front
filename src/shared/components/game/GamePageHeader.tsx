import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut, Activity, MapPin, Users } from 'lucide-react';
import { BaseButton } from '@/shared/styles/components';
import { gameThemeControls } from '@/shared/hooks/useAutoTheme';
import { colors } from '@/shared/styles/tokens/colors';
import {
  HeaderCard,
  HeaderContent,
  HeaderLeft,
  HeaderTitle,
  HeaderMeta,
  MetaBadge,
  HeaderActions,
  BackButton,
} from './styles';

export type GameMode = 'single' | 'multi';
export type ConnectionState = 'connected' | 'connecting' | 'disconnected';

export interface GamePageHeaderProps {
  mode: GameMode;
  title?: string;
  metadata: {
    stationName: string;
    lineNumber: string;
    roomName?: string;
  };
  status?: {
    connectionState?: ConnectionState;
    participantCount?: number;
    maxPlayers?: number;
  };
  showQuitButton?: boolean;
  onBack?: () => void;
  onQuit?: () => void;
}

export const GamePageHeader: React.FC<GamePageHeaderProps> = ({
  mode,
  title,
  metadata,
  status,
  showQuitButton = false,
  onBack,
  onQuit,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      gameThemeControls.disableGameMode();
      router.push('/');
    }
  };

  const getConnectionColor = (state?: ConnectionState): string => {
    if (!state) return colors.text.light.secondary;
    switch (state) {
      case 'connected':
        return colors.success;
      case 'connecting':
        return colors.warning;
      case 'disconnected':
        return colors.error;
      default:
        return colors.text.light.secondary;
    }
  };

  const displayTitle = title || (mode === 'multi' ? metadata.roomName : undefined);
  const showMetaBadges = mode === 'multi' || !title;

  return (
    <HeaderCard>
      <HeaderContent>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>돌아가기</span>
        </BackButton>

        <HeaderLeft>
          <HeaderTitle>
            {mode === 'multi' && status?.connectionState && (
              <Activity
                size={22}
                color={getConnectionColor(status.connectionState)}
              />
            )}
            {displayTitle || `${metadata.stationName}역`}
          </HeaderTitle>

          {showMetaBadges && (
            <HeaderMeta>
              <MetaBadge $variant="info">
                <MapPin size={14} />
                {metadata.stationName}
                {metadata.lineNumber && ` ${metadata.lineNumber}호선`}
              </MetaBadge>

              {mode === 'multi' && status && (
                <MetaBadge>
                  <Users size={14} />
                  {status.participantCount || 0}/{status.maxPlayers || 3} 참여 중
                </MetaBadge>
              )}
            </HeaderMeta>
          )}
        </HeaderLeft>

        <HeaderActions>
          {showQuitButton && onQuit && (
            <BaseButton
              variant={mode === 'multi' ? 'destructive' : 'outline'}
              size="sm"
              onClick={onQuit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={16} />
              {mode === 'multi' ? '방 나가기' : '포기'}
            </BaseButton>
          )}
        </HeaderActions>
      </HeaderContent>
    </HeaderCard>
  );
};
