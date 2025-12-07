import styled from 'styled-components';
import { commonMixins } from './mixins';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  ${commonMixins.elevation(2)};
  z-index: 10;
`;

export const ChatHeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

export const ChatHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

export const ChatMainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ChatMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const ChatMessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  ${commonMixins.customScrollbar()};
`;

export const ChatInputContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  background: transparent;
  border-top: none;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
`;

export const ChatTextarea = styled.textarea`
  flex: 1;
  min-height: 2.5rem;
  max-height: 6rem;
  padding: 0.625rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-medium);
  border-radius: 1.25rem;
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-family: inherit;
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-tertiary);
  }

  ${commonMixins.customScrollbar()};
`;

export const ChatSendButton = styled.button`
  padding: 0.625rem 1.5rem;
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: var(--primary-600);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChatActionButton = styled.button`
  padding: 0.625rem 1.25rem;
  background: var(--game-choice);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChatCooldownInfo = styled.div`
  font-size: 0.8125rem;
  color: var(--warning);
  margin-top: 0.375rem;
  text-align: center;
`;

export const MessageBubble = styled.div<{ $isSystem?: boolean; $isOwn?: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => (props.$isSystem ? '100%' : '75%')};
  align-self: ${(props) => {
    if (props.$isSystem) return 'center';
    if (props.$isOwn) return 'flex-end';
    return 'flex-start';
  }};
`;

export const MessageContent = styled.div<{
  $backgroundColor: string;
  $textColor: string;
}>`
  padding: 0.75rem 1rem;
  background: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  border-radius: 1rem;
  word-wrap: break-word;
  line-height: 1.5;
`;

export const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.8125rem;
`;

export const MessageSender = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`;

export const MessageTime = styled.span`
  color: var(--text-tertiary);
  font-size: 0.75rem;
`;

export const MessageTypeIndicator = styled.span<{ $type: string }>`
  padding: 0.125rem 0.5rem;
  background: ${(props) => {
    switch (props.$type) {
      case 'PHASE':
        return 'rgba(16, 185, 129, 0.2)';
      case 'LLM':
        return 'rgba(59, 130, 246, 0.2)';
      case 'VOTE':
        return 'rgba(239, 68, 68, 0.2)';
      default:
        return 'rgba(147, 51, 234, 0.2)';
    }
  }};
  color: var(--text-primary);
  border-radius: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 500;
`;

export const ParticipantPanel = styled.aside`
  width: 100%;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[1]};
  ${commonMixins.customScrollbar()};

  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-y: visible;
  }
`;

export const ParticipantPanelHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
  border-bottom: 1px solid var(--border-light);
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
`;

export const ParticipantList = styled.div`
  padding: 0.75rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem;
    overflow-x: auto;
    ${commonMixins.customScrollbar()};
  }
`;

export const ParticipantCard = styled.div<{ $isOwner?: boolean }>`
  padding: 0.75rem;
  background: var(--bg-primary);
  border: 1px solid ${(props) => (props.$isOwner ? 'var(--primary-500)' : 'var(--border-light)')};
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 120px;

  &:hover {
    ${commonMixins.elevation(2)};
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: auto;
    min-width: 120px;
    flex-shrink: 0;
  }
`;

export const ParticipantName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const ParticipantStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
`;

export const StatBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

export const StatBarTrack = styled.div`
  height: 0.5rem;
  background: var(--bg-tertiary);
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const StatBarFill = styled.div<{ $value: number; $color: string }>`
  height: 100%;
  width: ${(props) => props.$value}%;
  background: ${(props) => props.$color};
  transition: width 0.3s ease, background 0.3s ease;
`;

export const VoteContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(239, 68, 68, 0.06) 100%);
  border: 1px solid var(--error);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: 0;
  box-shadow: ${({ theme }) => theme.shadows.base.md};
`;

export const VoteHeader = styled.div`
  font-weight: 600;
  color: var(--error);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const VoteContent = styled.div`
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 0.9375rem;
`;

export const VoteActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const VoteButton = styled.button<{ $approve?: boolean }>`
  flex: 1;
  padding: 0.625rem;
  background: ${(props) => (props.$approve ? 'var(--error)' : 'var(--text-tertiary)')};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const VoteTimer = styled.div`
  text-align: center;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
`;
