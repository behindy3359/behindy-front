import 'styled-components';

export interface Theme {
  spacing: {
    1: string;
    2: string;
    3: string;
    4: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
  };
  
  componentSpacing: {
    card: {
      padding: string;
      gap: string;
    };
    button: {
      sm: { padding: string; gap: string; };
      md: { padding: string; gap: string; };
      lg: { padding: string; gap: string; };
    };
    input: {
      sm: { padding: string; height: string; };
      md: { padding: string; height: string; };
      lg: { padding: string; height: string; };
    };
    form: {
      fieldGap: string;
      sectionGap: string;
    };
    layout: {
      pageMargin: string;
      sectionGap: string;
      cardGap: string;
    };
  };

  colors: {
    primary: {
      500: string;
      600: string;
    };
    secondary: {
      500: string;
      600: string;
    };

    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };

    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };

    border: {
      light: string;
      medium: string;
      dark: string;
    };

    metro: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
    };

    success: string;
    warning: string;
    error: string;

    game: {
      health: string;
      sanity: string;
      choice: string;
      success: string;
      danger: string;
      story: string;
    };
  };

  typography: {
    fontFamily: {
      sans: readonly string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
  };

  textStyles: {
    heading: {
      h1: { fontSize: string; fontWeight: number; lineHeight: number; };
      h2: { fontSize: string; fontWeight: number; lineHeight: number; };
      h3: { fontSize: string; fontWeight: number; lineHeight: number; };
      h4: { fontSize: string; fontWeight: number; lineHeight: number; };
    };
    body: {
      large: { fontSize: string; fontWeight: number; lineHeight: number; };
      normal: { fontSize: string; fontWeight: number; lineHeight: number; };
      small: { fontSize: string; fontWeight: number; lineHeight: number; };
    };
    ui: {
      button: { fontSize: string; fontWeight: number; };
      caption: { fontSize: string; fontWeight: number; };
      label: { fontSize: string; fontWeight: number; };
    };
  };

  shadows: {
    base: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    card: string;
    button: string;
    buttonHover: string;
    focus: string;
    dropdown: string;
    glow?: string;
  };

  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };

  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  container: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  transition: {
    fast: string;
    normal: string;
    slow: string;
  };

  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };

  gameMode?: boolean;
  backgrounds?: {
    gameBackground: string;
    gameCard: string;
    gameOverlay: string;
  };

  animations?: {
    pulse: string;
    glow: string;
    typewriter: string;
  };

  gameColors?: {
    healthBar: string;
    sanityBar: string;
    choiceHover: string;
    storyText: string;
    narratorText: string;
    playerChoice: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}