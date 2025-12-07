import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const ModalContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.base.lg};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const ModalCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transition.fast};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: 1;
  width: 32px;
  height: 32px;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.light};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.border.dark};
    }
  }
`;

export const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

export const ModalDescription = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[6]} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const ModalActionCard = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.background.tertiary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }
`;

export const ModalRoomCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  transition: ${({ theme }) => theme.transition.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalRoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

export const ModalRoomTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ModalRoomBadge = styled.span<{ $status?: string }>`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  background: ${({ $status, theme }) =>
    $status === 'PLAYING' ? theme.colors.error : theme.colors.warning};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ModalRoomInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const ModalRoomInfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const ModalEmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export const ModalFormField = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalFormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.background.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const ModalSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.background.primary};
  }

  option {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ModalCharacterOption = styled.div<{ $selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.background.tertiary : theme.colors.background.secondary};
  border: 2px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.primary[500] : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.normal};
  margin-bottom: ${({ theme }) => theme.spacing[3]};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing[1]} 0;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
