import React from 'react';
import { StationActionModal } from './StationActionModal';
import { RoomListModal } from './RoomListModal';
import { CreateRoomModal } from './CreateRoomModal';
import { useMultiplayerInteractionStore } from '@/shared/store/multiplayerInteractionStore';

export const MultiplayerModals: React.FC = () => {
  const {
    selection,
    currentView,
    close,
    openRoomList,
    openCreateRoom,
  } = useMultiplayerInteractionStore();

  const isActionOpen = currentView === 'action' && !!selection;
  const isRoomListOpen = currentView === 'roomList' && !!selection;
  const isCreateOpen = currentView === 'createRoom' && !!selection;

  return (
    <>
      <StationActionModal
        isOpen={isActionOpen}
        onClose={close}
        stationName={selection?.stationName ?? ''}
        lineNumber={selection?.lineNumber ?? 0}
        onMultiplayerClick={openRoomList}
      />

      <RoomListModal
        isOpen={isRoomListOpen}
        onClose={close}
        stationName={selection?.stationName ?? ''}
        stationId={selection?.stationId ?? 0}
        lineNumber={selection?.lineNumber ?? 0}
        onCreateNewRoom={openCreateRoom}
      />

      <CreateRoomModal
        isOpen={isCreateOpen}
        onClose={close}
        stationName={selection?.stationName ?? ''}
        stationId={selection?.stationId ?? 0}
        lineNumber={selection?.lineNumber ?? 0}
      />
    </>
  );
};
