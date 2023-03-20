import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { FormTrash } from 'grommet-icons';

import { deleteChatLogsByChar } from './dbUtils';
import { ChatLogsContext } from './statsContext';

const DeleteButton = ({ name }) => (
  <Button
    a11yTitle="delete"
    icon={<FormTrash color="status-critical" />}
    margin={{ left: 'small' }}
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      if (window.confirm(`Are you sure you want to delete all chat logs of ${name}?`)) {
        deleteChatLogsByChar(name);
      }
    }}
  />
);

const useCharacterMenu = ({ withDelete = false } = {}) => {
  const navigate = useNavigate();
  const { stats } = useContext(ChatLogsContext);

  return useMemo(
    () => stats.map(({ name, lastDate, count }) => {
      const href = `/characters/${name}/${lastDate}`;
      const key = name;

      return {
        key,
        href,
        label: (
          <>
            <Box direction="row" align="center" alignSelf="center" gap="small">
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
        onClick: e => {
          e.preventDefault();
          e.stopPropagation();
          navigate(href);
        },
      };
    }),
    [navigate, withDelete, stats]
  );
};

DeleteButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default useCharacterMenu;
