import { api } from '@/config/axiosConfig';
import { apiErrorHandler } from '@/shared/utils/common/api';
import type {
  MultiplayerRoom,
  RoomDetailResponse,
  CreateRoomRequest,
  JoinRoomRequest,
} from '@/shared/types/multiplayer';

const BASE_URL = '/multiplayer/rooms';

interface RoomQueryParams {
  stationId?: number;
  stationName?: string;
  lineNumber?: number;
}

export const roomApi = {
  getRoomList: async (params: RoomQueryParams = {}): Promise<MultiplayerRoom[]> => {
    try {
      const query = new URLSearchParams();
      if (typeof params.stationId === 'number' && params.stationId > 0) {
        query.set('stationId', params.stationId.toString());
      }
      if (params.stationName) {
        query.set('stationName', params.stationName);
      }
      if (typeof params.lineNumber === 'number' && params.lineNumber > 0) {
        query.set('lineNumber', params.lineNumber.toString());
      }
      const queryString = query.toString();
      const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;
      const data = await api.get<MultiplayerRoom[] | { rooms: MultiplayerRoom[] }>(url);
      return Array.isArray(data) ? data : data?.rooms ?? [];
    } catch (error) {
      const parsedError = apiErrorHandler.parseError(error);
      throw new Error(parsedError.message);
    }
  },

  getRoomDetail: async (roomId: number): Promise<RoomDetailResponse> => {
    try {
      const data = await api.get<RoomDetailResponse | MultiplayerRoom>(`${BASE_URL}/${roomId}`);
      if ('room' in data) {
        return {
          room: data.room,
          messages: data.messages ?? [],
          activeVote: data.activeVote,
        };
      }
      return {
        room: data,
        messages: [],
      };
    } catch (error) {
      const parsedError = apiErrorHandler.parseError(error);
      throw new Error(parsedError.message);
    }
  },

  createRoom: async (request: CreateRoomRequest): Promise<MultiplayerRoom> => {
    try {
      return await api.post<MultiplayerRoom>(BASE_URL, request);
    } catch (error) {
      const parsedError = apiErrorHandler.parseError(error);
      throw new Error(parsedError.message);
    }
  },

  joinRoom: async (roomId: number, request: JoinRoomRequest): Promise<void> => {
    try {
      await api.post<void>(`${BASE_URL}/${roomId}/join`, request);
    } catch (error) {
      const parsedError = apiErrorHandler.parseError(error);
      throw new Error(parsedError.message);
    }
  },

  leaveRoom: async (roomId: number): Promise<void> => {
    try {
      await api.post<void>(`${BASE_URL}/${roomId}/leave`);
    } catch (error) {
      const parsedError = apiErrorHandler.parseError(error);
      throw new Error(parsedError.message);
    }
  },
};
