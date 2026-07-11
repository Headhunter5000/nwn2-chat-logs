import { createGlobalStyle } from 'styled-components';

/* const gradient1 = css`
  background-image:
    linear-gradient(
      180deg,
      transparent 7%,
      #fff5 8%,
      #fff5 9%,
      transparent 10%,
      transparent 15%,
      #0005 16%,
      #0005 17%,
      #00000013 18%,
      transparent 50%,
      #ffffff13 82%,
      #fff5 83%,
      #fff5 84%,
      transparent 85%,
      transparent 90%,
      #0005 91%,
      #0005 92%,
      transparent 93%
    );
`; */

/* const gradient2 = (props: { theme: ThemeType }) => {
  const brandColor = getColor('brand')(props);
  const brandColor50 = convertHslToHsla(brandColor, 30);

  return css`
    background-image:
      linear-gradient(90deg,
        ${brandColor50} 20%,
        transparent 50%,
        ${brandColor50} 80%
      ),
      linear-gradient(
        180deg,
        transparent 0%,
        ${transparentWhite(11)} 33.33%,
        transparent 50%,
        ${transparentBlack(9)} 66.67%,
        transparent 100%
      );

    background-size: auto, auto 33.33%;
    background-repeat: no-repeat, repeat-y;
  `;
}; */

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #app-root {
    overflow-y: scroll;
  }
`;

export default GlobalStyle;