import { Anchor, Button } from 'grommet';
import type { ColorType } from 'grommet/utils';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const UI_TYPES = {
  ANCHOR: Anchor,
  BUTTON: Button,
};

interface InternalLinkProps {
  to: string;
  ui?: typeof UI_TYPES.ANCHOR | typeof UI_TYPES.BUTTON;
  color?: ColorType,
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const InternalLink = styled(({
  className,
  to,
  ui,
  children,
  onClick,
  ...props
}: InternalLinkProps) => {
  const navigate = useNavigate();
  const Component = ui ?? UI_TYPES.ANCHOR;

  return (
    <Component
      {...props}
      className={className}
      href={to}
      label={children}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
        navigate(to);
      }}
    />
  );
})`
  white-space: nowrap;
`;

export default InternalLink;
