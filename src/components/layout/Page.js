import { Page, PageContent } from 'grommet';
import PropTypes from 'prop-types';
import Header from './Header';

const PageLayout = ({ children }) => {
  return (
    <Page style={{ minHeight: '100%' }}>
      <Header />
      <PageContent
        pad={{ horizontal: 'large', bottom: 'large' }}
        style={{ flex: 1 }}
      >
        {children}
      </PageContent>
    </Page>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
