import { FormField, RadioButtonGroup } from 'grommet';
import { useContext } from 'react';
import type { ThemeMode } from '../../types/Settings';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';

const THEME_MODE_OPTIONS: { value: ThemeMode, label: string}[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export const ThemeSettingField = () => {
  const {
    themeMode,
    setThemeMode,
  } = useContext(SettingsContext);
  return (
    <FormField label="Theme">
      <RadioButtonGroup
        name="themeMode"
        direction="row"
        options={THEME_MODE_OPTIONS}
        value={themeMode}
        onChange={e => setThemeMode(e.target.value as ThemeMode)}
      />
    </FormField>
  );
};

export default ThemeSettingField;
