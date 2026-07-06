import { Box, Text } from 'grommet';

interface CharacterProps {
  name: string;
  count: number;
  withDelete?: boolean
};

export const Character = ({ name, count }: CharacterProps) => (
  <Box direction="row" align="center" alignSelf="center" gap="small">
    <Text data-testid="char-name">{name}</Text>
    <Text data-testid="char-count" size="small" color={{ dark: 'dark-6', light: 'dark-3' }}>
      ({count})
    </Text>
  </Box>
);
