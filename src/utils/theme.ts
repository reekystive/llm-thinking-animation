import { localStorageWithCache } from './local-storage.ts';

export const themes = ['light', 'dark', 'system'] as const;
export type Theme = (typeof themes)[number];

export interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
}

export const resolveTheme = (theme: Theme): ThemeState => {
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const currentSystemTheme = mediaQuery.matches ? 'dark' : 'light';
    return {
      theme: 'system',
      resolvedTheme: currentSystemTheme,
    };
  }
  return {
    theme,
    resolvedTheme: theme,
  };
};

export const initTheme = (): ThemeState => {
  const saved = localStorageWithCache.getItem('theme');
  if (!saved) {
    localStorageWithCache.setItem('theme', 'system');
  }
  const theme = saved ?? 'system';
  const themeState = resolveTheme(theme);
  const root = window.document.documentElement;
  const dataTheme = root.getAttribute('data-theme');
  if (dataTheme === themeState.resolvedTheme) {
    return themeState;
  }
  root.setAttribute('data-theme', themeState.resolvedTheme);
  root.style.setProperty('color-scheme', themeState.resolvedTheme satisfies 'light' | 'dark');
  return themeState;
};

export const toggleTheme = (theme: Theme): ThemeState => {
  const root = window.document.documentElement;
  localStorageWithCache.setItem('theme', theme);
  const themeState = resolveTheme(theme);
  root.setAttribute('data-theme', themeState.resolvedTheme);
  root.style.setProperty('color-scheme', themeState.resolvedTheme satisfies 'light' | 'dark');
  return themeState;
};

export const getCurrentTheme = (): ThemeState => {
  const saved = localStorageWithCache.getItem('theme');
  if (!saved) {
    return resolveTheme('system');
  }
  return resolveTheme(saved);
};
