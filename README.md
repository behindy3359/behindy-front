# Behindy Frontend

서울 지하철 역을 배경으로 한 텍스트 어드벤처 게임의 프론트엔드 애플리케이션입니다. 사용자는 지하철 역을 선택하여 해당 역의 특성과 분위기를 반영한 인터랙티브 스토리를 경험할 수 있으며, 커뮤니티 기능을 통해 다른 플레이어들과 소통할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 15.3.8
- **Language**: TypeScript 5
- **UI Library**: React 19.2
- **Styling**: styled-components 6.1
- **State Management**: Zustand 5.0
- **Data Fetching**: React Query 5.80
- **Form Management**: React Hook Form 7.57 + Yup 1.6 + Hookform Resolvers 5.1
- **WebSocket**: STOMP.js 7.2 + SockJS Client 1.6

## 주요 기능

### 인증
- JWT 기반 로그인/회원가입
- 자동 토큰 갱신
- 로그인 상태 유지

### 게임 플레이
- 서울 지하철 역 및 호선 선택
- AI 기반 실시간 스토리 생성
- 선택지를 통한 스토리 분기
- 캐릭터 스탯 관리 (HP, Sanity)
- 게임 진행 기록 저장 및 조회
- WebSocket 기반 실시간 멀티플레이어 지원

### 커뮤니티
- 게시글 CRUD (작성, 조회, 수정, 삭제)
- 댓글 시스템
- Markdown 문법 지원
- 좋아요 기능

### UI/UX
- 반응형 디자인 (모바일/태블릿/데스크톱)
- Framer Motion 애니메이션 효과
- Loading 및 Skeleton UI
- Error Boundary

## 환경 변수

```bash
# API 엔드포인트
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_AI_URL=http://localhost:8000

# 개발 모드
NEXT_PUBLIC_DEV_MODE=true

# 로깅
NEXT_PUBLIC_LOG_LEVEL=debug

# 토큰 키
NEXT_PUBLIC_TOKEN_KEY=access_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=refresh_token

# 앱 정보
NEXT_PUBLIC_APP_NAME=Behindy
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 로컬 개발

### 요구사항
- Node.js 18+
- npm 또는 yarn

### 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

현재 이 프로젝트에서는 테스트 스크립트를 제공하지 않습니다.

개발 서버는 `http://localhost:3000`에서 실행됩니다.

## Docker 빌드

```bash
# 이미지 빌드
docker build -t behindy-frontend \
  --build-arg NEXT_PUBLIC_API_URL=http://api.example.com \
  --build-arg NEXT_PUBLIC_AI_URL=http://ai.example.com \
  .

# 컨테이너 실행
docker run -p 3000:3000 behindy-frontend
```

## 배포

GitHub Actions를 통한 자동 배포:

1. `main` 브랜치에 push
2. 자동으로 Docker 이미지 빌드
3. EC2 서버에 배포 및 재시작

자세한 내용은 `.github/workflows/deploy.yml` 참조

모든 빌드 단계는 GitHub Actions가 구성한 Docker 네트워크에서 실행되며 필요한 환경 변수는 저장소 시크릿으로 주입됩니다.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (game)/            # 게임 관련 페이지
│   ├── (community)/       # 커뮤니티 페이지
│   ├── character/         # 캐릭터 관리
│   ├── multiplayer/       # 멀티플레이 기능
│   ├── about/             # 소개 및 문서
│   └── layout.tsx         # 루트 레이아웃
├── features/              # 기능별 모듈 (도메인 기반)
│   ├── auth/             # 인증
│   ├── game/             # 게임 플레이
│   ├── community/        # 커뮤니티
│   ├── metro/            # 지하철 정보
│   ├── multiplayer/      # 멀티플레이 WebSocket
│   ├── homepage/         # 홈페이지
│   └── about/            # 소개 페이지
├── shared/               # 공통 모듈
│   ├── components/       # 공통 UI 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── store/           # Zustand 상태관리
│   ├── providers/       # Context/Provider
│   ├── utils/           # 유틸리티 함수
│   ├── types/           # 타입 정의
│   └── styles/          # 전역 스타일 및 테마
├── config/              # 설정 파일
├── middleware.ts        # Next.js 미들웨어
└── test/               # 테스트 설정
```

## 코드 컨벤션

### 컴포넌트
- PascalCase 사용
- 한 파일당 하나의 컴포넌트
- Props 타입 정의 필수

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
```

### Hooks
- `use` 접두사 사용
- 커스텀 훅은 `shared/hooks/` 에 위치

```tsx
export function useAuth() {
  const [user, setUser] = useState(null)
  // ...
  return { user, login, logout }
}
```

### API 클라이언트
- React Query 사용
- `shared/api/` 에 위치

```tsx
export function useGameStatus() {
  return useQuery({
    queryKey: ['game', 'status'],
    queryFn: () => api.get('/api/game/status'),
  })
}
```

## 성능 최적화

- Next.js Image 컴포넌트 사용 (AVIF, WebP 포맷 지원)
- 동적 import를 통한 코드 스플리팅
- React Query 캐싱 전략
- 메모이제이션 (useMemo, useCallback)
- Bundle Analyzer 지원 (`npm run build:analyze`)
- 주요 라이브러리 최적화 (lucide-react, framer-motion, @tanstack/react-query)
- 메모리 할당 최적화 (4GB heap size)

## 아키텍처

- Frontend: Next.js 기반 UI 레이어
- Backend: Spring Boot 기반 API 서버 및 비즈니스 로직
- Story (LLM Server): FastAPI 기반 AI 스토리 생성 서버
- Ops: Docker Compose 기반 인프라 관리

## 관련 레포지토리

- [behindy-back](https://github.com/behindy3359/behindy-back) - Spring Boot 백엔드 API 서버
- [behindy-story](https://github.com/behindy3359/behindy-story) - FastAPI AI 스토리 생성 서버
- [behindy-ops](https://github.com/behindy3359/behindy-ops) - 인프라 관리 (PostgreSQL, Redis, Nginx)
