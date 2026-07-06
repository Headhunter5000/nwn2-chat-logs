import { deepFreeze, normalizeColor } from 'grommet/utils';
import { css } from 'styled-components';

import type { ThemeType } from 'grommet';
import { StyledDayContainer } from 'grommet/components/Calendar/StyledCalendar';

/* type CSS = TemplateStringsArray | CSSObject;

const normalizeCSS = (
  theme: ThemeType,
  lightCss: CSS,
  darkCss: CSS,
): CSS => 'dark' in theme && theme.dark ? darkCss : lightCss; */

const theme = deepFreeze<ThemeType>({
  global: {
    colors: {
      brand: '#8C6F3D',

      background: {
        light: '#ece8e3',
        dark: '#121416',
      },

      border: {
        light: '#A4A4A4',
        dark: '#4a5158',
      },
      
      text: {
        light: '#1C2024',
        dark: '#ece9e1',
      },

      surface: {
        light: '#d6d1c8',
        dark: '#1C2024',
      },

      control: {
        light: '#8C6F3D',
        dark: '#C5A059',
      },

      focus: {
        light: '#1C2024',
        dark: '#ebebe7',
      },

      active: {
        light: '#1C2024',
        dark: '#ebebe7',
      },

      'anchor-default': {
        light: '#8C6F3D',
        dark: '#C5A059',
      },
      
      'anchor-hover': {
        light: '#523D1F',
        dark: '#E3DCC4',
      },
    },
    elevation: {
      light: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.20)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.20)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.20)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.20)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.20)',
      },
      dark: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.40)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.40)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.40)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.40)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.40)',
      },
    },
    focus: {
      shadow: {
        size: '0px',
        color: 'transparent',
      },
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '2px',
      xsmall: '3px',
      small: '6px',
      medium: '12px',
      large: '24px',
      xlarge: '48px',
    },
    input: {
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
      weight: 400,
    },
  },
  accordion: {
    hover: {
      heading: {
        color: 'inherit',
      },
    },
  },
  anchor: {
    color: 'anchor-default',
    hover: {
      textDecoration: 'underline',
      extend: (props: { theme: ThemeType }) => css`
        color: ${normalizeColor('anchor-hover', props.theme)};
      `,
    },
  },
  button: {
    padding: {
      horizontal: '12px',
      vertical: '6px',
    },
    border: {
      radius: '6px',
    },
    size: {
      small: {
        pad: {
          horizontal: '6px',
          vertical: '3px',
        },
        border: {
          radius: '6px',
        },
      },
      medium: {
        pad: {
          horizontal: '12px',
          vertical: '6px',
        },
        border: {
          radius: '6px',
        },
      },
      large: {
        pad: {
          horizontal: '18px',
          vertical: '9px',
        },
        border: {
          radius: '6px',
        },
      },
    },
  },
  calendar: {
    day: {
      extend: css`
        opacity: 0.7;
      `,
    },
    range: {
      background: 'transparent',
    },
    extend: (props: { theme: ThemeType }) => css`
      ${StyledDayContainer} button {
        cursor: default;
        opacity: 1;
        background: transparent;

        [data-is-selected=true] {
          pointer-events: none;
        }

        [data-is-marked=false] {
          color: ${normalizeColor('text', props.theme)};
        }

        [data-is-marked=true] {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    `,
    small: {
      title: {
        size: 'small',
        weight: 'bold',
      },
    },
  },
  card: {
    container: {
      elevation: 'small',
    },
  },
  checkBoxGroup: {
    container: {
      gap: 'medium',
    },
  },
  dataTable: {
    pinned: {
      header: {
        background: {
          light: 'white',
          dark: 'black',
        },
      },
    },
  },
  formField: {
    border: false,
    label: {
      margin: '0',
    },
    content: {
      margin: { top: 'medium' },
    },
  },
  layer: {
    background: {
      dark: true,
    },
    border: {
      radius: 'medium',
    },
    container: {
      elevation: 'large',
      extend: (props: { theme: ThemeType }) => css`
        border: 2px solid ${normalizeColor('border', props.theme)};
        background-color: ${normalizeColor('background', props.theme)};
      `,
    },
  },
  radioButtonGroup: {
    container: {
      gap: 'medium',
    },
  },
  table: {
    header: {
      extend: css`
        height: 40px;
      `,
    },
  },
  textInput: {
    extend: css`
      border-color: transparent;
      background-color: white;
      color: black;
    `,
  },
});

export default theme;
