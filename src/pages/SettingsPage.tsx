import { Box } from 'grommet';
import PageHeader from '../components/common/PageHeader';
import ColorizeNamesField from '../components/settings/ColorizeNamesField';
import ThemeSettingField from '../components/settings/ThemeSettingField';

const SettingsPage = () => (
  <>
    <PageHeader
      title="Settings"
      subtitle={`v${__APP_VERSION__}`}
      backLink
    />
    <Box gap="large">
      <ThemeSettingField />
      <ColorizeNamesField />
    </Box>
  </>
);

export default SettingsPage;
