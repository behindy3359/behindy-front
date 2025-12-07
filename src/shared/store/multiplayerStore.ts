import { create } from 'zustand';
import type {
  MultiplayerRoom,
  ChatMessage,
  RoomVote,
  ConnectionState,
  RoomParticipant
} from '../types/multiplayer';

const MAX_MESSAGES = 100;
const RATE_LIMIT_MS = 2000;

interface MultiplayerState {
  currentRoom: MultiplayerRoom | null;
  messages: ChatMessage[];
  activeVote: RoomVote | null;
  connectionState: ConnectionState;
  lastMessageSentAt: number;

  setCurrentRoom: (room: MultiplayerRoom | null) => void;
  updateParticipants: (participants: RoomParticipant[]) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;

  setActiveVote: (vote: RoomVote | null) => void;

  setConnectionState: (state: ConnectionState) => void;
  updateLastMessageSentAt: () => void;
  canSendMessage: () => boolean;

  reset: () => void;
}

const initialState = {
  currentRoom: null,
  messages: [],
  activeVote: null,
  connectionState: {
    connected: false,
    connecting: false,
    error: undefined
  },
  lastMessageSentAt: 0
};

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  ...initialState,

  setCurrentRoom: (room) => set({ currentRoom: room }),

  updateParticipants: (participants) => set((state) => {
    if (!state.currentRoom) return state;

    return {
      currentRoom: {
        ...state.currentRoom,
        participants
      }
    };
  }),

  addMessage: (message) => set((state) => {
    if (state.messages.some((m) => m.messageId === message.messageId)) {
      return state;
    }

    const newMessages = [...state.messages, message].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      if (timeA === timeB) {
        return (a.messageId || 0) - (b.messageId || 0);
      }
      return timeA - timeB;
    });

    if (newMessages.length > MAX_MESSAGES) {
      return { messages: newMessages.slice(-MAX_MESSAGES) };
    }

    return { messages: newMessages };
  }),

  setMessages: (messages) => set({
    messages: [...messages].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      if (timeA === timeB) {
        return (a.messageId || 0) - (b.messageId || 0);
      }
      return timeA - timeB;
    })
  }),

  clearMessages: () => set({ messages: [] }),

  setActiveVote: (vote) => set({ activeVote: vote }),

  setConnectionState: (connectionState) => set({ connectionState }),

  updateLastMessageSentAt: () => set({ lastMessageSentAt: Date.now() }),

  canSendMessage: () => {
    const { lastMessageSentAt, connectionState } = get();
    const timeSinceLastMessage = Date.now() - lastMessageSentAt;

    return connectionState.connected && timeSinceLastMessage >= RATE_LIMIT_MS;
  },

  reset: () => set(initialState)
}));
