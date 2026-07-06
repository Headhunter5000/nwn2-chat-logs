import { useCallback, useState } from 'react';
import type { ThemeMode } from '../../types/Settings';
import { SettingsContext } from './SettingsContext';

interface SettingsProps {
  themeMode: ThemeMode;
  colorizeNames: boolean;
}

const DEFAULT_SETTINGS: SettingsProps = {
  themeMode: 'light',
  colorizeNames: true,
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

  const { themeMode, colorizeNames } = settings;

  const setPersistedSettings = useCallback(
    (partialSettings: Record<string, unknown>) => {
      setSettings(previousState => {
        const nextSettings = {
          ...previousState,
          ...partialSettings,
        };
        storePersistedSettings(nextSettings);
        return nextSettings;
      });
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

  const setColorizeNames = useCallback(
    (nextColorizeNames: boolean) =>
      setPersistedSettings({
        colorizeNames: nextColorizeNames,
      }),
    [setPersistedSettings],
  );

  return (
    <SettingsContext.Provider value={{
      themeMode,
      setThemeMode,
      colorizeNames,
      setColorizeNames,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};