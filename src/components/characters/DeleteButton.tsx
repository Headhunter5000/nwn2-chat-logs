import { Button } from 'grommet';
import { FormTrash } from 'grommet-icons';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

interface DeleteButtonProps {
  name: string;
  onlyIcon?: boolean;
  [key: string]: unknown;
}

export const DeleteButton = ({ name, onlyIcon = false, ...rest }: DeleteButtonProps) => {
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

export default DeleteButton;
