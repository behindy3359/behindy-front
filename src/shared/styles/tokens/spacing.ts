export const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const;

export const componentSpacing = {
  card: {
    padding: spacing[6],
    gap: spacing[4],
  },
  
  button: {
    sm: {
      padding: `${spacing[2]} ${spacing[4]}`,
      gap: spacing[2],
    },
    md: {
      padding: `${spacing[2]} ${spacing[6]}`,
      gap: spacing[2],
    },
    lg: {
      padding: `${spacing[4]} ${spacing[8]}`,
      gap: spacing[3],
    },
  },
  
  input: {
    sm: {
      padding: `${spacing[2]} ${spacing[4]}`,
      height: '2.25rem',
    },
    md: {
      padding: `${spacing[2]} ${spacing[4]}`,
      height: '2.5rem',
    },
    lg: {
      padding: `${spacing[4]} ${spacing[4]}`,
      height: '3rem',
    },
  },
  
  form: {
    fieldGap: spacing[6],
    sectionGap: spacing[8],
  },
  
  layout: {
    pageMargin: spacing[6],
    sectionGap: spacing[8],
    cardGap: spacing[6],
  }
} as const;