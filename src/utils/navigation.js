export const buildCharacterUrl = (char, date, index) =>
  `/characters/${char}${date ? `/${date}` : ''}${date && index ? `/${index}` : ''}`;
