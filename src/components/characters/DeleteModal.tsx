import { Box, Button, Layer, Text } from 'grommet';
import { deleteChatLogsByChar } from '../../utils/dbUtils';

interface DeleteModalProps {
  name: string;
  setLayerVisible: (visible: boolean) => void;
}

const DeleteModal = ({ name, setLayerVisible }: DeleteModalProps) => (
  <Layer modal>
    <Box pad="large">
      <Text>
        <span>Are you sure you want to delete all chat logs of</span> <strong>{name}</strong> ?
      </Text>
      <Box direction="row" justify="end" pad={{ top: 'large' }} gap="medium">
        <Button
          label="Cancel"
          data-testid="delete-modal-cancel"
          onClick={() => setLayerVisible(false)}
        />
        <Button
          label="Confirm"
          color="status-critical"
          data-testid="delete-modal-confirm"
          onClick={() => {
            setLayerVisible(false);
            deleteChatLogsByChar(name);
          }}
          primary
        />
      </Box>
    </Box>
  </Layer>
);

export default DeleteModal;
