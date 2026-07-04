import { Box, Text, type BoxProps } from 'grommet';
import { memo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';

import importLogFile from '../../utils/importLogFile';
import ImportModal from './ImportModal';

const DropzoneBox = styled(Box).attrs({
  align: 'center',
  justify: 'center',
  width: '12em',
  height: '12em',
  pad: 'large',
  margin: { bottom: 'large' },
})<BoxProps & { $isDragActive?: boolean }>(({ $isDragActive }) => css`
  border: 2px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;

  ${$isDragActive && css`
    border-color: ${({ theme }) => theme.global.colors.brand};
  `}
`);

const Upload = () => {
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
        {isDragActive
          ? <Text>Drop files here&hellip;</Text>
          : <Text>Drag &apos;n&apos; drop or click to import one or multiple files</Text>}
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
