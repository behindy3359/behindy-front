"use client";

import React from 'react';
import { LOADING_MESSAGES } from '@/shared/utils/common/constants';
import { PageContainer } from '@/shared/styles/components';
import { CommunitySection } from './styles';
import { useHomePageData } from '../hooks/useHomePageData';
import { useHomePageActions } from '../hooks/useHomePageActions';
import { MetroMapSection } from './inner/MetroMapSection';
import { CommunityHeader } from './inner/CommunityHeader';
import { PostsGrid } from './inner/PostsGrid';
import { EmptyPostsState } from './inner/EmptyPostsState';
import { ViewAllButton } from './inner/ViewAllButton';
import { ErrorState } from './inner/ErrorState';
import { CommonLoadingState } from '@/shared/styles/components';
import { MultiplayerModals } from '@/features/multiplayer/components/modals/MultiplayerModals';

export const HomePage: React.FC = () => {
  const {
    stats,
    recentPosts,
    isLoading,
    error,
  } = useHomePageData(6);

  const {
    handleWritePost,
    handleViewAllPosts,
  } = useHomePageActions();

  return (
    <>
      <PageContainer>
        <MetroMapSection />

        <CommunitySection>
        <CommunityHeader
          onWritePost={handleWritePost}
        />
        {isLoading ? (
          <CommonLoadingState>
            {LOADING_MESSAGES.POSTS_LOADING}
          </CommonLoadingState>
        ) : error ? (
          <ErrorState />
        ) : recentPosts.length > 0 ? (
          <>
            <PostsGrid posts={recentPosts} />
            <ViewAllButton onClick={handleViewAllPosts} />
          </>
        ) : (
          <EmptyPostsState onWritePost={handleWritePost} />
        )}
      </CommunitySection>
      </PageContainer>

      <MultiplayerModals />
    </>
  );
};

export default HomePage;
