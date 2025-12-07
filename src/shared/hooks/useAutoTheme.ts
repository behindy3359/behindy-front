import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GAME_ROUTES = ['/character'];

export const gameThemeControls = {
  enableGameMode: () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('game-mode');
    document.body.setAttribute('data-theme', 'dark');
  },
  
  disableGameMode: () => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('game-mode');
    document.body.setAttribute('data-theme', 'light');
  },
  
  getCurrentTheme: () => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};

export const useAutoTheme = () => {
  const pathname = usePathname();

  useEffect(() => {
    gameThemeControls.disableGameMode();
  }, [pathname]);

  const isGameMode = false;
  
  return {
    isGameMode,
    theme: 'light'
  };
};