import { Box, Button, Layer, Text } from 'grommet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CHAT_LOG_FILE_PATTERN from '../../regex/chatlogFile';
import CollapsibleResults from '../common/CollapsibleResults';

interface UploadModal {
  loadingCountdown: number;
  success: string[];
  setSuccess: React.Dispatch<React.SetStateAction<string[]>>;
  error: string[];
  setError: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ErrorGroups {
  errorFileName: string[];
  errorContent: string[];
}

const WideLayer = styled(Layer)`
  width: min(25em, 100%);
`;

const UploadModal = ({
  loadingCountdown,
  success,
  setSuccess,
  error,
  setError,
}: UploadModal) => {
  const { t } = useTranslation();

  const { errorContent, errorFileName } = error.reduce<ErrorGroups>((acc, file) =>{
    if (file.match(CHAT_LOG_FILE_PATTERN)) acc.errorContent.push(file);
    acc.errorFileName.push(file);
    return acc;
  }, { errorFileName: [], errorContent: [] });

  if (loadingCountdown > 0 || success.length > 0 || error.length > 0) {
    return (
      <WideLayer modal>
        <Box pad="large">
          {loadingCountdown > 0 ? (
            <Text>Processing {loadingCountdown} files</Text>
          ) : (
            <>
              <CollapsibleResults
                label={<><strong>{success.length}</strong>&nbsp;successful</>}
                results={success}
              />

              <CollapsibleResults
                label={<><strong>{errorContent.length}</strong>&nbsp;failed (incompatible content)</>}
                results={errorContent}
                color={'blood-500'}
              />

              <CollapsibleResults
                label={<><strong>{errorFileName.length}</strong>&nbsp;failed (wrong file type)</>}
                results={errorFileName}
                color={'blood-500'}
              />

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
      </WideLayer>
    );
  }

  return null;
};

export default UploadModal;