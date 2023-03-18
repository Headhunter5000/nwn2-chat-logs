import styled, { css } from 'styled-components';
import { Text } from 'grommet';
import ColorHash from 'color-hash';

const colorHash = new ColorHash();

const ColoredText = styled(Text)(({ children }) => css`
  color: ${colorHash.hex(typeof children === 'string' ? children : '')};
`);

export default ColoredText;
