import { Box, Button, Layer, List, Text } from 'grommet';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UploadModal {
  loadingCountdown: number;
  success: string[];
  setSuccess: React.Dispatch<React.SetStateAction<string[]>>;
  error: string[];
  setError: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadModal = ({
  loadingCountdown,
  success,
  setSuccess,
  error,
  setError,
}: UploadModal) => {
  const { t } = useTranslation();

  if (loadingCountdown > 0 || success.length > 0 || error.length > 0) {
    return (
      <Layer modal>
        <Box pad="large">
          {loadingCountdown > 0 ? (
            <Text>Processing {loadingCountdown} files</Text>
          ) : (
            <>
              <Text>
                <strong>{success.length}</strong> successful
              </Text>

              {error.length > 0 && (
                <>
                  <Text margin={{ top: 'medium' }} color="blood-500">
                    <strong>{error.length}</strong> failed:
                  </Text>
                  <List
                    margin={{ top: 'medium', bottom: 'small' }}
                    data={error}
                    paginate={{ step: 10 }}
                    pad={{ horizontal: 'none', vertical: 'medium' }}
                  />
                </>
              )}

              <Button
                label={t('common.close')}
                margin={{ top: 'medium' }}
                onClick={() => {
                  setSuccess([]);
                  setError([]);
                }}
                primary
              />
            </>
          )}
        </Box>
      </Layer>
    );
  }

  return null;
};

export default UploadModal;