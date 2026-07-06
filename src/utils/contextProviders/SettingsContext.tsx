import { createContext } from 'react';
import type { ThemeMode } from '../../types/Settings';

interface SettingsContextValue {
  themeMode: ThemeMode;
  setThemeMode: (_: ThemeMode) => void;
  colorizeNames: boolean;
  setColorizeNames: (_: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextValue>({
  themeMode: 'light',
  setThemeMode: () => {},
  colorizeNames: true,
  setColorizeNames: () => {},
});