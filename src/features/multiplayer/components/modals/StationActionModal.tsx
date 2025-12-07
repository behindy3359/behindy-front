import React from 'react';
import { useRouter } from 'next/navigation';
import { Users, Compass } from 'lucide-react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalTitle, ModalCloseButton, ModalBody, ModalDescription, ModalActionCard } from '@/shared/styles/components';
import styled from 'styled-components';

interface StationActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  lineNumber: number;
  onMultiplayerClick: () => void;
}

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ActionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StationActionModal: React.FC<StationActionModalProps> = ({
  isOpen,
  onClose,
  stationName,
  lineNumber,
  onMultiplayerClick,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSoloPlay = () => {
    const gameUrl = `/game?station=${encodeURIComponent(stationName)}&line=${lineNumber}`;
    router.push(gameUrl);
    onClose();
  };

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
            {stationName}
            <ActionBadge>{lineNumber}호선</ActionBadge>
          </ModalTitle>
          <ModalCloseButton onClick={onClose} aria-label="닫기">
            ✕
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalDescription>
            모드를 선택하여 {stationName}역의 스토리를 시작하세요.
          </ModalDescription>

          <ActionGrid>
            <ModalActionCard
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSoloPlay}
            >
              <h3>
                <Compass size={20} />
                혼자 탐험하기
              </h3>
              <p>솔로 모드로 {stationName}역의 스토리를 바로 시작합니다.</p>
            </ModalActionCard>

            <ModalActionCard
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onMultiplayerClick}
            >
              <h3>
                <Users size={20} />
                함께 플레이
              </h3>
              <p>대기 중인 방을 찾아 입장하거나, 새 방을 만들어 모험을 시작하세요.</p>
            </ModalActionCard>
          </ActionGrid>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};
