import ColorHash from 'color-hash';

export const lightColorHash = new ColorHash({
  saturation: [0.6, 0.8, 1.0],
  lightness: [0.32, 0.36, 0.4],
});

export const darkColorHash = new ColorHash({
  saturation: [0.5, 0.6, 0.7],
  lightness: [0.52, 0.56, 0.6],
});
