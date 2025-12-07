
import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { useUIStore } from '@/shared/store/uiStore';
import { useAutoTheme } from '@/shared/hooks/useAutoTheme';
import { AppLayoutProps } from './types';
import { ContentArea, LayoutContainer, MainContent } from './styles';

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className,
  layoutType = 'sidebar'
}) => {
  const { sidebar } = useUIStore();
  const [isMobile, setIsMobile] = React.useState(false);

  const { isGameMode } = useAutoTheme();

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-theme', 'light');
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <LayoutContainer className={className}>
      {layoutType === 'sidebar' && <Sidebar />}

      <MainContent
        $sidebarOpen={sidebar.isOpen}
        $isMobile={isMobile}
        $layoutType={layoutType}
        $isGameMode={isGameMode}
      >
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};