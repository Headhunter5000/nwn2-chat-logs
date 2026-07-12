import { Anchor, Button } from 'grommet';
import type { ColorType } from 'grommet/utils';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface InternalLinkProps {
  to: string;
  ui?: typeof Anchor | typeof Button;
  color?: ColorType,
  icon?: React.ReactNode;
  plain?: boolean;
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
  const Component = ui ?? Anchor;

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
