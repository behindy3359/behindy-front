import { motion } from "framer-motion";
import styled from "styled-components";
import {
  BaseCard,
  FlexContainer,
  BaseTextarea,
  BaseButton,
  ErrorText,
  CommonActionGroup
} from '@/shared/styles/components';
import { commonMixins } from '@/shared/styles/components/mixins';

export const FormContainer = styled(BaseCard).attrs({
  $variant: 'outlined' as const,
  $size: 'md' as const,
})`
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const UserInfo = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $align: 'center' as const,
  $gap: 2 as const,
})`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  .avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]} 0%, ${({ theme }) => theme.colors.secondary[500]} 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text.inverse};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
  
  .name {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const TextareaContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const Textarea = styled(BaseTextarea)<{ $hasError: boolean }>`
  width: 100%;
  min-height: 80px;
  max-height: 80px;
  resize: none;
  overflow-y: auto;
  
  border-color: ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error : theme.colors.border.medium
  };
  
  &:focus {
    border-color: ${({ $hasError, theme }) => 
      $hasError ? theme.colors.error : theme.colors.primary[500]
    };
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) => 
      $hasError ? 'rgba(239, 68, 68, 0.1)' : theme.shadows.focus
    };
  }
  
  ${({ theme }) => commonMixins.customScrollbar(theme.colors.border.medium, theme.colors.background.secondary)}
`;

export const CharCount = styled.div<{ $isOver: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ $isOver, theme }) => $isOver ? theme.colors.error : theme.colors.text.tertiary};
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 4px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const ErrorMessage = styled(ErrorText)`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const Actions = styled(CommonActionGroup).attrs({
  $justify: 'between' as const,
})` `;

export const CancelButton = styled(BaseButton).attrs({
  variant: 'secondary' as const,
  size: 'sm' as const,
})` `;

export const Tips = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  
  .tip-item {
    margin-bottom: 2px;
  }
`;
