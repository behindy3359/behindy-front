import React from 'react';
import { User, Heart, Brain, Users, Crown } from 'lucide-react';
import type { Character } from '@/features/game/types/gameTypes';
import type { RoomParticipant } from '@/shared/types/multiplayer';
import {
  CharacterCard,
  CharacterCardHeader,
  CharacterCardTitle,
  CharacterProfile,
  ProfileIcon,
  ProfileInfo,
  CharacterName,
  StatusBadge,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  StatBar,
  StatBarFill,
  DeathNotice,
  ParticipantsSection,
  ParticipantsSectionHeader,
  ParticipantsList,
  ParticipantItem,
  ParticipantNameWithIcon,
  ParticipantStats,
} from './characterPanelStyles';

export type CharacterPanelMode = 'single' | 'multi';

export interface CharacterInfoPanelProps {
  mode: CharacterPanelMode;
  character: Character;
  participants?: RoomParticipant[];
  ownerId?: number;
  currentUserId?: number;
  onKickVote?: (targetUserId: number) => void;
}

export const CharacterInfoPanel: React.FC<CharacterInfoPanelProps> = ({
  mode,
  character,
  participants,
  ownerId,
  currentUserId,
  onKickVote,
}) => {
  const activeParticipants = participants?.filter((p) => p.isActive) || [];

  return (
    <CharacterCard
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CharacterCardHeader>
        <CharacterCardTitle>
          {mode === 'single' ? '캐릭터 정보' : '내 캐릭터'}
        </CharacterCardTitle>
      </CharacterCardHeader>

      <CharacterProfile>
        <ProfileIcon>
          <User size={48} />
        </ProfileIcon>
        <ProfileInfo>
          <CharacterName>{character.charName}</CharacterName>
          {mode === 'single' && character.statusMessage && (
            <StatusBadge $status={character.statusMessage}>
              {character.statusMessage}
            </StatusBadge>
          )}
        </ProfileInfo>
      </CharacterProfile>

      <StatsGrid>
        <StatCard>
          <StatIcon $type="health">
            <Heart size={20} />
          </StatIcon>
          <StatInfo>
            <StatLabel>체력</StatLabel>
            <StatValue>{character.charHealth}/100</StatValue>
            <StatBar>
              <StatBarFill
                $percentage={character.charHealth}
                $color="var(--game-health)"
              />
            </StatBar>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIcon $type="sanity">
            <Brain size={20} />
          </StatIcon>
          <StatInfo>
            <StatLabel>정신력</StatLabel>
            <StatValue>{character.charSanity}/100</StatValue>
            <StatBar>
              <StatBarFill
                $percentage={character.charSanity}
                $color="var(--game-sanity)"
              />
            </StatBar>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      {mode === 'single' && !character.alive && (
        <DeathNotice>이 캐릭터는 사망했습니다</DeathNotice>
      )}

      {mode === 'multi' && participants && participants.length > 0 && (
        <ParticipantsSection>
          <ParticipantsSectionHeader>
            <Users size={18} />
            <span>
              참여자 ({activeParticipants.length}/{participants.length})
            </span>
          </ParticipantsSectionHeader>

          <ParticipantsList>
            {activeParticipants.map((participant) => (
              <ParticipantItem
                key={participant.participantId}
                $isCurrent={participant.userId === currentUserId}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <ParticipantNameWithIcon>
                    {participant.userId === ownerId && <Crown size={14} />}
                    <span>{participant.characterName}</span>
                    {participant.userId === currentUserId && (
                      <span style={{ marginLeft: 4, fontSize: '0.75rem', opacity: 0.7 }}>
                        (나)
                      </span>
                    )}
                  </ParticipantNameWithIcon>

                  <ParticipantStats>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.7rem',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <span>HP</span>
                        <span>{participant.hp}</span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '0.375rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                        }}
                      >
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
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.7rem',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <span>정신</span>
                        <span>{participant.sanity}</span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '0.375rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                        }}
                      >
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
                </div>

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
                      flexShrink: 0,
                    }}
                    title="추방 투표"
                  >
                    🚫
                  </button>
                )}
              </ParticipantItem>
            ))}
          </ParticipantsList>
        </ParticipantsSection>
      )}
    </CharacterCard>
  );
};
