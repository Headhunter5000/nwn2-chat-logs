import { Text } from 'grommet';
import colorHash from '../../config/colorHash';

interface ColoredTextProps {
  children?: string;
  value?: string;
}

const ColoredText = ({ children, value, ...rest }: ColoredTextProps) => {
  if (typeof children === 'string') {
    const color = colorHash.hex(value ?? children);
    return <Text truncate {...{ ...rest, color }}><span
      dangerouslySetInnerHTML={{ __html: children }}
    /></Text>;
  }

  return null;
};

export default ColoredText;