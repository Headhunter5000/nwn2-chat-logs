import { deepFreeze } from 'grommet/utils';
import { css } from 'styled-components';

import { StyledDayContainer } from 'grommet/components/Calendar/StyledCalendar';

const theme = deepFreeze({
  global: {
    colors: {
      brand: '#21c',
      control: {
        dark: 'accent-1',
        light: 'brand',
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
    extend: css`
      ${StyledDayContainer} button {
        opacity: 1;
      }
    `,
    small: {
      title: {
        size: 'small',
        weight: 'bold',
      },
    },
  },
  dataTable: {
    pinned: {
      header: {
        background: {
          dark: 'black',
          light: 'white',
        },
      },
    },
  },
  menu: {
    item: {
      justify: 'between',
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
      background-color: white;
      color: black;
    `,
  },
});

export default theme;
