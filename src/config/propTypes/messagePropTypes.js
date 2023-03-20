import PropTypes from 'prop-types';

const MessagePropTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string,
  char: PropTypes.string,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessagePropTypes;
