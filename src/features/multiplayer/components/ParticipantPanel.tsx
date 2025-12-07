import React from 'react';
import type { RoomParticipant } from '@/shared/types/multiplayer';
import {
  ParticipantPanel as StyledParticipantPanel,
  ParticipantPanelHeader,
  ParticipantList,
  ParticipantCard,
  ParticipantName,
  ParticipantStats,
} from '@/shared/styles/components';

interface ParticipantPanelProps {
  participants: RoomParticipant[];
  ownerId: number;
  currentUserId?: number;
  onKickVote?: (targetUserId: number) => void;
  showHeader?: boolean;
  className?: string;
}

export const ParticipantPanel: React.FC<ParticipantPanelProps> = ({
  participants,
  ownerId,
  currentUserId,
  onKickVote,
  showHeader = true,
  className,
}) => {
  const activeParticipants = participants.filter((p) => p.isActive);

  return (
    <StyledParticipantPanel className={className}>
      {showHeader && (
        <ParticipantPanelHeader>
          <span>참여자</span>
          <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            ({activeParticipants.length}/3)
          </span>
        </ParticipantPanelHeader>
      )}

      <ParticipantList>
        {activeParticipants.map((participant) => (
          <ParticipantCard
            key={participant.participantId}
            style={{
              borderColor: participant.userId === currentUserId ? 'var(--primary-500)' : 'var(--game-border)',
              backgroundColor: participant.userId === currentUserId ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', gap: '0.25rem' }}>
              <ParticipantName style={{ color: 'var(--game-text-header)', flex: 1, minWidth: 0 }}>
                {participant.userId === ownerId && '👑'}
                {participant.userId === currentUserId && '✨'}
                {participant.characterName}
              </ParticipantName>
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {participant.userId !== currentUserId && onKickVote && (
                  <button
                    onClick={() => onKickVote(participant.userId)}
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.125rem 0.375rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--error)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    title="추방 투표"
                  >
                    🚫
                  </button>
                )}
              </div>
            </div>

            <ParticipantStats>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: 'var(--game-text-choice)' }}>
                  <span>HP</span>
                  <span>{participant.hp}</span>
                </div>
                <div style={{ width: '100%', height: '0.375rem', background: 'var(--bg-tertiary)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.max(0, participant.hp)}%`,
                      background: 'var(--game-health)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: 'var(--game-text-choice)' }}>
                  <span>정신</span>
                  <span>{participant.sanity}</span>
                </div>
                <div style={{ width: '100%', height: '0.375rem', background: 'var(--bg-tertiary)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.max(0, participant.sanity)}%`,
                      background: 'var(--game-sanity)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            </ParticipantStats>
          </ParticipantCard>
        ))}
      </ParticipantList>

      {activeParticipants.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--game-text-muted)', fontSize: '0.875rem', padding: '2rem 0' }}>
          참여자가 없습니다
        </div>
      )}
    </StyledParticipantPanel>
  );
};
