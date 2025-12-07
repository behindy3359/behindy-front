export interface Character {
  charId: number;
  charName: string;
  charHealth: number;
  charSanity: number;
  alive: boolean;
  statusMessage: string;
  hasGameProgress?: boolean;
  createdAt?: string;
}

export interface CharacterGameStatus extends Character {
  hasActiveGame: boolean;
  currentStoryId?: number;
  currentStoryTitle?: string;
  currentPageNumber?: number;
  gameStartTime?: string;
  totalClears: number;
  totalPlays: number;
  clearRate: number;
  canEnterNewGame: boolean;
  cannotEnterReason?: string;
}

export interface Story {
  storyId: number;
  storyTitle: string;
  estimatedLength?: number;
  difficulty?: string;
  theme?: string;
  description?: string;
  stationName: string;
  stationLine: number;
  canPlay?: boolean;
  playStatus?: string;
}

export interface GameOption {
  optionId: number;
  content: string;
  effect?: 'health' | 'sanity' | 'both' | 'none';
  amount?: number;
  effectPreview?: string | null;
}

export interface GamePage {
  pageId: number;
  pageNumber: number;
  content: string;
  options: GameOption[];
  isLastPage: boolean;
  totalPages?: number;
}

export type GameAction = 'START_NEW' | 'RESUME_EXISTING' | 'NO_STORIES';

export interface GameEnterResponse {
  success: boolean;
  action: GameAction;
  message: string;
  selectedStoryId?: number;
  selectedStoryTitle?: string;
  resumeStoryId?: number;
  resumeStoryTitle?: string;
  firstPage?: GamePage;
  currentPage?: GamePage;
  character: Character;
  stationName: string;
  stationLine: number;
}

export interface ChoiceResponse {
  success: boolean;
  result: string;
  updatedCharacter: Character | null;
  nextPage: GamePage | null;
  isGameOver: boolean;
  gameOverReason?: string;
  message: string;
}

export interface GameStatus {
  hasActiveGame: boolean;
  storyId?: number;
  storyTitle?: string;
  currentPage?: GamePage;
  character?: Character;
  gameStartTime?: string;
  message: string;
}

export interface GameState {
  isPlaying: boolean;
  isLoading: boolean;
  
  currentStory: Story | null;
  currentPage: GamePage | null;
  character: Character | null;
  
  gameStartTime: string | null;
  lastChoice: GameOption | null;
  
  isTyping: boolean;
  displayedText: string;
  
  error: string | null;
}

export interface GameData {
  storyId: number;
  storyTitle: string;
  currentPage: GamePage;
  stationName: string;
  stationLine: number;
}

export interface GameCompletionData {
  completionType: 'success' | 'death';
  finalCharacter: Character;
  gameStartTime: string;
  storyData: GameData;
}

export type GameFlowState =
  | 'LOADING'
  | 'CHARACTER_CREATE'
  | 'GAME_PLAYING'
  | 'GAME_ENDING'
  | 'GAME_COMPLETED'
  | 'NO_STORIES'
  | 'ERROR';

export type VisitBadge = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface VisitedStation {
  stationName: string;
  stationLine: number;
  visitCount: number;
  totalPlayCount: number;
  clearRate: number;
  lastVisitedAt: string;
  visitBadge: VisitBadge;
}            