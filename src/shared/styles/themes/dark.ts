import { baseTheme } from './base';
import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

export const darkTheme = {
  ...baseTheme,
  
  colors: {
    ...baseTheme.colors,
    
    background: {
      primary: colors.background.dark.primary,
      secondary: colors.background.dark.secondary, 
      tertiary: colors.background.dark.tertiary,
    },
    
    text: {
      primary: colors.text.dark.primary,
      secondary: colors.text.dark.secondary,
      tertiary: colors.text.dark.tertiary,
      inverse: colors.text.dark.inverse,
    },
    
    border: {
      light: colors.border.dark.light,
      medium: colors.border.dark.medium,
      dark: colors.border.dark.dark,
    },
    
    primary: {
      500: '#8b5cf6',
      600: '#7c3aed',
    },
    
    secondary: {
      500: '#a78bfa',
      600: '#9333ea',
    },
  },
  
  shadows: {
    ...baseTheme.shadows,
    card: shadows.dark.card,
    button: shadows.dark.button,
    buttonHover: shadows.dark.buttonHover,
    focus: shadows.dark.focus,
    glow: shadows.dark.glow,
    dropdown: shadows.dark.dropdown,
  }
} as const;

export type DarkTheme = typeof darkTheme;