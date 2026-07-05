import { FormField, Heading, RadioButtonGroup } from 'grommet';
import { useContext } from 'react';
import type { ThemeMode } from '../types/Settings';
import { SettingsContext } from '../utils/contextProviders/SettingsContext';

const THEME_MODE_OPTIONS: ThemeMode[] = [
  'light', 'dark',
];

const SettingsPage = () => {
  const { themeMode, setThemeMode } =  useContext(SettingsContext);
  return (
    <>
      <Heading level="3" margin={{ top: 'large' }}>Settings</Heading>
      <FormField label="Theme">
        <RadioButtonGroup
          name="mode"
          direction="row"
          options={THEME_MODE_OPTIONS}
          value={themeMode}
          onChange={e => setThemeMode(e.target.value as ThemeMode)}
        />
      </FormField>
    </>
  );
};

export default SettingsPage;
