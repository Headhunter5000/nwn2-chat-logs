import { Box, Button, Heading, Nav, PageHeader } from 'grommet';
import FileDropzone from '../components/FileDropzone';

import useCharacterMenu from '../utils/useCharacterMenu';

const LandingPage = () => {
  const items = useCharacterMenu({ withDelete: true });

  return (
    <>
      <PageHeader title="Home" />

      <Heading level="3">Upload your logs</Heading>
      <FileDropzone />

      <Heading level="3">Characters</Heading>
      <Nav alignSelf="start">
        {items.map(({ key, label, ...props }) => (
          <Button {...props} key={key} hoverIndicator>
            <Box direction="row" justify="between">
              {label}
            </Box>
          </Button>
        ))}
      </Nav>
    </>
  );
};

export default LandingPage;
