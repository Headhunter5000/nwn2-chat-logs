import styled, { css } from 'styled-components';
import { Text } from 'grommet';
import colorHash from '../../config/colorHash';

const ColoredText = styled(Text).attrs({ truncate: true })(
  ({ children }) => css`
    white-space: nowrap;
    color: ${colorHash.hex(typeof children === 'string' ? children : '')};
  `
);

export default ColoredText;
