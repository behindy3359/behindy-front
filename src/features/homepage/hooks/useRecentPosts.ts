import { publicApi } from "@/config/axiosConfig";
import { PostListResponse } from "@/shared/types/community/community";
import { buildApiUrl } from "@/shared/utils/common/api";
import { useQuery } from "@tanstack/react-query";

export const useRecentPosts = (limit: number = 6) => {
  return useQuery({
    queryKey: ['recent-posts', limit],
    queryFn: async () => {
      const url = buildApiUrl.posts({ page: 0, size: limit });
      const response = await publicApi.getPosts<PostListResponse>(url);
      return {
        posts: response.content,
        content: response.content,
        page: response.page,
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      };
    },
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};