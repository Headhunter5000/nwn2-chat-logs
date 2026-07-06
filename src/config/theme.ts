import { deepFreeze } from 'grommet/utils';
import { css } from 'styled-components';

import type { ThemeType } from 'grommet';
import { StyledDayContainer } from 'grommet/components/Calendar/StyledCalendar';
import {
  chooseByTheme,
  getColor,
  getThemeProp,
  transparentBlack,
  transparentWhite,
} from '../utils/themeUtils';
import themeColors from './themeColors';

const theme = deepFreeze<ThemeType>({
  global: {
    colors: {
      ...themeColors,

      brand: 'gold-700',

      background: {
        light: 'sand-100',
        dark: 'slate-900',
      },

      border: {
        light: 'gray-400',
        dark: 'slate-700',
      },
  
      text: {
        light: 'slate-800',
        dark: 'gold-100',
      },

      surface: {
        light: 'sand-300',
        dark: 'slate-800',
      },

      control: {
        light: 'gold-700',
        dark: 'gold-500',
      },

      focus: {
        light: 'slate-800',
        dark: 'sand-100',
      },

      active: {
        light: 'slate-800',
        dark: 'sand-100',
      },

      'anchor-default': {
        light: 'gold-700',
        dark: 'gold-500',
      },
  
      'anchor-hover': {
        light: 'gold-900',
        dark: 'gold-200',
      },

      'transparent-border': {
        light: transparentBlack(25),
        dark: transparentWhite(45),
      },
    },
    elevation: {
      light: {
        none: 'none',
        xsmall: `0px 1px 2px ${transparentBlack(25)}`,
        small: `0px 2px 4px ${transparentBlack(25)}`,
        medium: `0px 4px 8px ${transparentBlack(25)}`,
        large: `0px 8px 16px ${transparentBlack(25)}`,
        xlarge: `0px 12px 24px ${transparentBlack(25)}`,
      },
      dark: {
        none: 'none',
        xsmall: `0px 1px 2px ${transparentBlack(40)}`,
        small: `0px 2px 4px ${transparentBlack(40)}`,
        medium: `0px 4px 8px ${transparentBlack(40)}`,
        large: `0px 8px 16px ${transparentBlack(40)}`,
        xlarge: `0px 12px 24px ${transparentBlack(40)}`,
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
      extend: css`
        color: ${getColor('anchor-hover')};
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
      hover: {
        background: 'gold-500',
      },
      selected: {
        background: 'gold-500',
      },
      extend: css`
        opacity: 0.7;
      `,
    },
    extend: css`
      ${StyledDayContainer} button {
        cursor: default;
        opacity: 1;
        background: transparent;

        [data-is-selected=true] {
          border-radius: ${getThemeProp('global.borderSize.large')};
          background-color: ${getColor('brand')};
          color: ${getColor('white')};
          pointer-events: none;
        }

        [data-is-marked=false] {
          color: ${getColor('text')};
          opacity: 0.4;
        }

        [data-is-marked=true][data-is-selected=false] {
          color: ${getColor('control')};
          font-weight: 500;
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
  checkBox: {
    border: {
      color: 'transparent-border',
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
    /* background: {
      dark: true,
    }, */
    border: {
      radius: 'medium',
    },
    container: {
      elevation: 'medium',
      extend: css`
        border: 2px solid ${getColor('border')};
        /* ${chooseByTheme(transparentBlack(30), transparentWhite(50))}; */
        /* background-color: ${getColor('background')}; */
      `,
    },
  },
  radioButton: {
    border: {
      color: 'transparent-border',
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
