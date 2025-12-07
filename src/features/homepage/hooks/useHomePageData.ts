import { useMemo } from 'react';
import { useRecentPosts } from './useRecentPosts';
import type { PostListResponse } from '@/shared/types/community/community';

export const useHomePageData = (postLimit: number = 6) => {
  const { data: postsData, isLoading, error } = useRecentPosts(postLimit);

  const stats = useMemo(() => {
    if (!postsData) {
      return {
        totalPosts: 0,
        todayPosts: 0,
        totalComments: 0,
        activeUsers: 1234
      };
    }

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const todayPostsCount = postsData.content?.filter(post => {
      const postDate = new Date(post.createdAt);
      return postDate >= todayStart;
    }).length || 0;

    return {
      totalPosts: postsData.totalElements || 0,
      todayPosts: todayPostsCount,
      activeUsers: 1234
    };
  }, [postsData]);

  const recentPosts = useMemo(() => {
    if (!postsData?.content) return [];
    return postsData.content.slice(0, postLimit);
  }, [postsData?.content, postLimit]);

  return {
    postsData,
    stats,
    recentPosts,
    isLoading,
    error,
  };
};