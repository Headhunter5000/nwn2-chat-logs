import {
  PageHeader as GrommetPageHeader,
  type PageHeaderExtendedProps,
} from 'grommet';
import { ArrowLeft } from 'lucide-react';
import InternalLink from './InternalLink';

interface PageHeaderProps extends Pick<
PageHeaderExtendedProps,
'title' | 'subtitle' | 'level' | 'size'
> {
    backLink?: boolean | string;
};

const PageHeader = ({ title, subtitle, level, size, backLink = false }: PageHeaderProps) => {
  const isBackLinkString = typeof backLink === 'string';

  const config = isBackLinkString ? {
    to: backLink,
  } : {
    to: '/',
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      history.back();
    },
  };

  return (
    <GrommetPageHeader
      {...{ title, subtitle, level, size }}
      parent={backLink
        ? (
          <InternalLink
            {...config}
            icon={<ArrowLeft size={20} />}
          >back</InternalLink>
        )
        : undefined
      }
      data-testid="page-header"
    />
  );
};

export default PageHeader;