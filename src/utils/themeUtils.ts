import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import type { CSSObject } from 'styled-components';
import type { ThemeMode } from '../types/Settings';
import { generateGrainImg, mixGrainImgWithColor } from './backgroundGrain';

type CSS = TemplateStringsArray | CSSObject | string | number;

export const getIsDarkTheme = (props: { theme: ThemeType }) =>
  'dark' in props.theme && props.theme.dark ? true : false;

export const chooseByTheme = (lightCss: CSS, darkCss: CSS) =>
  (props: { theme: ThemeType }): CSS =>
    getIsDarkTheme(props) ? darkCss : lightCss;

export const getThemeProp = (name: string) => 
  (props: { theme: ThemeType }): string | number | undefined => {
    const nameSegments = name.split('.');

    const prop = nameSegments.reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, props.theme);

    if (typeof prop === 'string' || typeof prop === 'number') {
      return prop;
    }

    return undefined;
  };

export const getColor = (name: string) =>
  (props: { theme: ThemeType }): string =>
    normalizeColor(name, props.theme);

export const transparentWhite = (opacity: number) =>
  `hsla(0, 0%, 100%, ${Math.max(0, Math.min(100, opacity)) / 100})`;

export const transparentBlack = (opacity: number) =>
  `hsla(0, 0%, 0%, ${Math.max(0, Math.min(100, opacity)) / 100})`;

export const DEFAULT_BACKGROUND_GRAIN =
  generateGrainImg({ size: 240, scale: 1, contrast: 4 });

export const getGrainyColorImage = (name: string, modeOverride?: ThemeMode | undefined) =>
  (props: { theme: ThemeType }) => {
    const isDark = modeOverride ?? getIsDarkTheme(props);
    const bgColor = getColor(name)(props);

    // Dark config
    if (isDark) {
      return mixGrainImgWithColor({
        img: DEFAULT_BACKGROUND_GRAIN,
        bgColor,
        grainColor: 'white',
        intensity: 0.06,
      });
    }

    // Light config
    return mixGrainImgWithColor({
      img: DEFAULT_BACKGROUND_GRAIN,
      bgColor,
      grainColor: 'black',
      intensity: 0.2,
    });
  };
