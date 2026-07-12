type RawImageData = {
  data: Uint8ClampedArray;
  size: number;
};

export const generateGrainImg = (props: {
  opacity?: number;
  size?: number;
  scale?: number;
  contrast?: number; // (0 = sehr weich, 1 = Standard, 2+ = hart)
}): RawImageData => {
  const opacity = props?.opacity ?? 0.55;
  const size = props?.size ?? 150;
  const scale = Math.max(1, props?.scale ?? 1);
  const contrast = Math.max(0, props?.contrast ?? 1);

  const data = new Uint8ClampedArray(size * size * 4);

  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    const x = pixelIndex % size;
    const y = Math.floor(pixelIndex / size);

    const scaledX = Math.floor(x / scale);
    const scaledY = Math.floor(y / scale);

    const dotProduct = scaledX * 12.9898 + scaledY * 78.233;
    const pseudoRandomValue = Math.sin(dotProduct) * 43758.5453123;
    let finalValue = pseudoRandomValue - Math.floor(pseudoRandomValue);

    if (contrast !== 1) {
      finalValue = Math.pow(finalValue, contrast);
    }

    data[i] = 0;     // R
    data[i + 1] = 0; // G
    data[i + 2] = 0; // B
    data[i + 3] = Math.floor(finalValue * 255 * opacity); // A
  }

  return { data, size };
};

export const mixImgWithColor = ({
  grain,
  bgColor,
  grainColor,
  intensity = 1,
}: {
  grain: RawImageData;
  bgColor: string;    // Nimmt jeden CSS-String
  grainColor: string; // Nimmt jeden CSS-String
  intensity?: number;
}): RawImageData => {
  const { data: grainPixels, size } = grain;

  // Für das Farb-Parsing brauchen wir kurz einen 1x1-Canvas
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = 1;
  colorCanvas.height = 1;
  const colorCtx = colorCanvas.getContext('2d', { willReadFrequently: true });
  if (!colorCtx) return { data: new Uint8ClampedArray(), size };

  colorCtx.fillStyle = bgColor;
  colorCtx.fillRect(0, 0, 1, 1);
  const [bgR, bgG, bgB] = colorCtx.getImageData(0, 0, 1, 1).data;

  colorCtx.fillStyle = grainColor;
  colorCtx.fillRect(0, 0, 1, 1);
  const [gR, gG, gB] = colorCtx.getImageData(0, 0, 1, 1).data;

  const data = new Uint8ClampedArray(grainPixels.length);

  for (let i = 0; i < data.length; i += 4) {
    const originalAlpha = grainPixels[i + 3] / 255;
    const grainAlpha = originalAlpha * intensity;

    data[i]     = Math.floor(gR * grainAlpha + bgR * (1 - grainAlpha));
    data[i + 1] = Math.floor(gG * grainAlpha + bgG * (1 - grainAlpha));
    data[i + 2] = Math.floor(gB * grainAlpha + bgB * (1 - grainAlpha));
    data[i + 3] = 255;
  }

  return { data, size };
};

export const encodeToBase64 = (
  raw: RawImageData,
  mimeType: 'image/png' | 'image/jpeg' = 'image/png',
): string => {
  const { data, size } = raw;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const imgData = new ImageData(
    data as Uint8ClampedArray<ArrayBuffer>,
    size,
    size,
  );
  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL(mimeType);
};