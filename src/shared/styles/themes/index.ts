import { darkTheme } from './dark';
import { lightTheme } from './light';
import { gameVariant } from './variants';

export { baseTheme, type BaseTheme } from './base';
export { lightTheme, type LightTheme } from './light';
export { darkTheme, type DarkTheme } from './dark';

export { 
  gameVariant, 
  highContrastVariant, 
  compactVariant,
  type GameVariant,
  type HighContrastVariant,
  type CompactVariant 
} from './variants';

export { colors } from '../tokens/colors';
export { spacing, componentSpacing } from '../tokens/spacing';
export { typography, textStyles } from '../tokens/typography';
export { shadows, shadowUtils } from '../tokens/shadows';

export const defaultTheme = lightTheme;

export const getTheme = (mode: 'light' | 'dark' | 'game') => {
  switch (mode) {
    case 'dark':
      return darkTheme;
    case 'game':
      return gameVariant;
    default:
      return lightTheme;
  }
};

export const generateCSSVariables = (selectedTheme: typeof lightTheme) => {
  return {
    '--bg-primary': selectedTheme.colors.background.primary,
    '--bg-secondary': selectedTheme.colors.background.secondary,
    '--bg-tertiary': selectedTheme.colors.background.tertiary,
    
    '--text-primary': selectedTheme.colors.text.primary,
    '--text-secondary': selectedTheme.colors.text.secondary,
    '--text-tertiary': selectedTheme.colors.text.tertiary,
    '--text-inverse': selectedTheme.colors.text.inverse,
    
    '--border-light': selectedTheme.colors.border.light,
    '--border-medium': selectedTheme.colors.border.medium,
    '--border-dark': selectedTheme.colors.border.dark,
    
    '--primary-500': selectedTheme.colors.primary[500],
    '--primary-600': selectedTheme.colors.primary[600],
    '--secondary-500': selectedTheme.colors.secondary[500],
    '--secondary-600': selectedTheme.colors.secondary[600],
    
    '--success': selectedTheme.colors.success,
    '--warning': selectedTheme.colors.warning,
    '--error': selectedTheme.colors.error,
    
    '--shadow-card': selectedTheme.shadows.card,
    '--shadow-button': selectedTheme.shadows.button,
    '--shadow-lg': selectedTheme.shadows.dropdown,
  };
};