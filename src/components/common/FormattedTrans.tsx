import { Trans } from 'react-i18next';
import InternalLink from './InternalLink';

interface FormattedTransProps {
  i18nKey: string;
  values?: Record<string, string | number>;
  to?: string;
}

const LinkTo = (({ children, to }: { children?: string, to?: string }) => (
  to ? <InternalLink to={to}>{children}</InternalLink> : <span>children</span>
));

const FormattedTrans = ({
  i18nKey,
  values,
  to,
}: FormattedTransProps) => {

  // We pass Grommet's Anchor directly as a pure element template.
  // DO NOT use the label prop here. Let react-i18next inject the children naturally.
  const namedComponents = {
    br: <br />,
    b: <b />,
    strong: <strong />,
    i: <i />,
    em: <em />,
    break: <span className="break" />,
    nobr: <span className="nowrap" />,
    nbsp: <>&nbsp;</>,
    a: <LinkTo to={to} />,
  };

  return (
    <Trans
      i18nKey={i18nKey}
      values={values}
      components={namedComponents}
    />
  );
};

export default FormattedTrans;