import { METRO_STATIONS } from '../data/stationsData';
import type { MetroApiResponse } from '../types/metroMapTypes';

const TRAINS_PER_LINE: Record<number, number> = {
  1: 8,
  2: 12,
  3: 6,
  4: 8,
};

const getStationsByLine = (lineNumber: number) => {
  return METRO_STATIONS.filter(station => station.lines.includes(lineNumber));
};

const generateTrainsForLine = (lineNumber: number): MetroApiResponse['data']['positions'] => {
  const stations = getStationsByLine(lineNumber);
  const trainCount = TRAINS_PER_LINE[lineNumber] || 6;
  const trains: MetroApiResponse['data']['positions'] = [];

  if (stations.length === 0) return trains;
  const stationsPerTrain = Math.floor(stations.length / trainCount);

  for (let i = 0; i < trainCount; i++) {
    const stationIndex = (i * stationsPerTrain) % stations.length;
    const station = stations[stationIndex];
    const direction = Math.random() > 0.5 ? 'up' : 'down';

    trains.push({
      trainId: `MOCK_${lineNumber}_${String(i + 1).padStart(3, '0')}`,
      lineNumber,
      stationId: station.realApiIds[0] || station.id,
      stationName: station.id,
      direction,
      lastUpdated: new Date().toISOString(),
      dataSource: 'MOCK_FALLBACK',
      isRealtime: false,
      fresh: true,
    });
  }

  return trains;
};

export const generateMockMetroData = (
  enabledLines: number[] = [1, 2, 3, 4]
): MetroApiResponse['data'] => {
  const allTrains: MetroApiResponse['data']['positions'] = [];
  const lineStatistics: Record<string, number> = {};

  enabledLines.forEach(lineNumber => {
    const trains = generateTrainsForLine(lineNumber);
    allTrains.push(...trains);
    lineStatistics[lineNumber.toString()] = trains.length;
  });

  return {
    positions: allTrains,
    totalTrains: allTrains.length,
    lineStatistics,
    lastUpdated: new Date().toISOString(),
    dataSource: 'MOCK_FALLBACK',
    systemStatus: 'MOCK_MODE',
    isRealtime: false,
  };
};

export const shouldUseMockData = (
  data: MetroApiResponse['data'] | null,
  error: string | null
): boolean => {
  if (error) return true;

  if (!data) return true;

  if (data.totalTrains === 0) return true;

  return false;
};
