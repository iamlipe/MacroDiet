const effects = {
  spacing: {
    nn: 4,
    vs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    vl: 32,
    hg: 40,
  },

  opacity: {
    sm: 'rgba(0,0,0,0.8)',
    it: 'rgba(0,0,0,0.64)',
    md: 'rgba(0,0,0,0.32)',
    lg: 'rgba(0,0,0,0.16)',
  },

  lines: {
    df: 1,
    tl: 2,
  },

  border: {
    width: {
      df: 1,
      tl: 2,
    },

    radius: {
      sm: 4,
      md: 16,
      lg: 32,
      pill: 128,
      circular: 224,
    },
  },
};

export type Effects = typeof effects;

export default effects;
