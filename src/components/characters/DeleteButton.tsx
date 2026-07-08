import { Button } from 'grommet';
import { Trash2 } from 'lucide-react';
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
        data-testid="char-delete"
        a11yTitle="delete"
        label={onlyIcon ? undefined : 'Delete'}
        icon={<Trash2 size={20} />}
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
