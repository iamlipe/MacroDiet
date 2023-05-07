const colors = {
  background: {
    dark: '#000',
    light: '#ffffff',
    modal: '#ffffff0d',
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
    900: '#031B4F',
    800: '#052775',
    700: '#073C9C',
    600: '#0A4ED8',
    500: '#246EFF',
    400: '#5D8EFF',
    300: '#97B6FF',
    200: '#C1D1FF',
    100: '#E0EAF8',
    50: '#F2F5FF',
  },

  status: {
    warning: '#F3DA4A',
    error: '#C41826',
    success: '#009D35',
    info: '#417FFA',
  },
};

export type Colors = typeof colors;

export default colors;
