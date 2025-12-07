import React from 'react';
import type { ChatMessage, MessageType } from '@/shared/types/multiplayer';
import { MessageBubble, MessageContent, MessageMeta } from '@/shared/styles/components';

interface MessageItemProps {
  message: ChatMessage;
  currentUserId?: number;
}

const getMessageColors = (type: MessageType): { bg: string; text: string } => {
  switch (type) {
    case 'USER':
      return { bg: 'var(--bg-secondary)', text: 'var(--text-primary)' };
    case 'LLM':
      return { bg: 'rgba(139, 92, 246, 0.1)', text: 'var(--text-primary)' };
    case 'SYSTEM':
      return { bg: 'var(--bg-tertiary)', text: 'var(--text-secondary)' };
    case 'PHASE':
      return { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--text-primary)' };
    case 'VOTE':
      return { bg: 'rgba(239, 68, 68, 0.1)', text: 'var(--text-primary)' };
    default:
      return { bg: 'var(--bg-secondary)', text: 'var(--text-primary)' };
  }
};

export const MessageItem: React.FC<MessageItemProps> = ({ message, currentUserId }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const colors = getMessageColors(message.messageType);

  const isOwn = message.messageType === 'USER' && !!currentUserId && message.userId === currentUserId;

  if (message.messageType === 'SYSTEM') {
    return (
      <MessageBubble $isSystem>
        <MessageContent $backgroundColor={colors.bg} $textColor={colors.text}>
          {message.content}
        </MessageContent>
      </MessageBubble>
    );
  }

  if (message.messageType === 'PHASE') {
    return (
      <MessageBubble>
        <MessageContent $backgroundColor={colors.bg} $textColor={colors.text} style={{ whiteSpace: 'pre-wrap' }}>
          {message.content}
        </MessageContent>
        <MessageMeta>{formatTime(message.createdAt)}</MessageMeta>
      </MessageBubble>
    );
  }

  return (
    <MessageBubble $isOwn={isOwn}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
        <span style={{
          fontWeight: 500,
          fontSize: '0.875rem',
          color: message.messageType === 'LLM' ? 'rgba(139, 92, 246, 1)' : 'inherit'
        }}>
          {message.messageType === 'LLM' ? '지하철의 목소리' : message.characterName || message.username || '익명'}
        </span>
        <MessageMeta>{formatTime(message.createdAt)}</MessageMeta>
      </div>
      <MessageContent $backgroundColor={colors.bg} $textColor={colors.text} style={{ whiteSpace: 'pre-wrap' }}>
        {message.content}
      </MessageContent>
    </MessageBubble>
  );
};
