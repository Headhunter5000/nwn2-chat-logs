import { Page, PageContent } from 'grommet';
import PropTypes from 'prop-types';

import Header from './Header';

const PageLayout = ({ children }) => {
  return (
    <Page>
      <Header />
      <PageContent pad="large">
        {children}
      </PageContent>
    </Page>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
