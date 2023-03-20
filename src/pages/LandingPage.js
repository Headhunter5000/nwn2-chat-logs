import { Box, Button, Heading, Nav, Paragraph } from 'grommet';
import useCharacterMenu from '../utils/useCharacterMenu';
import FileDropzone from '../components/upload/FileDropzone';

const LandingPage = () => {
  const items = useCharacterMenu({ withDelete: true });

  return (
    <>
      <Heading level="3">Import your logs</Heading>

      <Paragraph margin={{ top: 'none', bottom: 'large' }}>
        Imported logs are stored on your system in the browser. No files are transferred to any server.
      </Paragraph>

      <FileDropzone />

      {items.length > 0 && (
        <>
          <Heading level="3">Characters</Heading>
          <Nav alignSelf="start" gap="none" data-testid="char-menu">
            {items.map(({ key, label, ...props }) => (
              <Button {...props} key={key} hoverIndicator>
                <Box direction="row" justify="between">
                  {label}
                </Box>
              </Button>
            ))}
          </Nav>
        </>
      )}
    </>
  );
};

export default LandingPage;
