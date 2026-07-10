import { FormField, RadioButtonGroup } from 'grommet';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ThemeMode } from '../../types/Settings';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';

const getOptions = (t: (i18nKey: string) => string): { value: ThemeMode, label: string}[] => [
  { value: 'light', label: t('page.settings.option.theme.value.light') },
  { value: 'dark', label: t('page.settings.option.theme.value.dark') },
];

export const ThemeSettingField = () => {
  const { t } = useTranslation();
  const options = useMemo(() => getOptions(t), [t]);
  const { themeMode, setThemeMode } = useContext(SettingsContext);

  return (
    <FormField label={t('page.settings.option.theme.label')}>
      <RadioButtonGroup
        name="themeMode"
        direction="row"
        options={options}
        value={themeMode}
        onChange={e => setThemeMode(e.target.value as ThemeMode)}
      />
    </FormField>
  );
};

export default ThemeSettingField;
