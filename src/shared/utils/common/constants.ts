export const METRO_CONFIG = {
  LINE_COLORS: {
    1: '#0052A4',
    2: '#00A84D', 
    3: '#EF7C1C',
    4: '#00A5DE',
  },
  
  REALTIME_UPDATE_INTERVAL: 30000,
} as const;

export const getLineColor = (lineNumber: number): string => {
  const colors: Record<number, string> = {
    1: METRO_CONFIG.LINE_COLORS[1],
    2: METRO_CONFIG.LINE_COLORS[2],
    3: METRO_CONFIG.LINE_COLORS[3],
    4: METRO_CONFIG.LINE_COLORS[4],
  };
  return colors[lineNumber] || '#666666';
};

export const INPUT_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  
  POST_TITLE_MIN_LENGTH: 2,
  POST_TITLE_MAX_LENGTH: 100,
  POST_CONTENT_MIN_LENGTH: 10,
  POST_CONTENT_MAX_LENGTH: 5000,
  COMMENT_MIN_LENGTH: 2,
  COMMENT_MAX_LENGTH: 1000,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SERVER_ERROR: '서버에 문제가 발생했습니다.',
  
  AUTH_REQUIRED: '로그인이 필요합니다.',
  AUTH_EXPIRED: '로그인이 만료되었습니다.',
  LOGIN_FAILED: '로그인에 실패했습니다.',
  SIGNUP_FAILED: '회원가입에 실패했습니다.',
  LOGIN_ERROR: '로그인 중 오류가 발생했습니다.',
  DEMO_LOGIN_FAILED: '데모 계정 로그인에 실패했습니다.',
  DEMO_LOGIN_ERROR: '데모 계정 로그인 중 오류가 발생했습니다.',
  TOKEN_REFRESH_FAILED: '토큰 갱신에 실패했습니다. 다시 로그인해주세요.',
  
  REQUIRED_FIELD: '필수 입력 항목입니다.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  INVALID_PASSWORD: '비밀번호가 올바르지 않습니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  
  POST_LOAD_ERROR: '게시글을 불러올 수 없습니다.',
  POST_CREATE_ERROR: '게시글 작성에 실패했습니다.',
  POST_UPDATE_ERROR: '게시글 수정에 실패했습니다.',
  POST_DELETE_ERROR: '게시글 삭제에 실패했습니다.',
  POST_PERMISSION_ERROR: '이 게시글을 수정할 권한이 없습니다.',
  
  COMMENT_CREATE_ERROR: '댓글 작성에 실패했습니다.',
  COMMENT_UPDATE_ERROR: '댓글 수정에 실패했습니다.',
  COMMENT_DELETE_ERROR: '댓글 삭제에 실패했습니다.',
  
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  PERMISSION_DENIED: '접근 권한이 없습니다.',
  CONTACT_SUPPORT: '문제가 지속되면 고객지원팀에 문의해주세요.',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '로그인되었습니다.',
  LOGOUT_SUCCESS: '로그아웃되었습니다.',
  SIGNUP_SUCCESS: '회원가입이 완료되었습니다.',
  SIGNUP_COMPLETE: '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...',
  TOKEN_REFRESHED: '인증 정보가 갱신되었습니다.',
  
  POST_CREATED: '게시글이 작성되었습니다.',
  POST_UPDATED: '게시글이 수정되었습니다.',
  POST_DELETED: '게시글이 삭제되었습니다.',
  COMMENT_CREATED: '댓글이 작성되었습니다.',
  COMMENT_UPDATED: '댓글이 수정되었습니다.',
  COMMENT_DELETED: '댓글이 삭제되었습니다.',
  
  COPIED_TO_CLIPBOARD: '클립보드에 복사되었습니다.',
} as const;

export const LOADING_MESSAGES = {
  PAGE_LOADING: '페이지를 불러오는 중...',
  LOGIN_PAGE_LOADING: '로그인 페이지를 불러오는 중...',
  ERROR_INFO_LOADING: '오류 정보를 불러오는 중...',

  POST_LOADING: '게시글을 불러오는 중...',
  POST_CREATING: '게시글을 작성하는 중...',
  POST_UPDATING: '게시글을 수정하는 중...',
  POSTS_LOADING: '최근 게시글을 불러오는 중...',

  COMMENT_LOADING: '댓글을 불러오는 중...',
  COMMENT_CREATING: '댓글을 작성하는 중...',
  COMMENT_UPDATING: '댓글을 수정하는 중...',

  LOGIN_PROCESSING: '로그인 중...',
  SIGNUP_PROCESSING: '계정 생성 중...',
  TOKEN_REFRESHING: '인증 정보 갱신 중...',

  LOADING: '불러오는 중...',
  PROCESSING: '처리 중...',
} as const;

export const CONFIRM_MESSAGES = {
  DELETE_POST: '정말로 이 게시글을 삭제하시겠습니까?',
  DELETE_COMMENT: '정말로 이 댓글을 삭제하시겠습니까?',
  LOGOUT: '로그아웃하시겠습니까?',
} as const;

export const SECURITY_CONFIG = {
  TOKEN_KEYS: {
    ACCESS: process.env.NEXT_PUBLIC_TOKEN_KEY || 'behindy_access_token',
  },

  JWT: {
    REFRESH_THRESHOLD_MINUTES: 5,
    TOKEN_TYPE: 'Bearer',
    MAX_AGE_HOURS: 24,

    ACCESS_TOKEN_LIFETIME: 15 * 60 * 1000,
    REFRESH_TOKEN_LIFETIME: 7 * 24 * 60 * 60 * 1000,
  },

  API: {
    TIMEOUT_MS: 10000,
    HTTPS_ONLY: process.env.NODE_ENV === 'production',
    WITH_CREDENTIALS: true,
  },

  COOKIE: {
    REFRESH_TOKEN_NAME: 'refreshToken',
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'strict',
    PATH: '/',
    MAX_AGE: 7 * 24 * 60 * 60,
  },
} as const;

export const validateSecurityConfig = (): void => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl && !apiUrl.startsWith('https://')) {
      console.error('Production requires HTTPS API URL:', apiUrl);
    }

    if (!SECURITY_CONFIG.API.WITH_CREDENTIALS) {
      console.error('HttpOnly Cookie requires withCredentials to be enabled');
    }
  }
};