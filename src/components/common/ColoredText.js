import { Text } from 'grommet';
import PropTypes from 'prop-types';
import colorHash from '../../config/colorHash';

const ColoredText = ({ children, ...rest }) => {
  if (typeof children === 'string') {
    const color = colorHash.hex(children);
    return <Text truncate {...{ ...rest, color }}>{children}</Text>;
  }

  return null;
};

ColoredText.propTypes = {
  children: PropTypes.string,
};

ColoredText.defaultProps = {
  children: undefined,
};

export default ColoredText;
