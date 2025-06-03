import { useMediaQuery } from '#src/hooks/use-media-query.ts';
import { useStateWithRef } from '#src/hooks/use-state-with-ref.ts';
import { Monitor, Moon, Sun } from 'lucide-react';
import { FC, useEffect } from 'react';
import { getCurrentTheme, themes, toggleTheme, type Theme } from '../utils/theme';

export const ThemeToggle: FC = () => {
  const [theme, setTheme, themeRef] = useStateWithRef<Theme>(getCurrentTheme().theme);

  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    toggleTheme(themeRef.current);
  }, [isDark, themeRef]);

  const getNextTheme = (current: Theme): Theme => {
    const index = themes.indexOf(current);
    return themes[index + 1] ?? themes[0];
  };

  const handleThemeChangeClick = () => {
    const nextTheme = getNextTheme(theme);
    toggleTheme(nextTheme);
    setTheme(nextTheme);
  };

  const getThemeIcon = (theme: Theme) => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'system':
        return <Monitor className="h-5 w-5" />;
      default:
        theme satisfies never;
    }
  };

  const getAriaLabel = (theme: Theme) => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System theme';
      default:
        theme satisfies never;
    }
  };

  return (
    <button
      onClick={handleThemeChangeClick}
      className="flex cursor-pointer items-center justify-center rounded-full bg-gray-100 p-3 text-sm text-gray-700 transition-colors outline-none hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      aria-label={getAriaLabel(theme)}
    >
      {getThemeIcon(theme)}
    </button>
  );
};
