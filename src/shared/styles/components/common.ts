import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FlexContainer, BaseCard } from './containers';

export const commonKeyframes = {
  spin: keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `,
  
  pulse: keyframes`
    0%, 100% { 
      opacity: 1; 
      transform: scale(1); 
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.1); 
    }
  `,
  
  blink: keyframes`
    0%, 70%, 100% { opacity: 1; }
    35% { opacity: 0.3; }
  `,
  
  slowPulse: keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,
  
  fadeIn: keyframes`
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  
  shimmer: keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  `
} as const;

interface CommonSectionHeaderProps {
  $variant?: 'default' | 'gradient';
  $spacing?: 'compact' | 'normal' | 'relaxed';
}

interface CommonPageHeaderProps {
  $textAlign?: 'left' | 'center' | 'right';
  $spacing?: 'compact' | 'normal' | 'relaxed';
}

interface CommonCardHeaderProps {
  $variant?: 'default' | 'gradient';
  $padding?: 'sm' | 'md' | 'lg';
}

interface CommonCardFooterProps {
  $padding?: 'sm' | 'md' | 'lg';
}

interface CommonLoadingStateProps {
  $variant?: 'page' | 'section' | 'inline';
}

interface CommonErrorStateProps {
  $variant?: 'page' | 'section' | 'inline';
}

interface CommonStatusIndicatorProps {
  $status: 'live' | 'test' | 'loading' | 'error' | 'closed' | 'limited' | 'no-data';
  $size?: 'sm' | 'md' | 'lg';
}

interface CommonSkeletonProps {
  $width?: string;
  $height?: string;
  $variant?: 'text' | 'rectangular' | 'circular';
}

interface CommonActionGroupProps {
  $justify?: 'start' | 'center' | 'end' | 'between';
  $responsive?: boolean;
}

interface CommonStatItemProps {
  $variant?: 'default' | 'card' | 'inline';
}

export const CommonSectionHeader = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $justify: 'between' as const,
  $align: 'center' as const,
})<CommonSectionHeaderProps>`
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  ${({ $variant, theme }) => {
    if ($variant === 'gradient') {
      return `
        background: linear-gradient(135deg, 
          ${theme.colors.background.secondary} 0%, 
          ${theme.colors.background.tertiary} 100%
        );
      `;
    }
    return `background: ${theme.colors.background.secondary};`;
  }}
  
  ${({ $spacing, theme }) => {
    switch ($spacing) {
      case 'compact':
        return `
          padding: ${theme.spacing[4]};
          margin-bottom: ${theme.spacing[4]};
        `;
      case 'relaxed':
        return `
          padding: ${theme.spacing[8]};
          margin-bottom: ${theme.spacing[12]};
        `;
      default:
        return `
          padding: ${theme.spacing[6]};
          margin-bottom: ${theme.spacing[8]};
        `;
    }
  }}
  
  h2, h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    
    svg {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing[3]};
    align-items: center;

    h2, h3 {
      text-align: left;
      justify-content: flex-start;
      flex: 1;
    }
  }
`;

export const CommonPageHeader = styled.div<CommonPageHeaderProps>`
  ${({ $spacing, theme }) => {
    switch ($spacing) {
      case 'compact':
        return `margin-bottom: ${theme.spacing[4]};`;
      case 'relaxed':
        return `margin-bottom: ${theme.spacing[12]};`;
      default:
        return `margin-bottom: ${theme.spacing[8]};`;
    }
  }}
  
  text-align: ${({ $textAlign = 'left' }) => $textAlign};
  
  h1 {
    font-size: ${({ theme }) => theme.textStyles.heading.h1.fontSize};
    font-weight: ${({ theme }) => theme.textStyles.heading.h1.fontWeight};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
    
    ${({ $textAlign }) => $textAlign === 'center' && 'justify-content: center;'}
    
    svg {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
  
  @media (max-width: 768px) {
    text-align: center;
    
    h1 {
      font-size: ${({ theme }) => theme.textStyles.heading.h2.fontSize};
      justify-content: center;
    }
  }
`;

export const CommonCardHeader = styled.div<CommonCardHeaderProps>`
  ${({ $padding = 'md', theme }) => {
    switch ($padding) {
      case 'sm':
        return `padding: ${theme.spacing[4]} ${theme.spacing[6]};`;
      case 'lg':
        return `padding: ${theme.spacing[8]} ${theme.spacing[6]};`;
      default:
        return `padding: ${theme.spacing[6]} ${theme.spacing[6]};`;
    }
  }}
  
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  ${({ $variant, theme }) => {
    if ($variant === 'gradient') {
      return `
        background: linear-gradient(135deg, 
          ${theme.colors.background.secondary} 0%, 
          ${theme.colors.background.tertiary} 100%
        );
      `;
    }
    return `background: ${theme.colors.background.secondary};`;
  }}
`;

export const CommonCardFooter = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $justify: 'between' as const,
  $align: 'center' as const,
})<CommonCardFooterProps>`
  ${({ $padding = 'md', theme }) => {
    switch ($padding) {
      case 'sm':
        return `padding: ${theme.spacing[4]} ${theme.spacing[6]};`;
      case 'lg':
        return `padding: ${theme.spacing[8]} ${theme.spacing[6]};`;
      default:
        return `padding: ${theme.spacing[4]} ${theme.spacing[6]};`;
    }
  }}
  
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    align-items: stretch;
  }
`;

export const CommonLoadingState = styled.div<CommonLoadingStateProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'page':
        return `
          min-height: 60vh;
          padding: 5rem 2rem;
        `;
      case 'section':
        return `
          min-height: 200px;
          padding: 3rem 2rem;
        `;
      default:
        return `
          padding: 2rem;
        `;
    }
  }}
  
  .loading-spinner {
    width: ${({ $variant }) => $variant === 'page' ? '48px' : '32px'};
    height: ${({ $variant }) => $variant === 'page' ? '48px' : '32px'};
    border: 3px solid ${({ theme }) => theme.colors.border.light};
    border-top: 3px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 50%;
    animation: ${commonKeyframes.spin} 1s linear infinite;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
  
  .loading-text {
    font-size: ${({ $variant, theme }) => 
      $variant === 'page' ? theme.typography.fontSize.base : theme.typography.fontSize.sm
    };
  }
`;

export const CommonErrorState = styled.div<CommonErrorStateProps>`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'page':
        return `
          padding: ${theme.spacing[20]};
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `;
      case 'section':
        return `
          padding: ${theme.spacing[16]};
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `;
      default:
        return `
          padding: ${theme.spacing[8]};
        `;
    }
  }}
  
  .error-icon {
    width: ${({ $variant }) => $variant === 'page' ? '64px' : '48px'};
    height: ${({ $variant }) => $variant === 'page' ? '64px' : '48px'};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
  
  .error-title {
    font-size: ${({ $variant, theme }) => 
      $variant === 'page' ? theme.typography.fontSize.xl : theme.typography.fontSize.lg
    };
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
  
  .error-message {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    max-width: 400px;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

export const CommonStatusIndicator = styled.div<CommonStatusIndicatorProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: ${({ theme }) => theme.transition.normal};
  
  ${({ $size = 'md', theme }) => {
    switch ($size) {
      case 'sm':
        return `
          font-size: ${theme.typography.fontSize.xs};
          padding: ${theme.spacing[1]} ${theme.spacing[2]};
        `;
      case 'lg':
        return `
          font-size: ${theme.typography.fontSize.base};
          padding: ${theme.spacing[3]} ${theme.spacing[4]};
        `;
      default:
        return `
          font-size: ${theme.typography.fontSize.sm};
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
        `;
    }
  }}
  
  &::before {
    content: '';
    width: ${({ $size }) => $size === 'lg' ? '10px' : '8px'};
    height: ${({ $size }) => $size === 'lg' ? '10px' : '8px'};
    border-radius: 50%;
  }
  
  ${({ $status, theme }) => {
    switch ($status) {
      case 'live':
        return `
          color: ${theme.colors.error};
          background: rgba(239, 68, 68, 0.1);
          
          &::before {
            background: ${theme.colors.error};
            animation: ${commonKeyframes.pulse} 2s infinite;
          }
        `;
      case 'test':
        return `
          color: ${theme.colors.warning};
          background: rgba(245, 158, 11, 0.1);
          
          &::before {
            background: ${theme.colors.warning};
            animation: ${commonKeyframes.blink} 3s infinite;
          }
        `;
      case 'loading':
        return `
          color: ${theme.colors.text.secondary};
          background: rgba(107, 114, 128, 0.1);
          
          &::before {
            background: ${theme.colors.text.secondary};
            animation: ${commonKeyframes.spin} 1s linear infinite;
          }
        `;
      case 'error':
        return `
          color: ${theme.colors.error};
          background: rgba(239, 68, 68, 0.1);
          
          &::before {
            background: ${theme.colors.error};
          }
        `;
      case 'limited':
        return `
          color: ${theme.colors.warning};
          background: rgba(245, 158, 11, 0.1);
          
          &::before {
            background: ${theme.colors.warning};
            animation: ${commonKeyframes.slowPulse} 4s infinite;
          }
        `;
      default:
        return `
          color: ${theme.colors.text.secondary};
          background: rgba(107, 114, 128, 0.1);
          
          &::before {
            background: ${theme.colors.text.secondary};
          }
        `;
    }
  }}
`;

export const CommonSkeleton = styled.div<CommonSkeletonProps>`
  ${({ $variant, $width = '100%', $height = '20px', theme }) => {
    switch ($variant) {
      case 'circular':
        const size = $width;
        return `
          width: ${size};
          height: ${size};
          border-radius: 50%;
        `;
      case 'rectangular':
        return `
          width: ${$width};
          height: ${$height};
          border-radius: ${theme.borderRadius.md};
        `;
      default:
        return `
          width: ${$width};
          height: ${$height};
          border-radius: ${theme.borderRadius.sm};
        `;
    }
  }}
  
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.background.secondary} 25%, 
    ${({ theme }) => theme.colors.background.tertiary} 50%, 
    ${({ theme }) => theme.colors.background.secondary} 75%
  );
  background-size: 200% 100%;
  animation: ${commonKeyframes.shimmer} 1.5s infinite;
`;

export const SkeletonLine = styled(CommonSkeleton).attrs({
  $height: '16px',
})<{ $width?: string }>`
  width: ${({ $width = '100%' }) => $width};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommonTextSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const CommonActionGroup = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $gap: 3 as const,
  $align: 'center' as const,
})<CommonActionGroupProps>`
  ${({ $justify = 'end' }) => {
    switch ($justify) {
      case 'start': return 'justify-content: flex-start;';
      case 'center': return 'justify-content: center;';
      case 'between': return 'justify-content: space-between;';
      default: return 'justify-content: flex-end;';
    }
  }}
  
  ${({ $responsive = true }) => $responsive && `
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      
      button {
        width: 100%;
      }
    }
  `}
`;

export const CommonStatItem = styled(motion.div)<CommonStatItemProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'card':
        return `
          padding: ${theme.spacing[4]};
          background: ${theme.colors.background.primary};
          border-radius: ${theme.borderRadius.lg};
          border: 1px solid ${theme.colors.border.light};
          box-shadow: ${theme.shadows.card};
        `;
      case 'inline':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          background: ${theme.colors.background.secondary};
          border-radius: ${theme.borderRadius.md};
        `;
      default:
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[4]};
          background: ${theme.colors.background.primary};
          border-radius: ${theme.borderRadius.lg};
          border: 1px solid ${theme.colors.border.light};
        `;
    }
  }}
  
  .stat-icon {
    width: 36px;
    height: 36px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]} 0%, ${({ theme }) => theme.colors.secondary[500]} 100%);
    color: ${({ theme }) => theme.colors.text.inverse};
  }
  
  .stat-content {
    .stat-number {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      color: ${({ theme }) => theme.colors.text.primary};
      line-height: 1;
      margin-bottom: ${({ theme }) => theme.spacing[1]};
    }
    
    .stat-label {
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
      color: ${({ theme }) => theme.colors.text.secondary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    }
  }
`;

import { Spinner, SkeletonLoader } from './animations';

export const CommonGroup = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $align: 'center' as const,
  $gap: 2 as const,
})` `;

export const CommonWrapper = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.componentSpacing.form.fieldGap};

  @media ${({ theme }) => `(max-height: 600px)`} {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

export const SimpleLoadingText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media ${({ theme }) => `(max-height: 600px)`} {
    padding: ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const CommonCommentHeader = styled(FlexContainer).attrs({
  $direction: 'row' as const,
  $justify: 'between' as const,
  $align: 'start' as const,
})`
  position: relative;
  z-index: 10;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const LoadingSpinner = Spinner;

export const ErrorText = styled.div<{
  $size?: 'sm' | 'md';
}>`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ $size = 'sm', theme }) =>
    $size === 'sm' ? theme.typography.fontSize.sm : theme.typography.fontSize.base
  };
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const SuccessText = styled.div<{
  $size?: 'sm' | 'md';
}>`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ $size = 'sm', theme }) =>
    $size === 'sm' ? theme.typography.fontSize.sm : theme.typography.fontSize.base
  };
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const Divider = styled.div<{
  $orientation?: 'horizontal' | 'vertical';
  $margin?: keyof typeof import('../tokens/spacing').spacing;
}>`
  ${({ $orientation = 'horizontal', $margin = 4, theme }) => {
    if ($orientation === 'vertical') {
      return `
        width: 1px;
        height: auto;
        background: ${theme.colors.border.medium};
        margin: 0 ${theme.spacing[$margin]};
      `;
    } else {
      return `
        height: 1px;
        width: 100%;
        background: ${theme.colors.border.medium};
        margin: ${theme.spacing[$margin]};
      `;
    }
  }}
`;

export const Badge = styled.span<{
  $variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  $size?: 'sm' | 'md';
}>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ $size = 'sm', theme }) =>
    $size === 'sm'
      ? `${theme.spacing[1]} ${theme.spacing[2]}`
      : `${theme.spacing[2]} ${theme.spacing[3]}`
  };
  font-size: ${({ $size = 'sm', theme }) =>
    $size === 'sm' ? theme.typography.fontSize.xs : theme.typography.fontSize.sm
  };
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.xl};

  ${({ $variant = 'default', theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: ${theme.colors.success};
          border: 1px solid rgba(16, 185, 129, 0.2);
        `;
      case 'warning':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: ${theme.colors.warning};
          border: 1px solid rgba(245, 158, 11, 0.2);
        `;
      case 'error':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: ${theme.colors.error};
          border: 1px solid rgba(239, 68, 68, 0.2);
        `;
      case 'info':
        return `
          background: rgba(102, 126, 234, 0.1);
          color: ${theme.colors.primary[500]};
          border: 1px solid rgba(102, 126, 234, 0.2);
        `;
      default:
        return `
          background: ${theme.colors.background.secondary};
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.border.medium};
        `;
    }
  }}
`;

export const ContentSkeleton = styled(SkeletonLoader)` `;