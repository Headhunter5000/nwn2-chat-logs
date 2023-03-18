import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Anchor, Button } from 'grommet';
import { createElement } from 'react';

const UI_TYPES = {
  ANCHOR: Anchor,
  BUTTON: Button,
};

const InternalLink = ({ to, children, ui, ...props }) => {
  const navigate = useNavigate();

  return createElement(ui, {
    ...props,
    href: to,
    label: children,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      navigate(to);
    },
  });
};

InternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  ui: PropTypes.oneOf(Object.values(UI_TYPES)),
  children: PropTypes.node,
};

InternalLink.defaultProps = {
  ui: UI_TYPES.ANCHOR,
  children: undefined,
};

export default InternalLink;
