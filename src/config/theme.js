import { deepFreeze } from 'grommet/utils';

const theme = deepFreeze({
  global: {
    colors: {
      brand: '#21c',
      control: {
        dark: 'accent-1',
        light: 'brand',
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
  },
  button: {
    border: {
      radius: '5px',
    },
    size: {
      small: {
        border: {
          radius: '5px',
        },
      },
      medium: {
        border: {
          radius: '5px',
        },
      },
      large: {
        border: {
          radius: '5px',
        },
      },
    },
  },
  accordion: {
    hover: {
      heading: {
        color: 'inherit',
      },
    },
  },
  menu: {
    item: {
      justify: 'between',
    },
  },
});

export default theme;
