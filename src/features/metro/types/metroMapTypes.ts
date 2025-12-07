import { type Station } from '@/features/metro/data/stationsData';

export interface MetroApiResponse {
  success: boolean;
  message: string;
  data: {
    positions: Array<{
      trainId: string;
      lineNumber: number;
      stationId: string;
      stationName: string;
      direction: 'up' | 'down';
      lastUpdated: string;
      dataSource: string;
      isRealtime: boolean;
      fresh: boolean;
    }>;
    totalTrains: number;
    lineStatistics: Record<string, number>;
    lastUpdated: string;
    dataSource: string;
    systemStatus: string;
    isRealtime: boolean;
  };
}

export interface ProcessedTrainData {
  frontendStationId: string;
  stationName: string;
  lineNumber: number;
  direction: 'up' | 'down';
  trainCount: number;
  lastUpdated: Date;
  trainId: string;
}

export interface LineStats {
  line: number;
  color: string;
  totalStations: number;
  trainCount: number;
  visible: boolean;
}

export interface LineConnection {
  lineNumber: number;
  segments: Array<{
    path: string;
    color: string;
  }>;
}

export interface UseMetroRealtimeReturn {
  data: MetroApiResponse['data'] | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export interface UseMetroStateReturn {
  visibleLines: number[];
  showDistricts: boolean;
  setVisibleLines: React.Dispatch<React.SetStateAction<number[]>>;
  setShowDistricts: React.Dispatch<React.SetStateAction<boolean>>;
  handleLineToggle: (line: number) => void;
}

export interface MetroControlsProps {
  lineStats: LineStats[];
  visibleLines: number[];
  isLoading: boolean;
  error: string | null;
  processedRealtimeData: ProcessedTrainData[];
  onLineToggle: (line: number) => void;
}

export interface MetroSVGProps {
  showDistricts: boolean;
  visibleLines: number[];
  lineConnections: LineConnection[];
  visibleStations: Station[];
  processedRealtimeData: ProcessedTrainData[];
}

export interface MetroStationsProps {
  visibleStations: Station[];
  processedRealtimeData: ProcessedTrainData[];
  visibleLines: number[];
}

export interface MetroLinesProps {
  lineConnections: LineConnection[];
}

export interface MetroDistrictsProps {
  showDistricts: boolean;
}