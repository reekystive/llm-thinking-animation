import { localStorageWithCache } from './local-storage.ts';

export const themes = ['light', 'dark', 'system'] as const;
export type Theme = (typeof themes)[number];
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
}

export const getSystemTheme = (): ResolvedTheme => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches ? 'dark' : 'light';
};

export const resolveTheme = (theme: Theme, systemTheme: ResolvedTheme): ThemeState => {
  if (theme === 'system') {
    return {
      theme: 'system',
      resolvedTheme: systemTheme,
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
  const themeState = resolveTheme(theme, getSystemTheme());
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
  const themeState = resolveTheme(theme, getSystemTheme());
  root.setAttribute('data-theme', themeState.resolvedTheme);
  root.style.setProperty('color-scheme', themeState.resolvedTheme satisfies 'light' | 'dark');
  return themeState;
};

export const getCurrentTheme = (): ThemeState => {
  const saved = localStorageWithCache.getItem('theme');
  if (!saved) {
    return resolveTheme('system', getSystemTheme());
  }
  return resolveTheme(saved, getSystemTheme());
};
