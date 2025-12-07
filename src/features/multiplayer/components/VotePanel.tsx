import React, { useState, useEffect } from 'react';
import { useMultiplayerStore } from '@/shared/store/multiplayerStore';
import { VoteStatus } from '@/shared/types/multiplayer';
import {
  VoteContainer,
  VoteHeader,
  VoteContent,
  VoteActions,
  VoteButton,
  VoteTimer,
} from '@/shared/styles/components';

interface VotePanelProps {
  currentUserId?: number;
  onSubmitBallot: (voteId: number, vote: boolean) => void;
}

export const VotePanel: React.FC<VotePanelProps> = ({
  currentUserId,
  onSubmitBallot,
}) => {
  const { activeVote } = useMultiplayerStore();
  const [hasVoted, setHasVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!activeVote) {
      setHasVoted(false);
      return;
    }

    const updateTimeRemaining = () => {
      const expires = new Date(activeVote.expiresAt).getTime();
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expires - now) / 1000));
      setTimeRemaining(remaining);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [activeVote]);

  if (!activeVote) {
    return null;
  }

  const isPending = activeVote.status === VoteStatus.PENDING;
  const totalVotes = activeVote.yesCount + activeVote.noCount;
  const isKickVote = activeVote.voteType === 'KICK';
  const isTargetUser = isKickVote && activeVote.targetUserId === currentUserId;

  const handleVote = (vote: boolean) => {
    if (hasVoted || !isPending || isTargetUser) return;

    onSubmitBallot(activeVote.voteId, vote);
    setHasVoted(true);
  };

  const getVoteStatusColor = () => {
    if (activeVote.status === VoteStatus.PASSED) {
      return isKickVote ? 'var(--error)' : 'var(--success)';
    }
    if (activeVote.status === VoteStatus.FAILED) {
      return isKickVote ? 'var(--success)' : 'var(--error)';
    }
    if (activeVote.status === VoteStatus.EXPIRED) return 'var(--text-tertiary)';
    return 'var(--warning)';
  };

  const getVoteResultText = () => {
    if (activeVote.status === VoteStatus.PASSED) return '가결됨';
    if (activeVote.status === VoteStatus.FAILED) return '부결됨';
    if (activeVote.status === VoteStatus.EXPIRED) return '시간 만료';
    return '진행 중';
  };

  return (
    <VoteContainer>
      <VoteHeader>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
              {isKickVote ? '추방 투표' : '행동하기 투표'}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                color: 'white',
                background: getVoteStatusColor(),
              }}
            >
              {getVoteResultText()}
            </span>
          </div>
          {isKickVote && activeVote.targetUsername && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              대상: <span style={{ fontWeight: 600 }}>{activeVote.targetUsername}</span>
            </p>
          )}
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            시작: {activeVote.initiatedByUsername}
          </p>
        </div>

        {isPending && (
          <VoteTimer>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>
              {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>남은 시간</div>
          </VoteTimer>
        )}
      </VoteHeader>

      <VoteContent>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>찬성</span>
            <span style={{ color: 'var(--text-secondary)' }}>{activeVote.yesCount}표</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: 'var(--error)', fontWeight: 600 }}>반대</span>
            <span style={{ color: 'var(--text-secondary)' }}>{activeVote.noCount}표</span>
          </div>
          <div style={{ color: 'var(--text-tertiary)' }}>
            (총 {totalVotes}표)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem', height: '1rem', borderRadius: '9999px', overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
          {totalVotes > 0 && (
            <>
              <div
                style={{
                  background: 'var(--success)',
                  width: `${(activeVote.yesCount / totalVotes) * 100}%`,
                  transition: 'width 0.3s ease',
                }}
              />
              <div
                style={{
                  background: 'var(--error)',
                  width: `${(activeVote.noCount / totalVotes) * 100}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </>
          )}
        </div>
      </VoteContent>

      {isPending && (
        <VoteActions>
          {isTargetUser ? (
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-tertiary)', padding: '0.5rem' }}>
              투표 대상자는 투표할 수 없습니다
            </div>
          ) : hasVoted ? (
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--success)', fontWeight: 500, padding: '0.5rem' }}>
              ✓ 투표 완료
            </div>
          ) : (
            <>
              <VoteButton $approve onClick={() => handleVote(true)}>
                찬성
              </VoteButton>
              <VoteButton onClick={() => handleVote(false)}>
                반대
              </VoteButton>
            </>
          )}
        </VoteActions>
      )}
    </VoteContainer>
  );
};
