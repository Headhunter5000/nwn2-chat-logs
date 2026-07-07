const grainCache = new Map<string, string>();

const generateHash = (str: string): string => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(36); // Als kompakten Base36-String zurückgeben
};

export const generateGrainImg = (props: {
  opacity?: number;
  size?: number;
  scale?: number;
  contrast?: number; // (0 = sehr weich, 1 = Standard, 2+ = hart)
}) => {
  const opacity = props?.opacity ?? 0.55;
  const size = props?.size ?? 150;
  const scale = Math.max(1, props?.scale ?? 1);
  const contrast = Math.max(0, props?.contrast ?? 1); // Neu: Standardwert ist 1

  const cacheKey = `grain_${opacity}_${size}_${scale}_${contrast}`;

  if (grainCache.has(cacheKey)) {
    return grainCache.get(cacheKey)!;
  }

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return ''; 

  ctx.clearRect(0, 0, size, size);

  const imgData: ImageData = ctx.createImageData(size, size);
  const data: Uint8ClampedArray = imgData.data;

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
      // contrast < 1: Schiebt Werte Richtung 0.5 (weniger Schwarz, weniger Transparent, weicher)
      // contrast > 1: Schiebt Werte Richtung 0 und 1 (mehr hartes Schwarz, mehr volle Transparenz)
      finalValue = Math.pow(finalValue, contrast);
    }

    data[i] = 0;     // R
    data[i+1] = 0;   // G
    data[i+2] = 0;   // B
    // Die Deckkraft wird nun vom modifizierten Kontrast beeinflusst
    data[i+3] = Math.floor(finalValue * 255 * opacity); 
  }

  ctx.putImageData(imgData, 0, 0);
  const resultDataUrl = canvas.toDataURL('image/png');

  grainCache.set(cacheKey, resultDataUrl);
  return resultDataUrl;
};

export const mixGrainImgWithColor = ({
  img,
  bgColor,
  grainColor,
  intensity = 1,
}: {
  img: string;
  bgColor: string;    // Nimmt jeden CSS-String
  grainColor: string; // Nimmt jeden CSS-String
  intensity?: number;
}): string => {
  const imgHash = generateHash(img);
  const cacheKey = `grain_color_${imgHash}_${bgColor}_${grainColor}_${intensity}`;

  if (grainCache.has(cacheKey)) {
    return grainCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return '';

  const image = new Image();
  image.src = img;
  
  const size = image.width || 150;
  canvas.width = size;
  canvas.height = size;
  
  // 1. NATIVER CANVAS-PARSER FÜR DIE FARBEN
  // Wir missbrauchen den Canvas kurz, um die RGB-Werte von bgColor zu extrahieren
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 1, 1);
  const [bgR, bgG, bgB] = ctx.getImageData(0, 0, 1, 1).data;

  // Das gleiche Spiel für grainColor
  ctx.fillStyle = grainColor;
  ctx.fillRect(0, 0, 1, 1);
  const [gR, gG, gB] = ctx.getImageData(0, 0, 1, 1).data;

  // Canvas säubern, bevor wir das eigentliche Korn verarbeiten
  ctx.clearRect(0, 0, size, size);

  // 2. DAS KORN VERARBEITEN
  ctx.drawImage(image, 0, 0);
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  // 3. REIN RECHNERISCHER LOOP (Wie gehabt)
  for (let i = 0; i < data.length; i += 4) {
    const originalAlpha = data[i + 3] / 255;
    const grainAlpha = originalAlpha * intensity;

    // Alpha Blending Berechnung
    data[i]     = Math.floor(gR * grainAlpha + bgR * (1 - grainAlpha)); 
    data[i + 1] = Math.floor(gG * grainAlpha + bgG * (1 - grainAlpha)); 
    data[i + 2] = Math.floor(gB * grainAlpha + bgB * (1 - grainAlpha)); 
    data[i + 3] = 255; 
  }

  ctx.putImageData(imgData, 0, 0);
  const resultDataUrl = canvas.toDataURL('image/jpeg');

  grainCache.set(cacheKey, resultDataUrl);
  return resultDataUrl;
};
