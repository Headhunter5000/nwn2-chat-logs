import { PageHeader } from 'grommet';
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
    </Page>
  );
};

export default ErrorPage;
