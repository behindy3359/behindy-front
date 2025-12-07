import React, { useState, useEffect } from 'react';
import { useMultiplayerStore } from '@/shared/store/multiplayerStore';
import { MessageType } from '@/shared/types/multiplayer';
import {
  ChatInputContainer,
  ChatInputWrapper,
  ChatTextarea,
  ChatSendButton,
  ChatActionButton,
  ChatCooldownInfo,
} from '@/shared/styles/components';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onSendAction?: () => void;
  disabled?: boolean;
  headerMode?: boolean;
}

const MAX_LENGTH = 100;
const RATE_LIMIT_MS = 2000;

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendAction,
  disabled = false,
  headerMode = false,
}) => {
  const [content, setContent] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const { messages, canSendMessage, updateLastMessageSentAt } = useMultiplayerStore();

  const hasUserMessages = messages.some(msg => msg.messageType === MessageType.USER);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 100), 100);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSend = () => {
    if (!content.trim() || disabled || !canSendMessage()) {
      return;
    }

    onSendMessage(content.trim());
    setContent('');
    updateLastMessageSentAt();
    setCooldown(RATE_LIMIT_MS);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAction = () => {
    if (disabled || !onSendAction) {
      return;
    }

    onSendAction();
  };

  const isSendDisabled = disabled || !content.trim() || cooldown > 0;
  const isActionDisabled = disabled || !hasUserMessages;

  if (headerMode && onSendAction) {
    return (
      <ChatActionButton onClick={handleAction} disabled={isActionDisabled}>
        행동하기
      </ChatActionButton>
    );
  }

  return (
    <ChatInputContainer>
      <ChatInputWrapper style={{ position: 'relative' }}>
        <ChatTextarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= MAX_LENGTH) {
              setContent(e.target.value);
            }
          }}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요... (Enter로 전송)"
          disabled={disabled}
          maxLength={MAX_LENGTH}
          rows={2}
        />
        <ChatCooldownInfo style={{
          position: 'absolute',
          bottom: '8px',
          right: '90px',
          fontSize: '12px',
          color: '#9ca3af',
          pointerEvents: 'none'
        }}>
          {content.length}/{MAX_LENGTH}
        </ChatCooldownInfo>
        <ChatSendButton onClick={handleSend} disabled={isSendDisabled}>
          {cooldown > 0 ? `${(cooldown / 1000).toFixed(1)}s` : '전송'}
        </ChatSendButton>
      </ChatInputWrapper>
    </ChatInputContainer>
  );
};
