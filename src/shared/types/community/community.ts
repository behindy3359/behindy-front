export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  viewCount: number;
  commentCount: number;
  editable: boolean;
  deletable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostListResponse {
  content: Post[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  first: boolean;
  last: boolean;
}

export interface CreateCommentRequest {
  content: string;
  postId: number;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  authorName: string;
  authorId: number;
  editable: boolean;
  deletable: boolean;
  likeCount?: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentListResponse {
  comments: Comment[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  first?: boolean;
  last?: boolean;
}

export interface PostSearchRequest {
  query?: string;
  category?: string;
  authorId?: number;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface PostStats {
  totalPosts: number;
  todayPosts: number;
  totalComments: number;
  totalViews: number;
  activeUsers: number;
  popularTags: Array<{
    name: string;
    count: number;
  }>;
}

export interface CommentStats {
  totalComments: number;
  todayComments: number;
  averageCommentsPerPost: number;
}

export interface UserActivity {
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
  joinDate: string;
  lastActivity: string;
}