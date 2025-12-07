import styled from 'styled-components';
import {
  BaseCard,
  Badge,
  ChatMessagesList,
} from '@/shared/styles/components';
import { commonMixins } from '@/shared/styles/components/mixins';

export const RoomPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  min-height: calc(100vh - 80px);
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-primary);

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

export const RoomHeaderCard = styled(BaseCard)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]};
  background: var(--game-bg-card);
  border: 1px solid var(--game-border);
  box-shadow: var(--shadow-card);

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  flex: 1;
  min-width: 0;
`;

export const RoomTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: var(--game-text-header);
`;

export const RoomMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  color: var(--game-text-status);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const MetaBadge = styled(Badge).attrs({ $size: 'md' as const })`
  box-shadow: ${({ theme }) => theme.shadows.base.sm};

  ${({ $variant, theme }) =>
    !$variant &&
    `
      background: ${theme.colors.background.secondary};
      color: ${theme.colors.text.secondary};
      border-color: ${theme.colors.border.light};
    `}
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const ConnectionPill = styled.div<{
  $status: 'connected' | 'connecting' | 'disconnected';
}>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid
    ${({ $status, theme }) => {
      if ($status === 'connected') return 'rgba(16, 185, 129, 0.4)';
      if ($status === 'connecting') return 'rgba(245, 158, 11, 0.3)';
      return 'rgba(239, 68, 68, 0.35)';
    }};
  background:
    ${({ $status }) => {
      if ($status === 'connected') return 'rgba(16, 185, 129, 0.12)';
      if ($status === 'connecting') return 'rgba(245, 158, 11, 0.14)';
      return 'rgba(239, 68, 68, 0.12)';
    }};
  color: ${({ $status, theme }) => {
    if ($status === 'connected') return theme.colors.success;
    if ($status === 'connecting') return theme.colors.warning;
    return theme.colors.error;
  }};

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: currentColor;
    box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.02);
  }
`;

export const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  flex: 1;
  min-height: 0;
`;

export const MessagesCard = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  min-height: 500px;
  background: var(--game-bg-card);
  border: 1px solid var(--game-border);
  box-shadow: var(--shadow-card);
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 400px;
  }
`;

export const MessagesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: 0 ${({ theme }) => theme.spacing[6]};
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: var(--game-text-header);
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const SectionHint = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: var(--game-text-status);
`;

export const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  flex: 1;
  min-height: 0;
  max-height: 500px;
  overflow-y: auto;
  padding: 0 ${({ theme }) => theme.spacing[6]};

  ${commonMixins.customScrollbar('var(--border-medium)', 'var(--bg-secondary)')}

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing[4]};
    max-height: 400px;
  }
`;

export const MessageScrollArea = styled(ChatMessagesList)`
  flex: 1;
  min-height: 280px;
  max-height: 400px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[4]};
  background: var(--bg-secondary);
  border: 1px solid var(--game-border);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: var(--shadow-card);

  ${commonMixins.customScrollbar('var(--border-medium)', 'var(--bg-secondary)')}
`;

export const MessageEmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-height: 260px;
  border: 1px dashed var(--game-border);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: var(--bg-secondary);
  color: var(--game-text-muted);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

export const InputSurface = styled.div`
  border-top: 1px solid var(--game-border);
  background: var(--bg-secondary);
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const SidebarCard = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[6]};
  background: var(--game-bg-card);
  border: 1px solid var(--game-border);
  box-shadow: var(--shadow-card);
  min-height: auto;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: var(--game-text-header);
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const SidebarDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: var(--game-text-status);
`;

export const StateCard = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[12]};
  text-align: center;
  background: var(--game-bg-card);
  border: 1px solid var(--game-border);
  box-shadow: var(--shadow-card);
`;

export const StateTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: var(--game-text-header);
`;

export const StateDescription = styled.div`
  color: var(--game-text-status);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;
