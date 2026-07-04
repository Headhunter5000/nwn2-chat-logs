import { useNavigate } from 'react-router';
import { Anchor, Button } from 'grommet';
import styled from 'styled-components';

const UI_TYPES = {
  ANCHOR: Anchor,
  BUTTON: Button,
};

interface InternalLinkProps {
  to: string;
  ui?: typeof UI_TYPES.ANCHOR | typeof UI_TYPES.BUTTON;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}
const InternalLink = styled(({ className, to, children, ui, onClick, ...props }: InternalLinkProps) => {
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
