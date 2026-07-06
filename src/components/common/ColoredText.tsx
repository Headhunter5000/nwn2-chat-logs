import { Text, ThemeContext, type ThemeType } from 'grommet';
import { useContext } from 'react';
import { darkColorHash, lightColorHash } from '../../config/colorHash';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';

interface ColoredTextProps {
  children?: string;
  value?: string;
}

const ColoredText = ({ children, value, ...rest }: ColoredTextProps) => {
  const { colorizeNames } =  useContext(SettingsContext);
  const theme: ThemeType = useContext(ThemeContext);
  const dark = 'dark' in theme && theme.dark;

  if (typeof children !== 'string') return null;

  const colorHash = dark ? darkColorHash : lightColorHash;
  const color = colorizeNames ? colorHash.hex(value ?? children) : undefined;

  return (
    <Text truncate {...{ ...rest, color }}><span
      dangerouslySetInnerHTML={{ __html: children }}
    /></Text>
  );
};

export default ColoredText;