import { NavigationItem } from "./types";

export const getInitialSidebarState = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const savedState = localStorage.getItem('sidebar-state');
  if (savedState !== null) {
    try {
      return JSON.parse(savedState);
    } catch {
    }
  }
  
  const isDesktop = window.innerWidth >= 768;
  return isDesktop;
};

export const saveSidebarState = (isOpen: boolean): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('sidebar-state', JSON.stringify(isOpen));
  } catch (error) {
  }
};

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const filterNavItemsByPermission = (
  items: NavigationItem[],
  userPermissions: string[] = []
): NavigationItem[] => {
  return items.filter(item => {
    if (!item.path?.startsWith('/admin')) {
      return true;
    }
    
    return userPermissions.includes('admin');
  });
};

export const isRouteActive = (itemPath: string, currentPath: string): boolean => {
  if (itemPath === '/') {
    return currentPath === '/';
  }
  
  return currentPath.startsWith(itemPath);
};

export const sidebarAnimationVariants = {
  open: {
    width: 280,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  closed: {
    width: 60,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export const sidebarMobileAnimationVariants = {
  open: {
    x: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  closed: {
    x: '-100%',
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export const themeUtils = {
  save: (theme: 'light' | 'dark'): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('theme-preference', theme);
    } catch (error) {
    }
  },

  load: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';

    try {
      const saved = localStorage.getItem('theme-preference');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (error) {
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  },
  
  apply: (theme: 'light' | 'dark'): void => {
    if (typeof document === 'undefined') return;
    
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }
};