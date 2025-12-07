import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeConfig {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  isGameMode: boolean;
  systemTheme: ResolvedTheme;
}

const GAME_ROUTES = ['/game', '/character'];
const DARK_ROUTES = ['/game', '/character'];

export const useTheme = () => {
  const pathname = usePathname();
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    mode: 'auto',
    resolvedTheme: 'light',
    isGameMode: false,
    systemTheme: 'light'
  });

  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const isGameRoute = useCallback((path: string): boolean => {
    return GAME_ROUTES.some(route => path.startsWith(route));
  }, []);

  const isDarkRoute = useCallback((path: string): boolean => {
    return DARK_ROUTES.some(route => path.startsWith(route));
  }, []);

  const calculateResolvedTheme = useCallback((mode: ThemeMode, systemTheme: ResolvedTheme, path: string): ResolvedTheme => {
    if (isDarkRoute(path)) {
      return 'dark';
    }

    switch (mode) {
      case 'dark':
        return 'dark';
      case 'light':
        return 'light';
      case 'auto':
      default:
        return systemTheme;
    }
  }, [isDarkRoute]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeConfig(prev => {
      const newResolvedTheme = calculateResolvedTheme(mode, prev.systemTheme, pathname);
      const newConfig = {
        ...prev,
        mode,
        resolvedTheme: newResolvedTheme
      };
      
      if (!prev.isGameMode) {
        try {
          localStorage.setItem('theme-mode', mode);
        } catch (error) {
        }
      }
      
      return newConfig;
    });
  }, [pathname, calculateResolvedTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setThemeConfig(prev => ({
        ...prev,
        systemTheme: newSystemTheme,
        resolvedTheme: calculateResolvedTheme(prev.mode, newSystemTheme, pathname)
      }));
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [pathname, calculateResolvedTheme]);

  useEffect(() => {
    const isGame = isGameRoute(pathname);
    const systemTheme = getSystemTheme();
    
    let savedMode: ThemeMode = 'auto';
    if (!isGame) {
      try {
        savedMode = (localStorage.getItem('theme-mode') as ThemeMode) || 'auto';
      } catch (error) {
      }
    }

    const resolvedTheme = calculateResolvedTheme(savedMode, systemTheme, pathname);

    setThemeConfig({
      mode: savedMode,
      resolvedTheme,
      isGameMode: isGame,
      systemTheme
    });

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.classList.toggle('game-mode', isGame);

    if (isGame) {
      document.dispatchEvent(new CustomEvent('game-mode-enter', { 
        detail: { theme: resolvedTheme } 
      }));
    }

  }, [pathname, calculateResolvedTheme, isGameRoute, getSystemTheme]);

  return {
    theme: themeConfig.resolvedTheme,
    themeMode: themeConfig.mode,
    isGameMode: themeConfig.isGameMode,
    systemTheme: themeConfig.systemTheme,
    setThemeMode,
    
    isDark: themeConfig.resolvedTheme === 'dark',
    isLight: themeConfig.resolvedTheme === 'light',
    canToggle: !themeConfig.isGameMode,
  };
};