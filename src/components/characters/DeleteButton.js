import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { FormTrash } from 'grommet-icons';
import DeleteModal from './DeleteModal';

export const DeleteButton = ({ name, onlyIcon, ...rest }) => {
  const [layerVisible, setLayerVisible] = useState(false);

  return (
    <>
      <Button
        {...rest}
        a11yTitle="delete"
        label={onlyIcon ? undefined : 'Delete'}
        icon={<FormTrash color="status-critical" />}
        color="status-critical"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setLayerVisible(true);
        }}
      />
      {layerVisible && <DeleteModal {...{ name, setLayerVisible }} />}
    </>
  );
};

DeleteButton.propTypes = {
  name: PropTypes.string.isRequired,
  onlyIcon: PropTypes.bool,
};

DeleteButton.defaultProps = {
  onlyIcon: false,
};

export default DeleteButton;
