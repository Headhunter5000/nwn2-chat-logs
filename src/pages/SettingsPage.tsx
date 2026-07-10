import { Box } from 'grommet';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/common/PageHeader';
import ColorizeNamesField from '../components/settings/ColorizeNamesField';
import LanguageField from '../components/settings/LanguageField';
import ThemeSettingField from '../components/settings/ThemeSettingField';

const SettingsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        title={t('page.settings.heading')}
        subtitle={`v${__APP_VERSION__}`}
        backLink
      />
      <Box gap="large">
        <LanguageField />
        <ThemeSettingField />
        <ColorizeNamesField />
      </Box>
    </>
  );
};

export default SettingsPage;
