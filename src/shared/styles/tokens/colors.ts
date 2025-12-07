export const colors = {
  primary: {
    500: '#667eea',
    600: '#5a67d8',
  },
  
  secondary: {
    500: '#764ba2', 
    600: '#6b21a8',
  },

  metro: {
    line1: '#0052A4',
    line2: '#00A84D', 
    line3: '#EF7C1C',
    line4: '#00A5DE',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  background: {
    light: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
    },
    dark: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a', 
      tertiary: '#2a2a2a',
    }
  },

  text: {
    light: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
    },
    dark: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      tertiary: '#808080',
      inverse: '#0a0a0a',
    }
  },

  border: {
    light: {
      light: '#f3f4f6',
      medium: '#e5e7eb',
      dark: '#d1d5db',
    },
    dark: {
      light: '#404040',
      medium: '#2a2a2a',
      dark: '#6366f1',
    }
  },

  game: {
    health: '#ef4444',
    sanity: '#8b5cf6',
    choice: '#3b82f6',
    success: '#22c55e',
    danger: '#dc2626',
    story: '#64748b',
  }
} as const;