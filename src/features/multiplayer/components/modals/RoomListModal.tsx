import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Users, RefreshCw, AlertCircle, Crown } from 'lucide-react';
import { roomApi } from '../../api/roomApi';
import type { MultiplayerRoom } from '@/shared/types/multiplayer';
import { RoomStatus } from '@/shared/types/multiplayer';
import { useCharacterData } from '@/features/game/hooks/useCharacterData';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalRoomCard,
  ModalRoomHeader,
  ModalRoomTitle,
  ModalRoomBadge,
  ModalRoomInfo,
  ModalRoomInfoItem,
  ModalEmptyState,
  ModalDescription,
  LoadingSpinner,
  FormError,
} from '@/shared/styles/components';

const CharacterCard = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  .title {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  .stats {
    display: flex;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ $variant, theme }) =>
    $variant === 'ghost' ? 'transparent' : theme.colors.primary[500]};
  color: ${({ $variant, theme }) =>
    $variant === 'ghost' ? theme.colors.text.secondary : '#fff'};
  border: ${({ $variant, theme }) =>
    $variant === 'ghost' ? `1px solid ${theme.colors.border.light}` : 'none'};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const JoinButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};

  &:disabled {
    background: ${({ theme }) => theme.colors.border.light};
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: not-allowed;
  }
`;

interface RoomListModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  stationId: number;
  lineNumber: number;
  onCreateNewRoom: () => void;
}

export const RoomListModal: React.FC<RoomListModalProps> = ({
  isOpen,
  onClose,
  stationName,
  stationId,
  lineNumber,
  onCreateNewRoom,
}) => {
  const router = useRouter();
  const [rooms, setRooms] = useState<MultiplayerRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joiningRoomId, setJoiningRoomId] = useState<number | null>(null);
  const { character, isLoading: characterLoading } = useCharacterData({ redirectOnUnauth: false });
  const hasCharacter = Boolean(character?.charId);

  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await roomApi.getRoomList({
        stationId: stationId || undefined,
        stationName,
        lineNumber,
      });

      const waitingRooms = data.filter(room => room.status === RoomStatus.WAITING);
      setRooms(waitingRooms);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '방 목록을 불러오는데 실패했습니다';
      setError(errorMessage);
      console.error('[RoomListModal] Load error:', err);
    } finally {
      setLoading(false);
    }
  }, [stationId, stationName, lineNumber]);

  useEffect(() => {
    if (isOpen) {
      loadRooms();
    }
  }, [isOpen, loadRooms]);

  const handleJoinRoom = async (roomId: number) => {
    try {
      if (!character?.charId) {
        setError('방에 참가하려면 먼저 플레이할 캐릭터를 만들어야 합니다');
        return;
      }

      setJoiningRoomId(roomId);

      await roomApi.joinRoom(roomId, {
        characterId: character.charId,
      });

      router.push(`/multiplayer/room/${roomId}`);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '방 참가에 실패했습니다';
      setError(errorMessage);
      console.error('[RoomListModal] Join error:', err);
    } finally {
      setJoiningRoomId(null);
    }
  };

  const handleCreateRoomRequest = () => {
    if (!character?.charId) {
      setError('새 방을 만들기 전에 사용할 캐릭터를 생성해주세요');
      return;
    }
    onCreateNewRoom();
  };

  const handleCreateCharacter = () => {
    router.push('/character/create');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContainer
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>
            {stationName} 방 목록
          </ModalTitle>
          <ModalCloseButton onClick={onClose} aria-label="닫기">
            ✕
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <ModalDescription>
            함께 플레이할 방을 선택하세요. 대기 중인 방이 없다면 새 방을 만들거나 다른 역을 선택할 수 있습니다.
          </ModalDescription>

          <CharacterCard>
            {characterLoading ? (
              <div className="title">
                <LoadingSpinner $size="sm" />
                캐릭터 정보를 불러오는 중...
              </div>
            ) : hasCharacter ? (
              <>
                <div className="title">
                  <Users size={18} />
                  {character?.charName}
                </div>
                <div className="stats">
                  <span>체력 {character?.charHealth}</span>
                  <span>정신력 {character?.charSanity}</span>
                </div>
              </>
            ) : (
              <>
                <div className="title">
                  <AlertCircle size={18} />
                  캐릭터가 필요합니다
                </div>
                <p>멀티플레이어를 이용하려면 먼저 캐릭터를 생성해주세요.</p>
                <ActionButton onClick={handleCreateCharacter}>
                  캐릭터 만들기
                </ActionButton>
              </>
            )}
          </CharacterCard>

          {error && (
            <FormError>
              <AlertCircle size={16} />
              {error}
            </FormError>
          )}

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <LoadingSpinner $size="md" />
            </div>
          ) : rooms.length === 0 ? (
            <ModalEmptyState>
              <Users size={48} />
              <p>대기 중인 방이 없습니다. 새 방을 만들어 모험을 시작하세요!</p>
            </ModalEmptyState>
          ) : (
            rooms.map((room) => {
              const participantCount = room.currentPlayers ?? room.participants.filter(p => p.isActive).length;
              const isFull = participantCount >= (room.maxPlayers ?? 3);
              const isJoining = joiningRoomId === room.roomId;
              return (
                <ModalRoomCard key={room.roomId}>
                  <ModalRoomHeader>
                    <div>
                      <ModalRoomTitle>{room.roomName}</ModalRoomTitle>
                      <ModalRoomInfo>
                        <ModalRoomInfoItem>
                          👥 {participantCount}/{room.maxPlayers ?? 3}
                        </ModalRoomInfoItem>
                      </ModalRoomInfo>
                    </div>
                    <ModalRoomBadge $status={room.status}>
                      {room.status === RoomStatus.WAITING ? '대기중' : room.status}
                    </ModalRoomBadge>
                  </ModalRoomHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {room.participants
                        .filter(p => p.isActive)
                        .map((participant) => (
                          <span
                            key={participant.participantId}
                            style={{
                              fontSize: '12px',
                              padding: '6px 10px',
                              borderRadius: '999px',
                              background: 'rgba(99, 102, 241, 0.1)',
                              color: '#4c1d95',
                            }}
                          >
                            {participant.characterName}
                            {participant.userId === room.ownerId && (
                              <span style={{ marginLeft: 4 }}>
                                <Crown size={12} />
                              </span>
                            )}
                          </span>
                        ))}
                    </div>
                    <JoinButton
                      onClick={() => handleJoinRoom(room.roomId)}
                      disabled={isFull || isJoining || !hasCharacter}
                    >
                      {isJoining ? '참가 중...' : isFull ? '만석' : !hasCharacter ? '캐릭터 필요' : '참가하기'}
                    </JoinButton>
                  </div>
                </ModalRoomCard>
              );
            })
          )}
        </ModalBody>

        <ModalFooter>
          <ActionButton
            $variant="ghost"
            onClick={loadRooms}
            disabled={loading}
          >
            <RefreshCw size={16} />
            다시 불러오기
          </ActionButton>
          <ActionButton
            onClick={handleCreateRoomRequest}
            disabled={!hasCharacter}
          >
            새 방 만들기
          </ActionButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};
