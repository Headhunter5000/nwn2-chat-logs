import { deepFreeze } from 'grommet/utils';
import { css } from 'styled-components';

import type { ThemeType } from 'grommet';
import { StyledDayContainer } from 'grommet/components/Calendar/StyledCalendar';
import {
  getColor,
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
        dark: 'sand-100',
      },

      surface: {
        light: 'sand-300',
        dark: 'slate-800',
      },

      control: {
        light: 'gold-600',
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
        light: 'gold-800',
        dark: 'gold-400',
      },

      'transparent-border': {
        light: transparentBlack(30),
        dark: transparentWhite(45),
      },
    },
    elevation: {
      light: {
        none: 'none',
        xsmall: `0px 2px 3px ${transparentBlack(18)}`,
        small: `0px 3px 4px ${transparentBlack(22)}`,
        medium: `0px 4px 8px ${transparentBlack(26)}`,
        large: `0px 6px 12px ${transparentBlack(30)}`,
        xlarge: `0px 8px 16px ${transparentBlack(34)}`,
      },
      dark: {
        none: 'none',
        xsmall: `0px 2px 3px ${transparentBlack(32)}`,
        small: `0px 3px 4px ${transparentBlack(36)}`,
        medium: `0px 4px 8px ${transparentBlack(40)}`,
        large: `0px 6px 12px ${transparentBlack(44)}`,
        xlarge: `0px 8px 16px ${transparentBlack(48)}`,
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
    fontWeight: 500,
    hover: {
      textDecoration: 'underline',
      extend: css`
        color: ${getColor('anchor-hover')};
        :not(#app-header) svg * {
          stroke: currentColor;
        }
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
    small: {
      daySize: '48px',
    },
    medium: {
      daySize: '54px',
    },
    large: {
      daySize: '96px',
    },
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
      width: auto;
      ${StyledDayContainer} button {
        cursor: default;
        opacity: 1;
        background: transparent;

        [data-is-selected=true] {
          border-radius: 33%;
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
    body: {
      extend: css`
        th button {
          &:hover {
            background: none;
          }
        }
      `,
    },
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
    margin: 'none',
    label: {
      margin: 'none',
    },
    content: {
      margin: { top: 'medium' },
    },
  },
  layer: {
    border: {
      radius: 'medium',
    },
    container: {
      elevation: 'medium',
      extend: css`
        border: 2px solid ${getColor('border')};
      `,
    },
  },
  pageHeader: {
    pad: { top: 'large', bottom: 'large' },
    size: {
      small: {
        pad:  { top: 'large', bottom: 'medium' },
      },
      large: {
        pad:  { top: 'large', bottom: 'xlarge' },
      },
    },
    parent: {
      pad: { bottom: 'small' },
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
