import styled from 'styled-components';
import { BaseCard, BaseButton, FlexContainer, Badge } from '@/shared/styles/components';

export const HeaderCard = styled(BaseCard)`
  padding: ${({ theme }) => theme.spacing[6]};
  background: var(--game-bg-card);
  border: 1px solid var(--game-border);
  box-shadow: var(--shadow-card);
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing[4]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

export const BackButton = styled(BaseButton).attrs({
  variant: 'ghost' as const,
})`
  position: relative;
  color: var(--game-text-choice);
  flex-shrink: 0;
  gap: 0;
  padding: ${({ theme }) => theme.spacing[2]};

  span {
    display: inline-block;
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    white-space: nowrap;
    transition: all 0.25s ease;
    margin-left: 0;
  }

  &:hover {
    color: var(--game-text-header);
    background: rgba(255, 255, 255, 0.1);

    span {
      max-width: 100px;
      opacity: 1;
      margin-left: ${({ theme }) => theme.spacing[2]};
    }
  }

  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  flex: 1;
  min-width: 0;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: var(--game-text-header);

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  color: var(--game-text-status);
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const MetaBadge = styled(Badge).attrs({ $size: 'md' as const })`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  box-shadow: ${({ theme }) => theme.shadows.base.sm};

  ${({ $variant }) =>
    !$variant &&
    `
      background: var(--game-bg-secondary);
      color: var(--game-text-status);
      border: 1px solid var(--game-border);
    `}
`;

export const HeaderActions = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $gap: 3 as const,
})`
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;
