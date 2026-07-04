import PropTypes from 'prop-types';
import { Box, Button, Layer, Text } from 'grommet';
import { deleteChatLogsByChar } from '../../utils/dbUtils';

const DeleteModal = ({ name, setLayerVisible }) => (
  <Layer modal>
    <Box pad="large">
      <Text>
        Are you sure you want to delete all chat logs of <strong>{name}</strong> ?
      </Text>
      <Box direction="row" justify="end" pad={{ top: 'large' }} gap="medium">
        <Button
          label="Cancel"
          onClick={() => setLayerVisible(false)}
        />
        <Button
          label="Confirm"
          color="status-critical"
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

DeleteModal.propTypes = {
  name: PropTypes.string.isRequired,
  setLayerVisible: PropTypes.func.isRequired,
};

export default DeleteModal;
