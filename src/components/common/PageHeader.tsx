import {
  PageHeader as GrommetPageHeader,
  type PageHeaderExtendedProps,
} from 'grommet';
import { LuArrowLeft } from 'react-icons/lu';
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
            icon={<LuArrowLeft size={20} />}
          >back</InternalLink>
        )
        : undefined
      }
      data-testid="page-header"
    />
  );
};

export default PageHeader;