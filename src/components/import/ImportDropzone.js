import { memo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';

import importLogFile from '../../utils/importLogFile';
import ImportModal from './ImportModal';

const DropzoneBox = styled(Box).attrs({
  align: 'center',
  justify: 'center',
  width: '12em',
  height: '12em',
  pad: 'large',
  margin: { bottom: 'large' },
})(({ $isDragActive }) => css`
  border: 2px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;

  ${$isDragActive && css`
    border-color: ${({ theme }) => theme.global.colors.brand};
  `}
`);

const Upload = () => {
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);
  const [loadingCountdown, setLoadingCountdown] = useState(0);

  const onDrop = useCallback(acceptedFiles => {
    setLoadingCountdown(acceptedFiles.length);

    acceptedFiles.forEach(file => {
      const { name } = file;

      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = async () => {
        const { result } = reader;

        try {
          await importLogFile({ file: name, text: result });
          setSuccess(prev => ([...prev, name]));
        } catch (err) {
          setError(prev => ([...prev, name]));
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
