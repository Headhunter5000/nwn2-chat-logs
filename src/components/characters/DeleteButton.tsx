import { Button } from 'grommet';
import { useState } from 'react';
import { LuTrash2 } from 'react-icons/lu';

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
        data-testid="char-delete"
        a11yTitle="delete"
        label={onlyIcon ? undefined : 'Delete'}
        icon={<LuTrash2 size={20} color="status-critical" />}
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
