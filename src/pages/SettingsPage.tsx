import { Box, FormField, RadioButtonGroup } from 'grommet';
import { useContext } from 'react';
import PageHeader from '../components/common/PageHeader';
import type { ThemeMode } from '../types/Settings';
import { SettingsContext } from '../utils/contextProviders/SettingsContext';

const THEME_MODE_OPTIONS: { value: ThemeMode, label: string}[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const COLORIZE_NAMES_OPTIONS: { value: boolean, label: string}[] = [
  { value: false, label: 'No' },
  { value: true, label: 'Yes' },
];

const SettingsPage = () => {
  const {
    themeMode,
    setThemeMode,
    colorizeNames,
    setColorizeNames,
  } = useContext(SettingsContext);
  
  return (
    <>
      <PageHeader
        title="Settings"
        hasBackLink
      />
      <Box gap="large">
        <FormField label="Theme">
          <RadioButtonGroup
            name="themeMode"
            direction="row"
            options={THEME_MODE_OPTIONS}
            value={themeMode}
            onChange={e => setThemeMode(e.target.value as ThemeMode)}
          />
        </FormField>
        <FormField label="Colorize names">
          <RadioButtonGroup
            name="colorizeNames"
            direction="row"
            options={COLORIZE_NAMES_OPTIONS}
            value={colorizeNames}
            onChange={e => setColorizeNames(e.target.value === 'true')}
          />
        </FormField>
      </Box>
    </>
  );
};

export default SettingsPage;
