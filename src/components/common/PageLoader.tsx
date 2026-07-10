import { Text } from 'grommet';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const DelayedText = styled(Text)`
  opacity: 0;
  /* Name | Dauer | Timing-Function | Delay | Fill-Mode */
  animation: fadeIn 300ms ease-in-out 300ms forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const PageLoader = () => {
  const { t } = useTranslation();
  return (
    <DelayedText margin={{ top: 'large' }}>
      {t('common.loading')}
    </DelayedText>
  );
};

export default PageLoader;
