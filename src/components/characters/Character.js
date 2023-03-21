import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import DeleteButton from './DeleteButton';

export const Character = ({ name, count, withDelete }) => (
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

Character.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  withDelete: PropTypes.bool,
};

Character.defaultProps = {
  withDelete: false,
};
