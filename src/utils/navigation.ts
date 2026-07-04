export const buildCharacterUrl = (char: string, date?: string, index?: number) =>
  `/characters/${char}${date ? `/${date}` : ''}${date && index ? `/${index}` : ''}`;
