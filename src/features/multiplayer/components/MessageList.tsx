import React, { useEffect, useRef } from 'react';
import { useMultiplayerStore } from '@/shared/store/multiplayerStore';
import { MessageItem } from './MessageItem';
import { MessageEmptyState, MessageScrollArea } from './ChatRoom.styles';

interface MessageListProps {
  className?: string;
  currentUserId?: number;
}

export const MessageList: React.FC<MessageListProps> = ({ className, currentUserId }) => {
  const { messages } = useMultiplayerStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <MessageEmptyState className={className}>
        메시지가 없습니다. 첫 대화를 시작해 보세요!
      </MessageEmptyState>
    );
  }

  return (
    <MessageScrollArea ref={containerRef} className={className}>
      {messages.map((message) => (
        <MessageItem key={message.messageId} message={message} currentUserId={currentUserId} />
      ))}
      <div ref={messagesEndRef} />
    </MessageScrollArea>
  );
};
