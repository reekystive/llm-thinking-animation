import { useEventCallback } from '#src/hooks/use-event-callback.ts';
import { useMediaQuery } from '#src/hooks/use-media-query.ts';
import { useStateWithRef } from '#src/hooks/use-state-with-ref.ts';
import { Moon, Sun } from 'lucide-react';
import { FC, useEffect } from 'react';
import { getCurrentTheme, ResolvedTheme, resolveTheme, toggleTheme, type Theme } from '../utils/theme';

export const ThemeToggle: FC = () => {
  const [theme, setTheme, themeRef] = useStateWithRef<Theme>(getCurrentTheme().theme);

  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const systemTheme = isDark ? 'dark' : 'light';
  const { resolvedTheme } = resolveTheme(theme, systemTheme);

  const updateTheme = useEventCallback((selectedTheme: 'light' | 'dark') => {
    const systemTheme = isDark ? 'dark' : 'light';
    const isSelectedThemeSameAsSystem = selectedTheme === systemTheme;
    if (isSelectedThemeSameAsSystem) {
      toggleTheme('system');
      setTheme('system');
    } else {
      toggleTheme(selectedTheme);
      setTheme(selectedTheme);
    }
  });

  useEffect(() => {
    updateTheme(resolvedTheme);
  }, [isDark, themeRef, updateTheme, resolvedTheme]);

  const getNextTheme = (current: ResolvedTheme): ResolvedTheme => {
    const nextTheme = current === 'light' ? 'dark' : 'light';
    return nextTheme;
  };

  const handleThemeChangeClick = () => {
    const nextTheme = getNextTheme(resolvedTheme);
    updateTheme(nextTheme);
  };

  const getThemeIcon = (theme: ResolvedTheme) => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      default:
        theme satisfies never;
    }
  };

  const getAriaLabel = (theme: ResolvedTheme) => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      default:
        theme satisfies never;
    }
  };

  return (
    <button
      onClick={handleThemeChangeClick}
      className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-3 text-sm text-gray-700 transition-colors outline-none hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      aria-label={getAriaLabel(resolvedTheme)}
    >
      {getThemeIcon(resolvedTheme)}
    </button>
  );
};
