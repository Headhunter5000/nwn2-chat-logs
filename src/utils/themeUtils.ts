import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import type { CSSObject } from 'styled-components';

type CSS = TemplateStringsArray | CSSObject | string;

export const chooseByTheme = (lightCss: CSS, darkCss: CSS) =>
  (props: { theme: ThemeType }): CSS =>
    'dark' in props.theme && props.theme.dark ? darkCss : lightCss;

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
  (props: { theme: ThemeType }) =>
    normalizeColor(name, props.theme);

export const transparentWhite = (opacity: number) =>
  `hsla(0, 0%, 100%, ${Math.max(0, Math.min(100, opacity)) / 100})`;

export const transparentBlack = (opacity: number) =>
  `hsla(0, 0%, 0%, ${Math.max(0, Math.min(100, opacity)) / 100})`;