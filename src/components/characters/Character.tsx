import { Box, Text } from 'grommet';
import DeleteButton from './DeleteButton';

interface CharacterProps {
  name: string;
  count: number;
  withDelete?: boolean
};

export const Character = ({ name, count, withDelete }: CharacterProps) => (
  <Box direction="row" align="center" justify="between">
    <Box direction="row" align="center" alignSelf="center" gap="small">
      <Text>{name}</Text>
      <Text size="small" color={{ dark: 'dark-6', light: 'dark-3' }}>
        ({count})
      </Text>
    </Box>
    {withDelete && <DeleteButton {...{ name }} />}
  </Box>
);
