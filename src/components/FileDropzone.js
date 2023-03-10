import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';

import { ChatLogsContext } from '../utils/chatLogsContext';

const DropZoneBox = styled.div(({ $isDragActive }) => css`
  max-width: 10rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 1rem;

  ${$isDragActive && css`border-color: #46a`}
`);

const FileDropzone = () => {
  const { addChatLog } = useContext(ChatLogsContext);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const { name } = file;

      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = () => {
        const { result } = reader;

        try {
          addChatLog({ file: name, text: result });
        } catch (err) {
          console.error(err);
          alert('Failed to parse file');
        }
      };

      reader.readAsText(file);
    });
  }, [addChatLog]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/html': ['.log'],
    },
    onDrop,
  });

  return (
    <DropZoneBox {...getRootProps()} $isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop it here ...</p> :
          <p>Drag &apos;n&apos; drop your files here, or click here.</p>
      }
    </DropZoneBox>
  );
};

export default FileDropzone;
