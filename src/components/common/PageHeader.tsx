import { PageHeader as GrommetPageHeader, type PageHeaderExtendedProps } from 'grommet';
import { LuArrowLeft } from 'react-icons/lu';
import InternalLink from './InternalLink';

interface PageHeaderProps extends Pick<
PageHeaderExtendedProps,
'title' | 'subtitle' | 'level' | 'size'
> {
    hasBackLink?: boolean;
};

const PageHeader = ({ title, subtitle, level, size, hasBackLink = false }: PageHeaderProps) => {
  return (
    <GrommetPageHeader
      {...{ title, subtitle, level, size }}
      parent={hasBackLink
        ? <InternalLink icon={<LuArrowLeft size={20} />} to="/">back</InternalLink>
        : undefined
      }
      margin="none"
      pad={{ top: 'large', bottom: 'medium' }}
      data-testid="page-header"
    />
  );
};

export default PageHeader;