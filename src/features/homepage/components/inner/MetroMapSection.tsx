import React from 'react';
import { Train } from 'lucide-react';
import { MetroMap } from '@/features/metro/components/MetroMap';
import { useMetroRealtime } from '@/features/metro/hooks/useMetroRealtime';
import { SectionContainer } from '@/shared/styles/components';
import { MetroHeader, MetroMapContainer } from '../styles';
import { colors } from '@/shared/styles/tokens/colors';

export const MetroMapSection: React.FC = () => {
  const { data: realtimeData, isLoading, error } = useMetroRealtime(30000);

  const getStatusInfo = () => {
    if (isLoading) {
      return {
        text: 'LOADING',
        className: 'loading-indicator',
        color: colors.text.light.secondary
      };
    }

    if (error) {
      return {
        text: 'ERROR',
        className: 'error-indicator',
        color: colors.error
      };
    }

    if (!realtimeData) {
      return {
        text: 'NO DATA',
        className: 'no-data-indicator',
        color: colors.text.light.secondary
      };
    }

    const { dataSource, isRealtime, totalTrains } = realtimeData;

    if (dataSource.includes("MOCK")) {
      return {
        text: 'TEST',
        className: 'test-indicator',
        color: colors.warning
      };
    }

    if (dataSource === "API" && isRealtime && totalTrains > 0) {
      return {
        text: 'LIVE',
        className: 'live-indicator',
        color: colors.error
      };
    }

    return {
      text: 'LIMITED',
      className: 'limited-indicator',
      color: colors.warning
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <SectionContainer>
      <MetroHeader>
        <h2>
          <Train size={24} />
          실시간 지하철 노선도
        </h2>
        <div className={statusInfo.className} style={{ color: statusInfo.color }}>
          {statusInfo.text}
        </div>
      </MetroHeader>
      
      <MetroMapContainer>
        <MetroMap
          realtimeData={realtimeData}
          isLoading={isLoading}
          error={error}
        />
      </MetroMapContainer>
    </SectionContainer>
  );
};