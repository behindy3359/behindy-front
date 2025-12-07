import { motion } from 'framer-motion';
import styled from 'styled-components';

export const BaseForm = styled(motion.form)<{
  $spacing?: 'compact' | 'normal' | 'relaxed';
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  ${({ $spacing = 'normal', theme }) => {
    switch ($spacing) {
      case 'compact':
        return `gap: ${theme.spacing[4]};`;
      case 'relaxed':
        return `gap: ${theme.spacing[8]};`;
      default:
        return `gap: ${theme.spacing[6]};`;
    }
  }}
`;

export const FormField = styled(motion.div)<{
  $fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
`;

export const FormLabel = styled.label<{
  $required?: boolean;
  $size?: 'sm' | 'md' | 'lg';
}>`
  font-size: ${({ $size = 'md', theme }) => {
    switch ($size) {
      case 'sm': return theme.typography.fontSize.xs;
      case 'lg': return theme.typography.fontSize.base;
      default: return theme.typography.fontSize.sm;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  
  ${({ $required, theme }) => $required && `
    &::after {
      content: ' *';
      color: ${theme.colors.error};
      font-weight: ${theme.typography.fontWeight.bold};
    }
  `}
`;

export const FormGroup = styled.div<{
  $columns?: number;
  $gap?: keyof typeof import('../tokens/spacing').spacing;
}>`
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  gap: ${({ $gap = 4, theme }) => theme.spacing[$gap]};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormActions = styled.div<{
  $justify?: 'start' | 'center' | 'end' | 'between';
  $gap?: keyof typeof import('../tokens/spacing').spacing;
}>`
  display: flex;
  align-items: center;
  gap: ${({ $gap = 4, theme }) => theme.spacing[$gap]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  
  ${({ $justify = 'end' }) => {
    switch ($justify) {
      case 'start': return 'justify-content: flex-start;';
      case 'center': return 'justify-content: center;';
      case 'between': return 'justify-content: space-between;';
      default: return 'justify-content: flex-end;';
    }
  }}
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    
    button {
      width: 100%;
    }
  }
`;

export const FormError = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const FormSuccess = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const FormHelperText = styled.div<{
  $variant?: 'default' | 'error' | 'success';
}>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  
  ${({ $variant = 'default', theme }) => {
    switch ($variant) {
      case 'error':
        return `color: ${theme.colors.error};`;
      case 'success':
        return `color: ${theme.colors.success};`;
      default:
        return `color: ${theme.colors.text.secondary};`;
    }
  }}
`;

export const FormSection = styled.div<{
  $withBorder?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing[6]};
  
  ${({ $withBorder, theme }) => $withBorder && `
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.border.light};
    }
  `}
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  h1, h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

export const FormDivider = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing[6]} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border.medium};
  }
  
  span {
    padding: 0 ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

export const InlineForm = styled(BaseForm)`
  flex-direction: row;
  align-items: end;
  gap: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CompactForm = styled(BaseForm).attrs({
  $spacing: 'compact' as const,
})`
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const FormLoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  backdrop-filter: blur(2px);
  
  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => theme.spacing[8]};
    background: ${({ theme }) => theme.colors.background.primary};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.dropdown};
    
    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid ${({ theme }) => theme.colors.border.light};
      border-top: 3px solid ${({ theme }) => theme.colors.primary[500]};
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    .loading-text {
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    }
  }
`;