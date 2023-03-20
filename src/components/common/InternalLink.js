import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Anchor, Button } from 'grommet';
import { createElement } from 'react';
import styled from 'styled-components';

const UI_TYPES = {
  ANCHOR: Anchor,
  BUTTON: Button,
};

const InternalLink = styled(({ className, to, children, ui, onClick, ...props }) => {
  const navigate = useNavigate();

  return createElement(ui, {
    ...props,
    className,
    href: to,
    label: children,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      if (onClick) onClick();
      navigate(to);
    },
  });
})`
  white-space: nowrap;
`;

InternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  ui: PropTypes.oneOf(Object.values(UI_TYPES)),
  children: PropTypes.node,
  onClick: PropTypes.func,
};

InternalLink.defaultProps = {
  ui: UI_TYPES.ANCHOR,
  children: undefined,
  onClick: undefined,
};

export default InternalLink;
