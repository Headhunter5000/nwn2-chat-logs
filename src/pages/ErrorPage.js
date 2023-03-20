import { PageHeader, Paragraph } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';

import InternalLink from '../components/common/InternalLink';
import Page from '../components/layout/Page';

const ErrorPage = () => {
  return (
    <Page>
      <PageHeader
        title="404 - Not Found!"
        parent={<InternalLink icon={<FormPreviousLink />} to="/">back</InternalLink>}
      />

      <Paragraph margin="none">
        This site is still in the early stages of development and things can change quickly.
        If you encounter a problem, first try deleting your chat logs and importing them again.
      </Paragraph>
    </Page>
  );
};

export default ErrorPage;
