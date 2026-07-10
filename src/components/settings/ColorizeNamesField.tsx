import { FormField, RadioButtonGroup } from 'grommet';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';

const getOptions = (t: (i18nKey: string) => string): { value: boolean, label: string}[] => ([
  { value: false, label: t('common.no') },
  { value: true, label: t('common.yes') },
]);

export const ColorizeNamesField = () => {
  const { t } = useTranslation();
  const options = useMemo(() => getOptions(t), [t]);
  const { colorizeNames, setColorizeNames } = useContext(SettingsContext);

  return (
    <FormField label={t('page.settings.option.colorize_names.label')}>
      <RadioButtonGroup
        name="colorizeNames"
        direction="row"
        options={options}
        value={colorizeNames}
        onChange={e => setColorizeNames(e.target.value === 'true')}
      />
    </FormField>
  );
};

export default ColorizeNamesField;
