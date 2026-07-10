import { Box, Text, type BoxProps } from 'grommet';
import { memo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';

import { normalizeColor } from 'grommet/utils';
import { useTranslation } from 'react-i18next';
import importLogFile from '../../utils/importLogFile';
import ImportModal from './ImportModal';

const DropzoneBox = styled(Box).attrs({
  align: 'center',
  justify: 'center',
  width: '12em',
  height: '12em',
  pad: 'large',
  margin: { bottom: 'large' },
})<BoxProps & { $isDragActive?: boolean }>(({ theme, $isDragActive }) => css`
  border: 2px dashed ${normalizeColor('border', theme)};
  border-radius: 6px;
  cursor: pointer;

  ${$isDragActive && css`
    border-color: ${normalizeColor('brand', theme)};
  `}
`);

const Upload = () => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState<string[]>([]);
  const [error, setError] = useState<string[]>([]);
  const [loadingCountdown, setLoadingCountdown] = useState<number>(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setLoadingCountdown(acceptedFiles.length);

    acceptedFiles.forEach((file: File) => {
      const { name } = file;

      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = async () => {
        const { result } = reader;

        try {
          await importLogFile(name, result);
          setSuccess((prev: string[]) => [...prev, name]);
        } catch (err) {
          setError((prev: string[]) => [...prev, name]);
          console.error(err);
        }

        setLoadingCountdown(prev => prev - 1);
      };

      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/html': ['.log'],
    },
    onDrop,
  });

  return (
    <>
      <DropzoneBox {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <Text data-testid="import-dropzone">
          {isDragActive
            ? t('component.dropzone.hint_hovered')
            : t('component.dropzone.hint_default')}
        </Text>
      </DropzoneBox>
      <ImportModal {...{
        loadingCountdown,
        success,
        setSuccess,
        error,
        setError,
      }} />
    </>
  );
};

export default memo(Upload);
