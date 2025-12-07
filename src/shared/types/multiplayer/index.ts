export enum RoomStatus {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export enum MessageType {
  USER = 'USER',
  LLM = 'LLM',
  SYSTEM = 'SYSTEM',
  PHASE = 'PHASE',
  VOTE = 'VOTE'
}

export enum VoteType {
  KICK = 'KICK',
  ACTION = 'ACTION'
}

export enum VoteStatus {
  PENDING = 'PENDING',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED'
}

export interface Station {
  stationId: number;
  stationName: string;
  lineNumber: number;
}

export interface User {
  userId: number;
  username: string;
  email: string;
}

export interface Character {
  charId: number;
  charName: string;
  charHealth: number;
  charSanity: number;
}

export interface RoomParticipant {
  participantId: number;
  userId: number;
  characterId: number;
  characterName: string;
  hp: number;
  sanity: number;
  isActive: boolean;
  joinedAt: string;
}

export interface MultiplayerRoom {
  roomId: number;
  stationId: number;
  stationName: string;
  roomName: string;
  currentPlayers: number;
  maxPlayers: number;
  currentPhase: number;
  status: RoomStatus;
  ownerId: number;
  ownerCharacterName: string;
  participants: RoomParticipant[];
  createdAt: string;
}

export interface ChatMessage {
  messageId: number;
  roomId?: number;
  userId?: number;
  username?: string;
  characterName?: string;
  messageType: MessageType;
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface RoomVote {
  voteId: number;
  roomId: number;
  voteType: VoteType | string;
  targetUserId?: number;
  targetUsername?: string;
  initiatedByUserId: number;
  initiatedByUsername: string;
  status: VoteStatus;
  createdAt: string;
  expiresAt: string;
  yesCount: number;
  noCount: number;
  requiredVotes?: number;
}

export interface VoteBallot {
  ballotId: number;
  voteId: number;
  userId: number;
  vote: boolean;
  createdAt: string;
}

export interface CreateRoomRequest {
  stationId?: number;
  stationName?: string;
  lineNumber?: number;
  characterId: number;
  roomName: string;
}

export interface JoinRoomRequest {
  characterId: number;
}

export interface SendChatRequest {
  content: string;
}

export interface VoteKickRequest {
  targetUserId: number;
}

export interface SubmitVoteBallotRequest {
  vote: boolean;
}

export interface RoomDetailResponse {
  room: MultiplayerRoom;
  messages: ChatMessage[];
  activeVote?: RoomVote | null;
}

export interface WebSocketMessage<T = any> {
  type: MessageType;
  payload: T;
}

export interface ConnectionState {
  connected: boolean;
  connecting: boolean;
  error?: string;
}

export interface StoryContent {
  currentSituation: string;
  specialEvent: string;
  hint: string;
}

export interface CharacterEffect {
  characterName: string;
  hpChange: number;
  sanityChange: number;
}

export interface StoryHistoryItem {
  phase: number;
  summary: string;
}

export interface LlmStoryResponse {
  story: StoryContent;
  effects: CharacterEffect[];
  phase: number;
  isEnding: boolean;
  storyOutline?: string;
  phaseSummary?: string;
  endingSummary?: string;
}
