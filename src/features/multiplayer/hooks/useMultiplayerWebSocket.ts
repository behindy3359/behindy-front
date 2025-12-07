import { useEffect, useRef, useCallback } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useMultiplayerStore } from '@/shared/store/multiplayerStore';
import { useAuthStore } from '@/shared/store/authStore';
import type { ChatMessage, RoomVote } from '@/shared/types/multiplayer';
import { VoteStatus } from '@/shared/types/multiplayer';

const WS_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '/ws') || 'http://localhost:8080/ws';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;
const HEARTBEAT_INTERVAL = 30000;

interface UseMultiplayerWebSocketProps {
  roomId: number;
  onMessage?: (message: ChatMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: string) => void;
}

export const useMultiplayerWebSocket = ({
  roomId,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
}: UseMultiplayerWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const subscriptionRef = useRef<StompSubscription[]>([]);
  const lastMessageIdRef = useRef<number>(0);

  const { setConnectionState, addMessage, messages, setActiveVote, updateParticipants } = useMultiplayerStore();
  const { tokens } = useAuthStore();

  const applyVoteState = useCallback((metadata: Record<string, any> | undefined, createdAt: string) => {
    if (!metadata || !metadata.voteId) return;

    const voteState: RoomVote = {
      voteId: metadata.voteId,
      roomId,
      voteType: metadata.voteType || 'KICK',
      targetUserId: metadata.targetUserId,
      targetUsername: metadata.targetUsername || '알 수 없음',
      initiatedByUserId: metadata.initiatedByUserId,
      initiatedByUsername: metadata.initiatedByUsername || '알 수 없음',
      status: (metadata.status as VoteStatus) || VoteStatus.PENDING,
      createdAt,
      expiresAt: metadata.expiresAt || createdAt,
      yesCount: metadata.yesCount ?? 0,
      noCount: metadata.noCount ?? 0,
      requiredVotes: metadata.requiredVotes,
    };

    setActiveVote(voteState);
  }, [roomId, setActiveVote]);

  const handleMessage = useCallback((message: IMessage) => {
    try {
      const chatMessage: ChatMessage = JSON.parse(message.body);

      lastMessageIdRef.current = chatMessage.messageId;

      if (chatMessage.messageType === 'VOTE') {
        applyVoteState(chatMessage.metadata, chatMessage.createdAt);
      }

      addMessage(chatMessage);

      if (onMessage) {
        onMessage(chatMessage);
      }
    } catch {
    }
  }, [applyVoteState, onMessage, addMessage]);

  const syncMissedMessages = useCallback(() => {
    if (!clientRef.current || !clientRef.current.connected) return;

    const lastMessageId = lastMessageIdRef.current;

    if (lastMessageId > 0) {
      clientRef.current.publish({
        destination: `/app/room/${roomId}/sync`,
        body: JSON.stringify({ lastMessageId })
      });
    }
  }, [roomId]);

  const connect = useCallback(() => {
    if (clientRef.current?.connected) {
      return;
    }

    setConnectionState({
      connected: false,
      connecting: true,
      error: undefined
    });

    const wsUrl = tokens.accessToken
      ? `${WS_URL}?token=${encodeURIComponent(tokens.accessToken)}`
      : WS_URL;

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),

      connectHeaders: {},

      reconnectDelay: RECONNECT_DELAY,
      heartbeatIncoming: HEARTBEAT_INTERVAL,
      heartbeatOutgoing: HEARTBEAT_INTERVAL,

      onConnect: () => {
        reconnectAttemptsRef.current = 0;
        subscriptionRef.current = [];

        setConnectionState({
          connected: true,
          connecting: false,
          error: undefined
        });

        const roomSubscription = client.subscribe(
          `/topic/room/${roomId}`,
          handleMessage
        );
        const participantsSubscription = client.subscribe(
          `/topic/room/${roomId}/participants`,
          (message) => {
            try {
              const update = JSON.parse(message.body);
              if (update.type === 'participant_update' && update.participants) {
                updateParticipants(update.participants);
              }
            } catch {
            }
          }
        );
        const syncSubscription = client.subscribe(
          '/user/queue/sync',
          (message) => {
            try {
              const syncedMessages: ChatMessage[] = JSON.parse(message.body);
              syncedMessages.forEach((msg) => {
                lastMessageIdRef.current = Math.max(lastMessageIdRef.current, msg.messageId);
                if (msg.messageType === 'VOTE') {
                  applyVoteState(msg.metadata, msg.createdAt);
                }
                addMessage(msg);
              });
            } catch {
            }
          }
        );
        const errorSubscription = client.subscribe(
          '/user/queue/errors',
          (errorFrame) => {
            const parsed = (() => {
              try {
                return JSON.parse(errorFrame.body);
              } catch {
                return null;
              }
            })();
            const errorMessage = parsed?.message || 'WebSocket error';
            setConnectionState({
              connected: false,
              connecting: false,
              error: errorMessage
            });
          }
        );

        subscriptionRef.current.push(roomSubscription, participantsSubscription, syncSubscription, errorSubscription);

        syncMissedMessages();

        if (onConnect) {
          onConnect();
        }
      },

      onDisconnect: () => {
        setConnectionState({
          connected: false,
          connecting: false,
          error: undefined
        });

        if (onDisconnect) {
          onDisconnect();
        }
      },

      onStompError: (frame) => {
        const errorMessage = frame.headers?.message || 'WebSocket connection error';

        setConnectionState({
          connected: false,
          connecting: false,
          error: errorMessage
        });

        reconnectAttemptsRef.current++;

        if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
          const finalError = 'Maximum reconnection attempts reached';

          setConnectionState({
            connected: false,
            connecting: false,
            error: finalError
          });

          if (onError) {
            onError(finalError);
          }
        }
      },

      onWebSocketError: () => {
      },
    });

    clientRef.current = client;
    client.activate();
  }, [roomId, handleMessage, syncMissedMessages, onConnect, onDisconnect, onError, applyVoteState, addMessage, updateParticipants, setConnectionState, tokens.accessToken]);

  const disconnect = useCallback(() => {
    subscriptionRef.current.forEach((sub) => sub?.unsubscribe());
    subscriptionRef.current = [];

    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }

    setConnectionState({
      connected: false,
      connecting: false,
      error: undefined
    });
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!clientRef.current?.connected) {
      return false;
    }

    try {
      const payload = { content };

      clientRef.current.publish({
        destination: `/app/room/${roomId}/chat`,
        body: JSON.stringify(payload)
      });

      return true;
    } catch {
      return false;
    }
  }, [roomId]);

  const sendAction = useCallback(() => {
    if (!clientRef.current?.connected) {
      return false;
    }

    try {
      clientRef.current.publish({
        destination: `/app/room/${roomId}/action`,
        body: '{}'
      });

      return true;
    } catch {
      return false;
    }
  }, [roomId]);

  const startKickVote = useCallback((targetUserId: number) => {
    if (!clientRef.current?.connected) {
      return false;
    }

    try {
      clientRef.current.publish({
        destination: `/app/room/${roomId}/vote/kick`,
        body: JSON.stringify({ targetUserId })
      });

      return true;
    } catch {
      return false;
    }
  }, [roomId]);

  const submitBallot = useCallback((voteId: number, vote: boolean) => {
    if (!clientRef.current?.connected) {
      return false;
    }

    try {
      clientRef.current.publish({
        destination: `/app/room/${roomId}/vote/${voteId}/ballot`,
        body: JSON.stringify({ vote })
      });

      return true;
    } catch {
      return false;
    }
  }, [roomId]);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      lastMessageIdRef.current = latestMessage.messageId;
    }
  }, [messages]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [roomId]);

  return {
    connected: clientRef.current?.connected || false,
    sendMessage,
    sendAction,
    startKickVote,
    submitBallot,
    disconnect,
  };
};
