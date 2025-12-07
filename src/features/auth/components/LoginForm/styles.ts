import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FlexContainer,
  LinkButton,
  BaseButton,
  BaseCheckbox,
  CommonActionGroup 
} from '@/shared/styles/components';

export const SignupPrompt = styled(motion.div)`
  text-align: center;
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin: 0;
  }
  
  button {
    color: ${({ theme }) => theme.colors.primary[500]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-decoration: underline;
    text-decoration-style: dotted;
    text-underline-offset: 2px;
    background: none;
    border: none;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition.fast};
    margin-left: ${({ theme }) => theme.spacing[1]};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary[600]};
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const OptionsContainer = styled(CommonActionGroup).attrs({
  $justify: 'between' as const,
})`
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

export const ForgotPasswordLink = styled(LinkButton)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const PasswordToggleButton = styled.button`
  color: ${({ theme }) => theme.colors.text.secondary};
  background: none;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  padding: ${({ theme }) => theme.spacing[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DemoContainer = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[2]};
  background: linear-gradient(to right, #eff6ff, #eef2ff);
  border: 1px solid #bfdbfe;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  button {
    width: 100%;
  }
`;

