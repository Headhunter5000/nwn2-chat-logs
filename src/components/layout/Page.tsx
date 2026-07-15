import { Page, PageContent } from 'grommet';

import Header from './Header';

const PageLayout = ({ children }: { children: React.ReactNode } ) => {
  return (
    <Page style={{ minHeight: '100%' }}>
      <Header />
      <PageContent
        as="main"
        id="app-main"
        data-testid="app-main"
        margin={{ horizontal: 'auto' }}
        pad={{ horizontal: 'large', bottom: 'large' }}
        alignSelf="start"
        flex
      >
        {children}
      </PageContent>
    </Page>
  );
};

export default PageLayout;
