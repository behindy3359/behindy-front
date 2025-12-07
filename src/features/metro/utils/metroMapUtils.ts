import { 
  METRO_STATIONS, 
  getStationsByLine,
  getStationByApiId
} from '@/features/metro/data/stationsData';

import type { 
  MetroApiResponse, 
  ProcessedTrainData, 
  LineStats 
} from '../types/metroMapTypes';
import { METRO_CONFIG } from '@/shared/utils/common/constants';

export const processRealtimeData = (realtimeData: MetroApiResponse['data'] | null): ProcessedTrainData[] => {
  if (!realtimeData?.positions) {
    return [];
  }
  
  const processedData: ProcessedTrainData[] = [];
  let successCount = 0;
  let failCount = 0;
  
  realtimeData.positions.forEach((train, index) => {
    try {
      const station = getStationByApiId(train.stationId);
      
      if (!station) {
        failCount++;
        return;
      }
      
      const processedTrain: ProcessedTrainData = {
        frontendStationId: station.id,   
        stationName: station.id,      
        lineNumber: train.lineNumber,
        direction: train.direction,
        trainCount: 1,
        lastUpdated: new Date(train.lastUpdated),
        trainId: train.trainId,
      };
      
      processedData.push(processedTrain);
      successCount++;
      
    } catch (error) {
      failCount++;
    }
  });
  
  return processedData;
};

export const getVisibleStations = (visibleLines: number[]) => {
  if (visibleLines.length === 0) {
    return [];
  }
  
  const visibleStations = METRO_STATIONS.filter(station => {
    return station.lines.some(line => visibleLines.includes(line));
  });
  
  return visibleStations;
};

export const calculateLineStats = (
  visibleLines: number[], 
  processedRealtimeData: ProcessedTrainData[]
): LineStats[] => {
  
  return Object.entries(METRO_CONFIG.LINE_COLORS).map(([lineNum, color]) => {
    const line = parseInt(lineNum);
    const stations = getStationsByLine(line);
    
    const trainsOnLine = processedRealtimeData.filter(train => {
      const station = METRO_STATIONS.find(s => s.id === train.stationName);
      return station && station.lines.includes(line);
    });
    
    const trainCount = trainsOnLine.length;
    const isVisible = visibleLines.includes(line);
    
    return {
      line,
      color,
      totalStations: stations.length,
      trainCount,
      visible: isVisible
    };
  });
};

export const toggleLineInArray = (line: number, currentLines: number[]): number[] => {
  const newLines = currentLines.includes(line)
    ? currentLines.filter(l => l !== line)
    : [...currentLines, line];

  return newLines;
};