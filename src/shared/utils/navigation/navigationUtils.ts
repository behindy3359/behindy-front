
export const PROTECTED_ROUTES = [
  '/game',
  '/community/write',
  '/community/[id]/edit',
  '/character',
  '/profile'
];

export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/metro',
  '/community',
  '/community/[id]',
  '/auth/login',
  '/auth/signup',
  '/auth/error',
  '/auth/forgot-password'
];

export const AUTH_ROUTES = ['/auth/login', '/auth/signup'];

export const requiresAuth = (path: string): boolean => {
  return PROTECTED_ROUTES.some(route => {
    if (route.includes('[')) {
      const pattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(path);
    }
    return path.startsWith(route);
  });
};

export const isPublicRoute = (path: string): boolean => {
  if (PUBLIC_ROUTES.includes(path)) {
    return true;
  }

  return PUBLIC_ROUTES.some(route => {
    if (route.includes('[')) {
      const pattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(path);
    }

    if (route === '/') {
      return path === '/';
    }

    if (route === '/about' || route === '/auth/login' || route === '/auth/signup' ||
        route === '/auth/error' || route === '/auth/forgot-password') {
      return path.startsWith(route);
    }

    return false;
  });
};

export const getRedirectUrl = (defaultUrl = '/'): string => {
  if (typeof window === 'undefined') return defaultUrl;
  
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  
  return defaultUrl;
};
