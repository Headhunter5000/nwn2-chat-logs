import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { FormTrash } from 'grommet-icons';

import { deleteChatLogsOfChar, useChars } from './dbHooks';

const DeleteButton = ({ name }) => (
  <Button
    a11yTitle="delete"
    icon={<FormTrash color="status-critical" />}
    margin={{ left: 'small' }}
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      if (window.confirm(`Are you sure you want to delete all chat logs of ${name}?`)) {
        deleteChatLogsOfChar(name);
      }
    }}
  />
);

const useCharacterMenu = ({ withDelete = false } = {}) => {
  const navigate = useNavigate();
  const characters = useChars();

  return characters.map(({ name, count }) => ({
    key: name,
    label: (
      <>
        <Box direction="row" align="center"  alignSelf="center" gap="small">
          <Text>
            {name.replace('_', ' ')}
          </Text>
          <Text size="small" color={{ dark: 'dark-6', light: 'dark-3' }}>
            ({count})
          </Text>
        </Box>
        {withDelete && <DeleteButton {...{ name }} />}
      </>
    ),
    href: `/characters/${name}`,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/characters/${name}`);
    },
  }));
};

DeleteButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default useCharacterMenu;
