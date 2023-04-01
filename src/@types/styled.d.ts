import 'styled-components';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import effects from '@styles/effects';

declare module 'styled-components' {
  type COLOR_TYPE = typeof colors;
  type FONTS_TYPE = typeof fonts;
  type EFFECTS_TYPE = typeof effects;

  export interface DefaultTheme {
    colors: COLOR_TYPE;
    fonts: FONTS_TYPE;
    effects: EFFECTS_TYPE;
  }
}
