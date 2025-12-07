"use client";

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from '@/shared/components/layout/applayout/AppLayout';
import { HomePage } from '@/features/homepage/components/HomePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('game-mode');
    document.body.setAttribute('data-theme', 'light');
    document.body.classList.remove('game-mode');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <HomePage />
      </AppLayout>
    </QueryClientProvider>
  );
}
