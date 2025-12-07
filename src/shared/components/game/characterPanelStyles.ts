import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseCard, FlexContainer } from '@/shared/styles/components';

export const CharacterCard = styled(motion(BaseCard))`
  background: var(--game-bg-card);
  border: 1px solid var(--game-border);
  box-shadow: var(--shadow-card);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const CharacterCardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid var(--game-border);

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const CharacterCardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: var(--game-text-header);
  margin: 0;
`;

export const CharacterProfile = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $align: 'center' as const,
  $gap: 4 as const,
})`
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[500]} 0%,
    ${({ theme }) => theme.colors.secondary[500]} 100%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CharacterName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: var(--game-text-header);
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
`;

export const StatusBadge = styled.div<{ $status: string }>`
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  background: var(--game-bg-overlay);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: var(--game-text-status);
`;

export const StatsGrid = styled(FlexContainer).attrs({
  $direction: 'column' as const,
  $gap: 4 as const,
})`
  padding: 0 ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  }
`;

export const StatCard = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $gap: 3 as const,
})``;

export const StatIcon = styled.div<{ $type: 'health' | 'sanity' }>`
  width: 40px;
  height: 40px;
  background: ${({ theme, $type }) =>
    $type === 'health' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  color: ${({ theme, $type }) =>
    $type === 'health' ? theme.colors.error : theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: var(--game-text-status);
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: var(--game-text-header);
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const StatBar = styled.div`
  width: 100%;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
`;

export const StatBarFill = styled.div<{ $percentage: number; $color: string }>`
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;
  background: ${({ $color }) => $color};
  transition: width 0.3s ease;
`;

export const DeathNotice = styled.div`
  margin: 0 ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
  background: rgba(239, 68, 68, 0.1);
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  @media (max-width: 768px) {
    margin: 0 ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]};
  }
`;

export const ParticipantsSection = styled.div`
  border-top: 1px solid var(--game-border);
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const ParticipantsSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: var(--game-text-header);
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ParticipantItem = styled.div<{ $isCurrent?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ $isCurrent }) =>
    $isCurrent ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-secondary)'};
  border: 1px solid
    ${({ $isCurrent }) => ($isCurrent ? 'var(--primary-500)' : 'var(--game-border)')};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ $isCurrent }) =>
      $isCurrent ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-tertiary)'};
  }
`;

export const ParticipantNameWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: var(--game-text-header);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const ParticipantStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  color: var(--game-text-choice);
`;
