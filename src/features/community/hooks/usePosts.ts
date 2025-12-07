import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/config/axiosConfig';
import { PostListResponse } from '@/shared/types/community/community';
import { buildApiUrl } from '@/shared/utils/common/api';

export const usePosts = (
  page: number = 0,
  size: number = 12,
  search: string = '',
  sort: string = 'latest'
) => {
  return useQuery({
    queryKey: ['posts', page, size, search, sort],
    queryFn: async () => {
      const url = buildApiUrl.posts({ page, size });
      const response = await publicApi.getPosts<PostListResponse>(url);
      return {
        posts: response.content,
        page: response.page,
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      };
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
