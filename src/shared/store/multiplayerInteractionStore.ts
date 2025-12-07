import { create } from 'zustand';

type ModalView = 'none' | 'action' | 'roomList' | 'createRoom';

export interface StationSelection {
  stationName: string;
  lineNumber: number;
  stationId: number;
}

interface MultiplayerInteractionState {
  selection: StationSelection | null;
  currentView: ModalView;
  openAction: (selection: StationSelection) => void;
  openRoomList: () => void;
  openCreateRoom: () => void;
  close: () => void;
  setSelection: (selection: StationSelection) => void;
  clearSelection: () => void;
}

export const useMultiplayerInteractionStore = create<MultiplayerInteractionState>((set, get) => ({
  selection: null,
  currentView: 'none',
  openAction: (selection) => set({ selection, currentView: 'action' }),
  openRoomList: () => {
    if (!get().selection) {
      return;
    }
    set({ currentView: 'roomList' });
  },
  openCreateRoom: () => {
    if (!get().selection) {
      return;
    }
    set({ currentView: 'createRoom' });
  },
  close: () => set({ currentView: 'none' }),
  setSelection: (selection) => set({ selection }),
  clearSelection: () => set({ selection: null, currentView: 'none' }),
}));
