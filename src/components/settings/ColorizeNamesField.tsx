import { FormField, RadioButtonGroup } from 'grommet';
import { useContext } from 'react';
import { SettingsContext } from '../../utils/contextProviders/SettingsContext';

const COLORIZE_NAMES_OPTIONS: { value: boolean, label: string}[] = [
  { value: false, label: 'No' },
  { value: true, label: 'Yes' },
];

export const ColorizeNamesField = () => {
  const {
    colorizeNames,
    setColorizeNames,
  } = useContext(SettingsContext);
  return (
    <FormField label="Colorize names">
      <RadioButtonGroup
        name="colorizeNames"
        direction="row"
        options={COLORIZE_NAMES_OPTIONS}
        value={colorizeNames}
        onChange={e => setColorizeNames(e.target.value === 'true')}
      />
    </FormField>
  );
};

export default ColorizeNamesField;
