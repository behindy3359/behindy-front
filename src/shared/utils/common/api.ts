import { ApiError } from "@/shared/types/common";

export const apiErrorHandler = {
  parseError: (error: unknown): ApiError => {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number; data: any } };
      const { status, data } = axiosError.response;

      if (data?.message || data?.error) {
        return {
          code: status.toString(),
          message: data.message || data.error,
          details: data,
        };
      }

      const statusMessages: Record<number, string> = {
        400: '잘못된 요청입니다. 입력 정보를 확인해주세요.',
        401: '로그인이 필요하거나 인증 정보가 올바르지 않습니다.',
        403: '접근 권한이 없습니다.',
        404: '요청한 정보를 찾을 수 없습니다.',
        409: '이미 존재하는 정보입니다.',
        422: '입력 정보가 올바르지 않습니다.',
        429: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
        500: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };

      return {
        code: status.toString(),
        message: statusMessages[status] || '알 수 없는 오류가 발생했습니다.',
        details: data,
      };
    }

    if (error && typeof error === 'object' && 'code' in error &&
        (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK')) {
      return {
        code: 'NETWORK_ERROR',
        message: '네트워크 연결을 확인해주세요.',
      };
    }

    if (error instanceof Error) {
      return {
        code: 'CLIENT_ERROR',
        message: error.message || '클라이언트 오류가 발생했습니다.',
      };
    }

    if (typeof error === 'string') {
      return {
        code: 'STRING_ERROR',
        message: error,
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: '알 수 없는 오류가 발생했습니다.',
      details: error,
    };
  },

  getErrorAction: (errorCode: string): {
    action: 'retry' | 'login' | 'redirect' | 'wait';
    button?: string;
    description?: string;
  } => {
    const actions = {
      '401': {
        action: 'login' as const,
        button: '로그인하기',
        description: '로그인 후 다시 시도해주세요.',
      },
      '409': {
        action: 'login' as const,
        button: '로그인하기',
        description: '이미 가입된 이메일입니다. 로그인을 시도해보세요.',
      },
      '429': {
        action: 'wait' as const,
        button: '잠시 후 다시 시도',
        description: '잠시 기다린 후 다시 시도해주세요.',
      },
      'NETWORK_ERROR': {
        action: 'retry' as const,
        button: '다시 시도',
        description: '인터넷 연결을 확인하고 다시 시도해주세요.',
      },
    };

    return actions[errorCode as keyof typeof actions] || {
      action: 'retry',
      button: '다시 시도',
      description: '문제가 지속되면 고객지원팀에 문의해주세요.',
    };
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    DEMO_LOGIN: '/auth/demo-login',
  },

  CHARACTERS: {
    BASE: '/characters',
    CURRENT: '/characters/current',
    EXISTS: '/characters/exists',
    HISTORY: '/characters/history',
    GAME_ENTER_CHECK: '/characters/game-enter-check',
    BY_ID: (id: number) => `/characters/${id}`,
    STATS: (id: number) => `/characters/${id}/stats`,
  },

  GAME: {
    ELIGIBILITY: '/game/eligibility',
    STATUS: '/game/status',
    START: (storyId: number) => `/game/start/${storyId}`,
    RESUME: '/game/resume',
    CHOICE: (optionId: number) => `/game/choice/${optionId}`,
    QUIT: '/game/quit',
  },

  STORIES: {
    BASE: '/stories',
    BY_LINE: (lineNumber: number) => `/stories/line/${lineNumber}`,
    BY_STATION: (stationName: string) => `/stories/station/${encodeURIComponent(stationName)}`,
    BY_STATION_LINE: (stationName: string, lineNumber: number) => 
      `/stories/station/${encodeURIComponent(stationName)}/line/${lineNumber}`,
    BY_ID: (id: number) => `/stories/${id}`,
    RANDOM: '/stories/random',
    RANDOM_BY_LINE: (lineNumber: number) => `/stories/random/line/${lineNumber}`,
    BY_DIFFICULTY: (difficulty: string) => `/stories/difficulty/${difficulty}`,
  },

  POSTS: {
    BASE: '/posts',
    BY_ID: (id: number) => `/posts/${id}`,
  },

  COMMENTS: {
    BASE: '/comments',
    BY_ID: (id: number) => `/comments/${id}`,
    BY_POST: (postId: number) => `/comments/posts/${postId}`,
    MY_COMMENTS: '/comments/my',
    LIKE: (id: number) => `/comments/${id}/like`,
  },
} as const;

export const AI_ENDPOINTS = {
  STORY: {
    GENERATE: '/story/generate',
    VALIDATE: '/story/validate',
  },
} as const;

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface CharacterStatsParams {
  healthChange?: number;
  sanityChange?: number;
}

export interface RandomStoriesParams {
  count?: number;
}

export class ApiUrlBuilder {
  private baseUrl: string;
  private params: URLSearchParams;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.params = new URLSearchParams();
  }

  addParam(key: string, value: string | number | boolean | undefined): this {
    if (value !== undefined) {
      this.params.append(key, value.toString());
    }
    return this;
  }

  addPagination(pagination?: PaginationParams): this {
    if (pagination) {
      if (pagination.page !== undefined) this.addParam('page', pagination.page);
      if (pagination.size !== undefined) this.addParam('size', pagination.size);
    }
    return this;
  }

  addCharacterStats(stats?: CharacterStatsParams): this {
    if (stats) {
      if (stats.healthChange !== undefined) this.addParam('healthChange', stats.healthChange);
      if (stats.sanityChange !== undefined) this.addParam('sanityChange', stats.sanityChange);
    }
    return this;
  }

  build(): string {
    const paramString = this.params.toString();
    return paramString ? `${this.baseUrl}?${paramString}` : this.baseUrl;
  }
}

export const buildApiUrl = {
  posts: (pagination?: PaginationParams) => 
    new ApiUrlBuilder(API_ENDPOINTS.POSTS.BASE).addPagination(pagination).build(),

  commentsByPost: (postId: number, pagination?: PaginationParams) => 
    new ApiUrlBuilder(API_ENDPOINTS.COMMENTS.BY_POST(postId)).addPagination(pagination).build(),

  myComments: (pagination?: PaginationParams) => 
    new ApiUrlBuilder(API_ENDPOINTS.COMMENTS.MY_COMMENTS).addPagination(pagination).build(),

  characterStats: (charId: number, stats?: CharacterStatsParams) => 
    new ApiUrlBuilder(API_ENDPOINTS.CHARACTERS.STATS(charId)).addCharacterStats(stats).build(),

  randomStories: (params?: RandomStoriesParams) =>
    new ApiUrlBuilder(API_ENDPOINTS.STORIES.RANDOM).addParam('count', params?.count).build(),

  randomStoriesByLine: (lineNumber: number, params?: RandomStoriesParams) =>
    new ApiUrlBuilder(API_ENDPOINTS.STORIES.RANDOM_BY_LINE(lineNumber)).addParam('count', params?.count).build(),
};

export default API_ENDPOINTS;
