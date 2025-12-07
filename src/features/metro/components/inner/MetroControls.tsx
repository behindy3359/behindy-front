import React from 'react';
import { 
  Controls,
  CheckboxItem, 
  TrainCountBadge,
  NoTrainBadge,
} from '../styles';
import type { MetroControlsProps } from '../../types/metroMapTypes';
import {CommonGroup} from '@/shared/styles/components';

export const MetroControls: React.FC<MetroControlsProps> = ({
  lineStats,
  visibleLines,
  isLoading,
  error,
  onLineToggle,
}) => {
  return (
    <Controls>
      <CommonGroup>
        {lineStats.map(({ line, color, trainCount }) => (
          <CheckboxItem key={line} $color={color}>
            <input
              type="checkbox"
              checked={visibleLines.includes(line)}
              onChange={() => onLineToggle(line)}
            />
            <div className="color-dot" />
            <span className="line-name">{line}호선</span>
            {trainCount > 0 ? (
              <TrainCountBadge>
                {trainCount}<span className="train-text">대</span>
              </TrainCountBadge>
            ) : (
              <NoTrainBadge>
                <span className="no-train-text">운행정보 없음</span>
              </NoTrainBadge>
            )}
          </CheckboxItem>
        ))}
      </CommonGroup>
    </Controls>
  );
};