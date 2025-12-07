import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ModalState, ToastState, LoadingState } from '@/shared/types/common';

interface UIState {
  modal: ModalState;
  toasts: ToastState[];
  globalLoading: LoadingState;
  sidebar: {
    isOpen: boolean;
    activeTab: string | null;
  };
  theme: {
    isDark: boolean;
    mode: 'light' | 'dark' | 'system';
  };
}

interface UIActions {
  openModal: (modal: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
  
  showToast: (toast: Omit<ToastState, 'id' | 'isVisible'>) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  
  setGlobalLoading: (loading: boolean, message?: string) => void;
  
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarTab: (tab: string | null) => void;
  
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark' | 'system') => void;
}

type UIStore = UIState & UIActions;

const getInitialSidebarState = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const savedState = localStorage.getItem('sidebar-state');
  if (savedState !== null) {
    return JSON.parse(savedState);
  }
  
  const isDesktop = window.innerWidth >= 768;
  return isDesktop;
};

const initialUIState: UIState = {
  modal: {
    isOpen: false,
    type: 'info',
  },
  toasts: [],
  globalLoading: {
    isLoading: false,
  },
  sidebar: {
    isOpen: getInitialSidebarState(),
    activeTab: null,
  },
  theme: {
    isDark: false,
    mode: 'light',
  },
};

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialUIState,

        openModal: (modal) => {
          set({
            modal: {
              ...modal,
              isOpen: true,
            },
          });
        },

        closeModal: () => {
          set({
            modal: {
              isOpen: false,
              type: 'info',
            },
          });
        },

        showToast: (toast) => {
          const id = Date.now().toString();
          const newToast: ToastState = {
            ...toast,
            id,
            isVisible: true,
            duration: toast.duration || 3000,
          };

          set((state) => ({
            toasts: [...state.toasts, newToast],
          }));

          setTimeout(() => {
            get().hideToast(id);
          }, newToast.duration);
        },

        hideToast: (id) => {
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          }));
        },

        clearToasts: () => {
          set({ toasts: [] });
        },

        setGlobalLoading: (isLoading, message) => {
          set({
            globalLoading: {
              isLoading,
              message,
            },
          });
        },

        toggleSidebar: () => {
          set((state) => {
            const newIsOpen = !state.sidebar.isOpen;
            
            if (typeof window !== 'undefined') {
              localStorage.setItem('sidebar-state', JSON.stringify(newIsOpen));
            }
            
            return {
              sidebar: {
                ...state.sidebar,
                isOpen: newIsOpen,
              },
            };
          });
        },

        setSidebarOpen: (isOpen) => {
          set((state) => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('sidebar-state', JSON.stringify(isOpen));
            }
            
            return {
              sidebar: {
                ...state.sidebar,
                isOpen,
              },
            };
          });
        },

        setSidebarTab: (tab) => {
          set((state) => ({
            sidebar: {
              ...state.sidebar,
              activeTab: tab,
            },
          }));
        },

        toggleTheme: () => {
          set((state) => ({
            theme: {
              ...state.theme,
              isDark: !state.theme.isDark,
              mode: state.theme.isDark ? 'light' : 'dark',
            },
          }));
        },

        setTheme: (mode) => {
          set((state) => ({
            theme: {
              ...state.theme,
              mode,
              isDark: mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
            },
          }));
        },
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          sidebar: {
            isOpen: state.sidebar.isOpen,
            activeTab: state.sidebar.activeTab,
          },
          theme: state.theme,
        }),
      }
    ),
    { name: 'ui-store' }
  )
);

export const useSidebar = () => {
  const { sidebar, toggleSidebar, setSidebarOpen, setSidebarTab } = useUIStore();
  return {
    ...sidebar,
    toggle: toggleSidebar,
    open: () => setSidebarOpen(true),
    close: () => setSidebarOpen(false),
    setTab: setSidebarTab,
  };
};

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useUIStore();
  return {
    ...theme,
    toggle: toggleTheme,
    setMode: setTheme,
  };
};

export const useToast = () => {
  const { showToast, hideToast, clearToasts } = useUIStore();
  return {
    show: showToast,
    hide: hideToast,
    clear: clearToasts,
    success: (message: string) => showToast({ type: 'success', message }),
    error: (message: string) => showToast({ type: 'error', message }),
    info: (message: string) => showToast({ type: 'info', message }),
    warning: (message: string) => showToast({ type: 'warning', message }),
  };
};