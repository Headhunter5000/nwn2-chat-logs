import { useCallback, useState } from 'react';
import type { ThemeMode } from '../../types/Settings';
import { SettingsContext } from './SettingsContext';

interface SettingsProps {
  themeMode: ThemeMode;
}

const DEFAULT_SETTINGS: SettingsProps = {
  themeMode: 'light',
};

const fetchPersistedSettings = () => {
  const settings = localStorage?.getItem('settings');

  return {
    ...DEFAULT_SETTINGS,
    ...(settings ? JSON.parse(settings) : {}),
  };
};

const storePersistedSettings = (nextSettings: SettingsProps) => {
  localStorage?.setItem('settings', JSON.stringify(nextSettings));
};

export const SettingsProvider = ({ children }: { children? : React.ReactNode} ) => {
  const [settings, setSettings] = useState<SettingsProps>(fetchPersistedSettings());

  const { themeMode } = settings;

  const setPersistedSettings = useCallback(
    (nextSettings: SettingsProps) => {
      storePersistedSettings(nextSettings);
      setSettings(previousState => ({
        ...previousState,
        ...nextSettings,
      }));
    },
    [setSettings],
  );

  const setThemeMode = useCallback(
    (nextThemeMode: ThemeMode) =>
      setPersistedSettings({
        themeMode: nextThemeMode,
      }),
    [setPersistedSettings],
  );

  return (
    <SettingsContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </SettingsContext.Provider>
  );
};