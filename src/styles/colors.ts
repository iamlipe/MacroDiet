const colors = {
  background: {
    dark: '#000000',
    light: '#ffffff',
    modal: '#00000099',
  },

  white: '#fff',
  black: '#000',

  gray: {
    900: '#333333',
    800: '#4C4C4C',
    700: '#666666',
    600: '#7F7F7F',
    500: '#999999',
    400: '#B3B3B3',
    300: '#CCCCCC',
    200: '#E5E5E5',
    100: '#F2F2F2',
    50: '#F9F9F9',
  },

  primary: {
    900: '#1a1774',
    800: '#333280',
    700: '#3e3c8b',
    600: '#5250cc',
    500: '#6563ff',
    400: '#6c6ae0',
    300: '#7371C5',
    200: '#b1b0ff',
    100: '#d6d5ff',
    50: '#f4f4ff',
  },

  status: {
    warning: '#FFB93F',
    error: '#C41826',
    success: '#009D35',
    info: '#417FFA',
  },
};

export type Colors = typeof colors;

export default colors;
