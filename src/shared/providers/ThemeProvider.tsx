"use client";

import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme } from '@/shared/styles/themes/light';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.medium};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    &:hover {
      background: ${({ theme }) => theme.colors.border.dark};
    }
  }

  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary[600]};
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  * {
    &:not([data-no-transform]) {
      transform: translateZ(0);
      backface-visibility: hidden;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1); 
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.1); 
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  ${({ theme }) => theme.breakpoints.sm && `
    @media (max-width: ${parseInt(theme.breakpoints.sm) - 1}px) {
      html {
        font-size: 14px;
      }
    }
  `}
`;

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;