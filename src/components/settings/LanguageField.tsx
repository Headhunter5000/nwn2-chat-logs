import { FormField, RadioButtonGroup } from 'grommet';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const browserLang = navigator.language;

const OPTIONS: { value: string, label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
];

export const LanguageField = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const sortedOptions = useMemo(() => [...OPTIONS].sort((a, b) => {
    if (browserLang.startsWith(a.value)) return -1;
    if (browserLang.startsWith(b.value)) return 1;
    return 0;
  }), []);

  return (
    <FormField label={t('common.language')}>
      <RadioButtonGroup
        name="colorizeNames"
        direction="row"
        options={sortedOptions}
        value={i18n.resolvedLanguage}
        onChange={e => i18n.changeLanguage(e.target.value)}
      />
    </FormField>
  );
};

export default LanguageField;
