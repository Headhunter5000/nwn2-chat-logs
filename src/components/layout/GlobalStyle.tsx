 
import { createGlobalStyle } from 'styled-components';
import themeColors from '../../config/themeColors';
import { generateGrainImg, mixGrainImgWithColor } from '../../utils/backgroundGrain';
import { chooseByTheme } from '../../utils/themeUtils';

const DEFAULT_BACKGROUND_GRAIN =
  generateGrainImg({ size: 240, scale: 1, contrast: 4 });

const BG_LIGHT = mixGrainImgWithColor({
  img: DEFAULT_BACKGROUND_GRAIN,
  bgColor: themeColors['sand-100'],
  grainColor: 'black',
  intensity: 0.17,
});

const BG_DARK = mixGrainImgWithColor({
  img: DEFAULT_BACKGROUND_GRAIN,
  bgColor: themeColors['sand-900'],
  grainColor: 'white',
  intensity: 0.06,
});

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