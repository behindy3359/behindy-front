import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { BaseButton, LoadingSpinner } from '@/shared/styles/components';
import { GamePageHeader } from '@/shared/components/game';
import { useMultiplayerStore } from '@/shared/store/multiplayerStore';
import { useMultiplayerWebSocket } from '../hooks/useMultiplayerWebSocket';
import { roomApi } from '../api/roomApi';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ParticipantPanel } from './ParticipantPanel';
import { VotePanel } from './VotePanel';
import { MultiplayerEndingPage } from './MultiplayerEndingPage';
import {
  ContentGrid,
  InputSurface,
  MessageArea,
  MessagesCard,
  MessagesHeader,
  RoomPage,
  SectionHint,
  SectionTitle,
  SidebarCard,
  SidebarDescription,
  SidebarHeader,
  SidebarTitle,
  StateCard,
  StateDescription,
  StateTitle,
} from './ChatRoom.styles';

interface ChatRoomProps {
  roomId: number;
  currentUserId?: number;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, currentUserId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentRoom,
    setCurrentRoom,
    setMessages,
    messages,
    connectionState,
    setActiveVote,
  } = useMultiplayerStore();

  const endingMessage = useMemo(() => {
    const ending = messages.find(
      (msg) => msg.messageType === 'SYSTEM' && msg.metadata?.type === 'ending'
    );
    return ending;
  }, [messages]);

  const endingSummary = endingMessage?.metadata?.ending_summary as string | undefined;

  const { connected, sendMessage, sendAction, startKickVote, submitBallot } = useMultiplayerWebSocket({
    roomId,
    onConnect: () => {
    },
    onDisconnect: () => {
    },
    onError: (err) => {
      console.error('[ChatRoom] WebSocket error:', err);
      setError(err);
    },
  });

  useEffect(() => {
    const loadRoomData = async () => {
      try {
        setLoading(true);
        const data = await roomApi.getRoomDetail(roomId);

        setCurrentRoom(data.room);
        setMessages(data.messages);
        setActiveVote(data.activeVote || null);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load room';
        setError(errorMessage);
        console.error('[ChatRoom] Load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRoomData();
  }, [roomId, setCurrentRoom, setMessages, setActiveVote]);

  const connectionStatus = useMemo<'connected' | 'connecting' | 'disconnected'>(() => {
    const status = connectionState.connecting
      ? 'connecting'
      : (connected ? 'connected' : 'disconnected');

    return status;
  }, [connected, connectionState.connecting, connectionState.error]);

  const connectionLabel =
    connectionStatus === 'connected'
      ? '실시간 연결됨'
      : connectionStatus === 'connecting'
        ? '연결 중...'
        : '연결 끊김';

  const handleLeaveRoom = async () => {
    if (!confirm('방을 나가시겠습니까?')) {
      return;
    }

    try {
      await roomApi.leaveRoom(roomId);
      router.push('/');
    } catch (err) {
      console.error('[ChatRoom] Leave error:', err);
      alert('방 나가기에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <RoomPage>
        <StateCard>
          <LoadingSpinner $size="lg" />
          <StateTitle>방 정보를 불러오는 중입니다</StateTitle>
          <StateDescription>잠시만 기다려주세요. 최신 상태를 불러오고 있습니다.</StateDescription>
        </StateCard>
      </RoomPage>
    );
  }

  if (error || !currentRoom) {
    return (
      <RoomPage>
        <StateCard>
          <StateTitle>방을 불러올 수 없습니다</StateTitle>
          <StateDescription>{error || '방을 찾을 수 없습니다. 다시 시도해 주세요.'}</StateDescription>
          <BaseButton
            variant="primary"
            size="md"
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            홈으로 돌아가기
          </BaseButton>
        </StateCard>
      </RoomPage>
    );
  }

  if (endingSummary) {
    return (
      <RoomPage>
        <MultiplayerEndingPage
          stationName={currentRoom.stationName}
          endingSummary={endingSummary}
        />
      </RoomPage>
    );
  }

  const activeParticipants = currentRoom.participants.filter((p) => p.isActive);

  return (
    <RoomPage>
      <GamePageHeader
        mode="multi"
        title={currentRoom.roomName}
        metadata={{
          stationName: currentRoom.stationName,
          lineNumber: '', // 멀티플레이는 lineNumber를 별도 표시하지 않음
        }}
        status={{
          connectionState: connectionStatus,
          participantCount: activeParticipants.length,
          maxPlayers: currentRoom.maxPlayers,
        }}
        showQuitButton={true}
        onQuit={handleLeaveRoom}
      />

      {connectionState.error && (
        <SectionHint>연결 상태: {connectionState.error}</SectionHint>
      )}

      <ContentGrid>
        <SidebarCard>
          <SidebarHeader>
            <div>
              <SidebarTitle>
                <Users size={18} />
                참여자 목록
              </SidebarTitle>
              <SidebarDescription>
                방장 포함 {activeParticipants.length}명 참여 중
              </SidebarDescription>
            </div>
          </SidebarHeader>

          <ParticipantPanel
            participants={currentRoom.participants}
            ownerId={currentRoom.ownerId}
            currentUserId={currentUserId}
            onKickVote={startKickVote}
            showHeader={false}
          />
        </SidebarCard>

        <MessagesCard>
          <MessagesHeader>
            <div>
              <SectionTitle>대화와 스토리 흐름</SectionTitle>
              <SectionHint>실시간 메시지, 투표, 스토리 로그를 확인하세요.</SectionHint>
            </div>
            <ChatInput
              onSendMessage={sendMessage}
              onSendAction={sendAction}
              disabled={connectionStatus !== 'connected'}
              headerMode={true}
            />
          </MessagesHeader>

          <MessageArea>
            <VotePanel
              currentUserId={currentUserId}
              onSubmitBallot={submitBallot}
            />
            <MessageList currentUserId={currentUserId} />
          </MessageArea>

          <InputSurface>
            <ChatInput
              onSendMessage={sendMessage}
              disabled={connectionStatus !== 'connected'}
            />
          </InputSurface>
        </MessagesCard>
      </ContentGrid>
    </RoomPage>
  );
};
