import { FormField, RadioButtonGroup } from 'grommet';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const getOptions = (t: (i18nKey: string) => string): { value: string, label: string}[] => ([
  { value: 'en', label: t('language.en') },
  { value: 'de', label: t('language.de') },
]);

export const LanguageField = () => {
  const { t } = useTranslation();
  const options = useMemo(() => getOptions(t), [t]);
  const { i18n } = useTranslation();

  return (
    <FormField label={t('common.language')}>
      <RadioButtonGroup
        name="colorizeNames"
        direction="row"
        options={options}
        value={i18n.resolvedLanguage}
        onChange={e => i18n.changeLanguage(e.target.value)}
      />
    </FormField>
  );
};

export default LanguageField;
