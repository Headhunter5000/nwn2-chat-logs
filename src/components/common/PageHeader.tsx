import {
  PageHeader as GrommetPageHeader,
  type PageHeaderExtendedProps,
} from 'grommet';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InternalLink from './InternalLink';

interface PageHeaderProps extends Pick<
PageHeaderExtendedProps,
'title' | 'subtitle' | 'level' | 'size'
> {
    backLink?: boolean | string;
};

const PageHeader = ({
  title,
  subtitle,
  level,
  size,
  backLink = false,
}: PageHeaderProps) => {
  const { t } = useTranslation();
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
          >
            {t('common.back')}
          </InternalLink>
        )
        : undefined
      }
      data-testid="page-header"
    />
  );
};

export default PageHeader;