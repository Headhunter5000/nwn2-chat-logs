import { Box, Button, Layer, Text } from 'grommet';
import { useTranslation } from 'react-i18next';
import { deleteChatLogsByChar } from '../../utils/dbUtils';
import FormattedTrans from '../common/FormattedTrans';

interface DeleteModalProps {
  name: string;
  setLayerVisible: (visible: boolean) => void;
}

const DeleteModal = ({ name, setLayerVisible }: DeleteModalProps) => {
  const { t } = useTranslation();
  return (
    <Layer modal>
      <Box pad="large" data-testid="delete-modal">
        <Text data-testid="delete-modal-disclaimer" data-charname={name}>
          <FormattedTrans i18nKey="component.delete_modal.disclaimer" values={{ name }} />
        </Text>
        <Box direction="row" justify="end" pad={{ top: 'large' }} gap="medium">
          <Button
            label={t('common.cancel')}
            data-testid="delete-modal-cancel"
            onClick={() => setLayerVisible(false)}
          />
          <Button
            label={t('common.confirm')}
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
};

export default DeleteModal;
