import { createContext } from 'react';
import type { ThemeMode } from '../../types/Settings';

interface SettingsContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const SettingsContext = createContext<SettingsContextValue>({
  themeMode: 'light',
  setThemeMode: () => {},
});