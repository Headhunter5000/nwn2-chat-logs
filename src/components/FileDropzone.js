import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';

import { addChatLog } from '../utils/dbHooks';
import UploadModal from './UploadModal';

const DropZoneBox = styled.div(({ $isDragActive }) => css`
  display: flex;
  align-items: center;
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 1rem;
  cursor: pointer;

  ${$isDragActive && css`border-color: #46a`}
`);

const FileDropzone = () => {
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
          await addChatLog({ file: name, text: result });
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
      <DropZoneBox {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop it here ...</p> :
            <p>Drag &apos;n&apos; drop your files here, or click.</p>
        }
      </DropZoneBox>
      <UploadModal {...{ loadingCountdown, success, setSuccess, error, setError }} />
    </>
  );
};

export default FileDropzone;
