import { useMemo, useCallback, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';
import { useUIStore } from '@/shared/store/uiStore';
import { api } from '@/config/axiosConfig';
import {
  Home,
  Info,
  MessageSquare,
  User,
  LogIn,
  UserPlus,
  FileText,
  Server,
  Code,
  Bot,
  Container,
  Book,
} from 'lucide-react';
import { isRouteActive, filterNavItemsByPermission } from '../utils';
import { aboutPages } from '@/features/about/utils';
import type { NavItem } from '../types';

export const useSidebarNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { status, user, logout } = useAuthStore();
  const { sidebar, toggleSidebar } = useUIStore();
  const navigationTimeoutRef = useRef<NodeJS.Timeout>(null);

  const baseNavItems = useMemo(() => {
    const aboutIconMap: Record<string, any> = {
      overview: FileText,
      backend: Server,
      frontend: Code,
      aiserver: Bot,
      devops: Container,
      development: Book,
    };

    return [
      {
        path: '/',
        label: '홈',
        icon: Home,
      },
      {
        path: '/about',
        label: '소개',
        icon: Info,
        children: aboutPages.map((page) => ({
          path: page.path,
          label: page.label,
          icon: aboutIconMap[page.slug] || FileText,
          isActive: isRouteActive(page.path, pathname),
        })),
      },
      {
        path: '/community',
        label: '게시판',
        icon: MessageSquare,
      },
    ];
  }, [pathname]);

  const baseAccountItems = useMemo(() => {
    const isLoggedIn = status === 'authenticated' && !!user;

    const loggedInItems: NavItem[] = [
      {
        path: '/character',
        label: user?.name || '내 캐릭터',
        icon: User,
      },
      {
        path: '/logout',
        label: '로그아웃',
        icon: LogIn,
        action: 'logout',
      },
    ];

    return isLoggedIn ? loggedInItems : [
      {
        path: '/auth/login',
        label: '로그인',
        icon: LogIn,
      },
      {
        path: '/auth/signup',
        label: '회원가입',
        icon: UserPlus,
      },
    ];
  }, [status, user]);

  const navItems = useMemo(() => {
    const userPermissions = user?.permissions || [];
    return filterNavItemsByPermission(baseNavItems, userPermissions);
  }, [baseNavItems, user?.permissions]);

  const accountItems = useMemo(() => {
    const userPermissions = user?.permissions || [];
    return filterNavItemsByPermission(baseAccountItems, userPermissions);
  }, [baseAccountItems, user?.permissions]);

  const handleNavigation = useCallback(async (path?: string, action?: string) => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(async () => {
      if (action === 'logout') {
        await logout();
        router.push('/');
      } else if (path === '/character') {
        try {
          const response = await api.get<{
            success: boolean;
            message: string;
            data: any;
          }>('/characters/exists');

          if (response.success && response.data) {
            router.push('/character');
          } else {
            router.push('/character/create');
          }
        } catch (error: any) {
          if (error.response?.status === 404) {
            router.push('/character/create');
          } else {
            router.push('/character');
          }
        }
      } else if (path) {
        router.push(path);
      }

      if (window.innerWidth < 768 && sidebar.isOpen) {
        toggleSidebar();
      }
    }, 100);
  }, [logout, router, sidebar.isOpen, toggleSidebar]);

  const isActiveRoute = useCallback((path: string) => {
    return isRouteActive(path, pathname);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  return {
    navItems,
    accountItems,
    handleNavigation,
    isActiveRoute,
  };
};