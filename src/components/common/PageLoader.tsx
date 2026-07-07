import { Text } from 'grommet';
import styled from 'styled-components';

const DelayedText = styled(Text)`
  opacity: 0;
  /* Name | Dauer | Timing-Function | Delay | Fill-Mode */
  animation: fadeIn 0.3s ease-in-out 2s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const PageLoader = () =>
  <DelayedText margin={{ top: 'large' }}>Loading...</DelayedText>;

export default PageLoader;
