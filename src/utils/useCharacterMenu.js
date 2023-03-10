import { Box, Button, Text } from 'grommet';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ChatLogsContext } from '../utils/chatLogsContext';
import { FormTrash } from 'grommet-icons';

const DeleteButton = ({ name }) => {
  const { deleteChatLogsOfChar } = useContext(ChatLogsContext);

  return (
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
};

const useCharacterMenu = ({ withDelete = false } = {}) => {
  const navigate = useNavigate();
  const { characters } = useContext(ChatLogsContext);

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
