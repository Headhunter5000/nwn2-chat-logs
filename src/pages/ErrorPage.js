import { Box, PageHeader } from 'grommet';
import InternalLink from '../components/InternalLink';
import PageLayout from '../components/PageLayout';

const ErrorPage = () => {
  return (
    <PageLayout>
      <Box direction="row">
        <InternalLink to="/">&larr; back</InternalLink>
      </Box>
      <PageHeader title="404 - Not Found!" />
    </PageLayout>
  );
};

export default ErrorPage;
