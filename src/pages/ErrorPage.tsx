import { Paragraph } from 'grommet';

import PageHeader from '../components/common/PageHeader';
import Page from '../components/layout/Page';

const ErrorPage = () => {
  return (
    <Page>
      <PageHeader
        title="404 - Not Found!"
        hasBackLink
      />
      <Paragraph margin="none">
        This site is still in the early stages of development and things can change quickly.
        If you encounter a problem, first try deleting your chat logs and importing them again.
      </Paragraph>
    </Page>
  );
};

export default ErrorPage;
