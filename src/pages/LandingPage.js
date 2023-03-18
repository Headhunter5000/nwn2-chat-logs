import { Box, Button, Heading, Nav } from 'grommet';
import FileDropzone from '../components/FileDropzone';

import useCharacterMenu from '../utils/useCharacterMenu';

const LandingPage = () => {
  const items = useCharacterMenu({ withDelete: true });

  return (
    <>
      <Heading level="3">Upload your logs</Heading>
      <FileDropzone />

      {items.length > 0 && (
        <>
          <Heading level="3">Characters</Heading>
          <Nav alignSelf="start" data-testid="char-menu">
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
