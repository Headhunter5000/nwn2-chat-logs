import { Box, Text } from 'grommet';

interface CharacterProps {
  name: string;
  count: number;
  withDelete?: boolean
};

export const Character = ({ name, count }: CharacterProps) => (
  <Box direction="row" align="center" alignSelf="center" gap="small">
    <Text>{name}</Text>
    <Text size="small" color={{ dark: 'dark-6', light: 'dark-3' }}>
        ({count})
    </Text>
  </Box>
);
