import styled from 'styled-components';

export const createBaseComponent = <T extends Record<string, any>>(
  BaseComponent: any,
  defaultProps: Partial<T>
) => {
  return styled(BaseComponent).attrs(defaultProps)``;
};

export const responsive = {
  mobile: '@media (max-width: 640px)',
  tablet: '@media (max-width: 768px)',
  desktop: '@media (min-width: 1024px)',
  largeDesktop: '@media (min-width: 1280px)',
} as const;

export const commonMixins = {
  centerContent: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  textEllipsis: `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  textEllipsisMultiline: (lines: number) => `
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,

  focusRing: (color = 'rgba(102, 126, 234, 0.1)') => `
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${color};
    }
  `,

  hideScrollbar: `
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  customScrollbar: (thumbColor = '#cbd5e1', trackColor = '#f1f5f9') => `
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${trackColor};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${thumbColor};
      border-radius: 3px;

      &:hover {
        background: ${thumbColor}dd;
      }
    }
  `,

  elevation: (level: 1 | 2 | 3 | 4 | 5) => {
    const shadows = {
      1: '0 1px 3px rgba(0, 0, 0, 0.1)',
      2: '0 4px 6px rgba(0, 0, 0, 0.1)',
      3: '0 10px 15px rgba(0, 0, 0, 0.1)',
      4: '0 20px 25px rgba(0, 0, 0, 0.1)',
      5: '0 25px 50px rgba(0, 0, 0, 0.25)',
    };
    return `box-shadow: ${shadows[level]};`;
  },

  absoluteCenter: `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  overlay: (opacity = 0.5, color = '#000000') => `
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${color};
      opacity: ${opacity};
      pointer-events: none;
    }
  `,
} as const;
