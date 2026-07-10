import { lazy } from 'react';

export { default as LandingPage } from '../pages/LandingPage';

// export const LandingPage = lazy(() => import('../pages/LandingPage'));
export const CharacterPage = lazy(() => import('../pages/CharacterPage'));
export const SettingsPage = lazy(() => import('../pages/SettingsPage'));
export const ColorPalletePage = lazy(() => import('../pages/ColorPalletePage'));