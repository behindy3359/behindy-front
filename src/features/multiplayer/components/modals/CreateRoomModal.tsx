import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Users } from 'lucide-react';
import { roomApi } from '../../api/roomApi';
import { useCharacterData } from '@/features/game/hooks/useCharacterData';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalFormField,
  ModalFormLabel,
  ModalInput,
  ModalDescription,
} from '@/shared/styles/components';

const CharacterBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[3]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[3]};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  stationId: number;
  lineNumber: number;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  stationName,
  stationId,
  lineNumber,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    roomName: '',
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { character, isLoading: characterLoading } = useCharacterData({ redirectOnUnauth: false });
  const formId = 'create-room-form';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomName.trim()) {
      setError('방 이름을 입력해주세요');
      return;
    }

    if (!character?.charId) {
      setError('캐릭터가 없습니다. 먼저 캐릭터를 생성해주세요');
      return;
    }

    try {
      setCreating(true);
      setError(null);

      const room = await roomApi.createRoom({
        stationId: stationId || undefined,
        stationName,
        lineNumber,
        characterId: character.charId,
        roomName: formData.roomName.trim(),
      });

      router.push(`/multiplayer/room/${room.roomId}`);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '방 생성에 실패했습니다';
      setError(errorMessage);
      console.error('[CreateRoomModal] Create error:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleClose = () => {
    if (!creating) {
      setFormData({
        roomName: '',
      });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <ModalContainer
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <div>
            <ModalTitle>새 방 만들기</ModalTitle>
            <ModalDescription>{stationName}</ModalDescription>
          </div>
          <ModalCloseButton onClick={handleClose} aria-label="닫기">
            ✕
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <CharacterBadge>
            <Users size={18} />
            {characterLoading
              ? '캐릭터 정보를 불러오는 중...'
              : character?.charId
                ? `${character.charName} (체력 ${character.charHealth} / 정신력 ${character.charSanity})`
                : '캐릭터가 없습니다. 먼저 캐릭터를 생성해주세요.'}
          </CharacterBadge>

          <form id={formId} onSubmit={handleSubmit}>
            <ModalFormField>
              <ModalFormLabel htmlFor="roomName">방 이름 *</ModalFormLabel>
              <ModalInput
                id="roomName"
                type="text"
                value={formData.roomName}
                onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                placeholder="예: 노량진 탐험대"
                maxLength={50}
                disabled={creating}
              />
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {formData.roomName.length}/50
              </p>
            </ModalFormField>

            {error && (
              <div style={{ marginTop: '16px', color: '#dc2626', fontSize: '14px' }}>{error}</div>
            )}
          </form>
        </ModalBody>

        <ModalFooter>
          <SecondaryButton onClick={handleClose} disabled={creating}>
            취소
          </SecondaryButton>
          <PrimaryButton type="submit" form={formId} disabled={creating || !character?.charId}>
            {creating ? '방 생성 중...' : '방 만들기'}
          </PrimaryButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};
