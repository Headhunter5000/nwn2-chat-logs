import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import themeColors from '../../config/themeColors';
import {
  encodeToBase64,
  generateGrainImg,
  mixImgWithColor,
} from '../../utils/backgroundGrain';
import { chooseByTheme } from '../../utils/themeUtils';

type BackgroundTextureProps = {
  bgLight: string;
  bgDark: string;
};

const BackgroundTexture = createGlobalStyle<BackgroundTextureProps>`
  #app-root {
    background-image: url("${props => chooseByTheme(props.bgLight, props.bgDark)}");
    background-attachment: local;
    background-repeat: repeat;
  }
`;

const BackgroundTextureWrapper = () => {
  const [grainImages, setGrainImages] = useState<BackgroundTextureProps>({
    bgLight: '',
    bgDark: '',
  });

  useEffect(() => {
    // requestIdleCallback moves the workload to a time where the browser is idling
    // Fallback to setTimeout  for Browsers not supporting requestIdleCallback.
    const schedule =
      window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1));

    const handle = schedule(() => {
      const grain = generateGrainImg({ size: 240, scale: 1, contrast: 5 });

      const bgLight = encodeToBase64(
        mixImgWithColor({
          grain,
          bgColor: themeColors['sand-100'],
          grainColor: 'black',
          intensity: 0.18,
        }),
      );

      const bgDark = encodeToBase64(
        mixImgWithColor({
          grain,
          bgColor: themeColors['slate-900'],
          grainColor: 'white',
          intensity: 0.07,
        }),
      );

      setGrainImages({ bgLight, bgDark });
    });

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(handle as number);
      } else {
        clearTimeout(handle as number);
      }
    };
  }, []);

  return (
    <BackgroundTexture
      bgLight={grainImages.bgLight}
      bgDark={grainImages.bgDark}
    />
  );
};

export default BackgroundTextureWrapper;