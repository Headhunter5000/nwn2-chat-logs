
import { createGlobalStyle } from 'styled-components';
import themeColors from '../../config/themeColors';
import {
  encodeToBase64,
  generateGrainImg,
  mixGrainImgWithColor,
} from '../../utils/backgroundGrain';
import { chooseByTheme } from '../../utils/themeUtils';

const DEFAULT_BACKGROUND_GRAIN =
  generateGrainImg({ size: 240, scale: 1, contrast: 4 });

const BG_LIGHT = encodeToBase64(mixGrainImgWithColor({
  grain: DEFAULT_BACKGROUND_GRAIN,
  bgColor: themeColors['sand-100'],
  grainColor: 'black',
  intensity: 0.17,
}));

const BG_DARK = encodeToBase64(mixGrainImgWithColor({
  grain: DEFAULT_BACKGROUND_GRAIN,
  bgColor: themeColors['slate-900'],
  grainColor: 'white',
  intensity: 0.07,
}));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #app-root {
    background-image: url("${chooseByTheme(BG_LIGHT, BG_DARK)}");
    background-attachment: local;
    background-repeat: repeat;
  }
`;

export default GlobalStyle;