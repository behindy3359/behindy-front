import { colors } from '../tokens/colors';
import { spacing, componentSpacing } from '../tokens/spacing';
import { typography, textStyles } from '../tokens/typography';
import { shadows } from '../tokens/shadows';

export const baseTheme = {
  spacing,
  componentSpacing,
  
  typography: {
    ...typography,
    fontWeight: {
      normal: typography.fontWeight.normal,
      medium: typography.fontWeight.medium,
      semibold: typography.fontWeight.semibold,
      bold: typography.fontWeight.bold,
      extrabold: typography.fontWeight.extrabold,
    },
  },
  textStyles,
  
  shadows: {
    base: shadows.base,
    card: shadows.light.card,
    button: shadows.light.button,
    buttonHover: shadows.light.buttonHover,
    focus: shadows.light.focus,
    dropdown: shadows.light.dropdown,
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem', 
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  container: {
    sm: '640px',
    md: '768px',
    lg: '900px',
    xl: '1200px',
  },
  
  transition: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,

    metro: colors.metro,
    
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    
    game: colors.game,
    
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
  }
} as const;

export type BaseTheme = typeof baseTheme;