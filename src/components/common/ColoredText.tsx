import { Text } from 'grommet';
import colorHash from '../../config/colorHash';

interface ColoredTextProps {
  children?: string;
}

const ColoredText = ({ children, ...rest }: ColoredTextProps) => {
  if (typeof children === 'string') {
    const color = colorHash.hex(children);
    return <Text truncate {...{ ...rest, color }}>{children}</Text>;
  }

  return null;
};

export default ColoredText;