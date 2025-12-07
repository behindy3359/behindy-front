import { baseTheme } from './base';
import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';
import type { Theme } from '../styled';

export const lightTheme: Theme = {
  ...baseTheme,
  
  colors: {
    ...baseTheme.colors,
    
    background: {
      primary: colors.background.light.primary,
      secondary: colors.background.light.secondary,
      tertiary: colors.background.light.tertiary,
    },
    
    text: {
      primary: colors.text.light.primary,
      secondary: colors.text.light.secondary,
      tertiary: colors.text.light.tertiary,
      inverse: colors.text.light.inverse,
    },
    
    border: {
      light: colors.border.light.light,
      medium: colors.border.light.medium,
      dark: colors.border.light.dark,
    },
  },
  
  shadows: {
    base: baseTheme.shadows.base,
    card: shadows.light.card,
    button: shadows.light.button,
    buttonHover: shadows.light.buttonHover,
    focus: shadows.light.focus,
    dropdown: shadows.light.dropdown,
  }
} as const;

export type LightTheme = typeof lightTheme;