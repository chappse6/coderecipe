# TODOS — CodeRecipe Deferred Items

Items deferred from the 2026-04-02 MVP CEO review. Not in the current PR.

## Phase 2: 프롬프트 빌더 고도화 + MCP 통합

### 2-1. 프롬프트 빌더 정교화

| Item | Effort | Notes |
|------|--------|-------|
| 선택지 고도화 — 질문 확장 | L | 프로젝트명, 디자인 분위기(깔끔/귀여운/고급/다크), 메인 색상, 페이지 구성, 타겟 사용자, 실제 콘텐츠(업종/브랜드명/소개문구) 등 추가. 필수 질문은 최소로 + "더 자세히 설정하기" 토글 뒤에 선택 질문 숨기기 |
| 이탈 방지 — 프리텍스트 모드 | M | 선택지가 지겨워서 이탈하려는 사용자에게 "자유롭게 설명하기" 모드 제공. 프리텍스트 입력 → 기존 프롬프트 템플릿에 자동 매핑하여 결과 생성. 또는 완성된 템플릿 예시를 보여줘서 바로 복사할 수 있게 |
| 이탈 방지 — 템플릿 갤러리 | M | "카페 홈페이지", "포트폴리오", "Todo 앱" 등 완성된 프롬프트 예시를 카드로 보여줌. 클릭하면 바로 복사 가능. 선택지를 안 거쳐도 결과를 얻을 수 있는 지름길 |
| 프롬프트 유연화 | M | 현재 프롬프트가 너무 정형화돼 있음. 사용자 입력에 따라 톤/구조가 유동적으로 바뀌도록 개선. 선택지가 적으면 간결한 프롬프트, 많으면 상세한 프롬프트. 고정 섹션(작업 방식/개발 지침) 대신 맥락에 맞게 동적 구성 |
| 프로젝트 유형별 선택지 재설계 | M | 현재 선택지가 범용적이라 연관도 낮음. 유형별로 실제 필요한 기능만 정밀하게 매핑 (예: webapp → 인증/DB/결제/배포, chatbot → 대화 흐름/API키/톤 설정 등) |
| "다음에 뭐 할까?" 후속 가이드 | S | 프롬프트 생성 결과에 다음 단계 제안 추가 (예: "프롬프트를 Claude Code에 붙여넣었나요? → 에러가 나면 에러 번역기를 써보세요") |

### 2-2. MCP 환경 설정 통합

| Item | Effort | Notes |
|------|--------|-------|
| 환경 진단에 MCP 설정 단계 추가 | M | `/setup` 플로우에 "Claude Code에 CodeRecipe MCP 플러그인 등록하기" 단계 포함. 설정 JSON 복사 버튼 제공 |
| 프롬프트에 MCP 전제 반영 | M | MCP 설정 완료 전제하에 프롬프트 자동 조정 — `translate_error`, `build_prompt` 도구가 있다는 맥락을 프롬프트에 포함. 에러 발생 시 자동 번역, plan 실행 등을 Claude가 알아서 활용하도록 |

### 2-3. MCP 고도화 — plan 기반 개발 흐름

| Item | Effort | Notes |
|------|--------|-------|
| `generate_plan` MCP 도구 | L | 프롬프트 → 단계별 구현 계획(plan) 생성. 각 단계에 에러 코드 정의, 엣지 케이스, 테스트 항목 등 초보자가 놓칠 부분을 포함 |
| `execute_step` MCP 도구 | L | plan의 각 단계를 실행하고 결과 보고. 완료 후 "다음에 뭐 할까?" 형태로 후속 단계 제안 |
| MCP 전용 기능 확장 | M | shared 함수 래퍼 수준 탈피. 에러 자동 감지/번역, 실시간 환경 체크, 컨텍스트 기반 제안 등 MCP에서만 가능한 기능 구현 |

### 2-4. 웹 ↔ MCP 연결 (장기)

| Item | Effort | Notes |
|------|--------|-------|
| 공유 세션/상태 저장소 설계 | L | MCP에서 입력한 값(프로젝트 설정, 진행 상태)을 웹에서도 조회 가능하게. 방안: (1) 로컬 JSON 파일 기반 — MCP가 `~/.coderecipe/session.json`에 기록, 웹이 읽기 (2) Supabase 등 원격 DB — 기기 간 동기화 가능 (3) WebSocket/SSE — 실시간 양방향 |
| 웹 대시보드: MCP 활동 뷰 | XL | MCP 커맨드로 생성한 프로젝트, 진행 상태, 에러 히스토리를 웹에서 시각화. 초보자가 "내가 뭘 만들고 있는지" 한눈에 파악 |
| 양방향 흐름 | XL | 웹에서 시작 → MCP가 실행, MCP에서 작업 → 웹에서 결과 확인. 어느 쪽에서 시작해도 동일한 경험 |

**연결 아키텍처:**
- 웹(브라우저)은 로컬 파일 접근 불가 → 중간 저장소 필수
- 구조: `웹 ←→ Supabase/KV ←→ MCP`
- MCP가 작업 시 원격 DB에 상태 기록 → 웹이 조회/표시
- 웹에서 설정한 값을 DB에 저장 → MCP 실행 시 DB에서 읽기
- 유저 식별: MCP 초기 설정 시 토큰/닉네임 발급, 웹 로그인과 연동
- **1단계**: Supabase 무료 티어 (PostgreSQL + Realtime) — 빠르게 검증 가능
- **2단계**: 필요 시 자체 API 서버로 전환

## Phase 3: 배포 가이드 + 후속 안내

| Item | Effort | Notes |
|------|--------|-------|
| 배포하기 페이지 (`/deploy`) | M | Vercel/Netlify/GitHub Pages 무료 배포 방법을 단계별로 안내. "내 컴퓨터 → 인터넷" 비유. 각 서비스별 스크린샷 + 복붙 가능한 명령어 포함. |
| "다음에 뭐 하지?" 후속 가이드 | S | 첫 프로젝트 완성 후 할 수 있는 것들: 기능 추가, 디자인 변경, 도메인 연결, 배포 등. 프롬프트 결과 페이지 또는 별도 섹션. |

## Phase 4: 앱 레이아웃 분리 (랜딩 vs 대시보드)

MVP 이후 홍보용 랜딩과 기능 사용 화면을 분리한다.

### 현재 문제
- `/` 한 페이지에 홍보(히어로, 3단계 설명)와 도구(카드 6개)가 섞여 있음
- 처음 온 사람: 도구 카드가 뭔지 모름. 기존 유저: 히어로가 필요 없음
- 두 역할을 한 페이지에 합치면 둘 다 애매해짐

### 목표 구조

**`/` (랜딩 페이지)** — 처음 온 사람 전용
- 히어로 + CTA → `/app`으로 이동
- Before/After 데모, 타겟 페르소나, 만들 수 있는 것 예시
- 3단계 설명, FAQ 하이라이트
- 푸터
- 한번 보고 나면 다시 안 오는 페이지

**`/app` (대시보드)** — 기존 유저 전용, 사이드바 레이아웃
- 왼쪽 사이드바: 기능 목록 (환경진단, 가이드, 레시피, 에러번역기, 용어사전, FAQ)
- 오른쪽 메인: 선택한 기능의 콘텐츠
- 참고 이미지: Clarity 앱 스타일 (사이드바 + 메인 콘텐츠)
- 기존 유저는 `/app` 북마크해서 바로 진입

### 구현 계획

**Step 1: 라우팅 구조 변경**
- `apps/web/src/app/app/layout.tsx` 생성 — 사이드바 레이아웃 (좌: nav, 우: children)
- 기존 도구 페이지들을 `/app` 하위로 이동:
  - `/setup` → `/app/setup`
  - `/guide` → `/app/guide`
  - `/builder` → `/app/builder`
  - `/error-translator` → `/app/error-translator`
  - `/glossary` → `/app/glossary`
  - `/faq` → `/app/faq`
- 기존 URL은 `/app/*`으로 redirect 처리 (SEO, 북마크 호환)

**Step 2: 사이드바 컴포넌트**
- `apps/web/src/components/layout/app-sidebar.tsx` 생성
- 로고 + 기능 목록 (아이콘 + 라벨)
- 현재 페이지 active 표시 (좌측 border accent)
- 모바일: 하단 탭바 또는 햄버거로 전환
- 용어 검색은 사이드바 상단에 배치

**Step 3: 랜딩 페이지 재설계**
- `/app/page.tsx`의 도구 카드 섹션 제거
- 홍보 콘텐츠 추가 (Phase 5 랜딩 콘텐츠 참조)
- CTA 버튼: "시작하기" → `/app` 이동

**Step 4: 상단 Nav 분기**
- 랜딩(`/`): 현재 스타일 유지 (홍보 링크 + CTA)
- 대시보드(`/app/*`): 사이드바가 nav 역할 → 상단 nav 제거 또는 최소화 (로고 + 검색만)

### 주의사항
- `output: 'export'` (static export) 유지 — 동적 라우팅 없음
- `basePath: '/coderecipe'` 반영 필요
- `typedRoutes: true` — 새 경로도 `as const` 사용
- 기존 `/setup`, `/guide` 등 외부 링크된 URL redirect 필수

### 예상 공수
- 라우팅 + 사이드바: M (기존 컴포넌트 재활용, 레이아웃만 추가)
- 랜딩 재설계: M (콘텐츠 기획 별도)
- redirect 처리: S

## Extensions & Integrations

| Item | Effort | Notes |
|------|--------|-------|
| CodeRecipe Chrome Extension — 만든 앱 실시간 에러 번역 | L | 브라우저 콘솔 에러를 실시간으로 캡처해 에러 번역기로 라우팅. Extension manifest v3 기반. |
| MCP 자동 에러 번역 — Claude Code 에러 발생 시 자동 호출 | M | Claude Code hook 또는 stderr 감지로 `translate_error` 자동 트리거. 현재는 수동 붙여넣기. |
| MCP npm publish — 비개발자 공개 설치 가능하게 | M | `@coderecipe/mcp-plugin` 패키지 퍼블리시. README에 `npx` 설치 방법 포함. |
| 환경 진단 실제 자동화 (CLI/MCP 버전) | L | 현재 `/setup`은 정적 가이드. 실제 `node --version`, `git --version` 자동 실행 후 결과 표시하는 CLI 또는 MCP 툴 빌드. |

## Error Pattern Refinement

| Item | Effort | Notes |
|------|--------|-------|
| dom-exception 패턴 세분화 | S | 현재 `dom-exception`은 카메라/클립보드/위치정보 오류를 하나로 묶음. 실제 사용 데이터 수집 후 각각 별도 패턴으로 분리 권장. |

## Known Technical Debt

| Item | Location | Notes |
|------|----------|-------|
| MCP가 shared 함수의 단순 래퍼 수준 | `packages/mcp-plugin/src/index.ts` | 에러 자동 감지, 실제 환경 체크 등 MCP 전용 기능 미구현. 현재는 shared 함수 그대로 노출. |

## Validation Milestones (not code)

- [ ] 실제 비개발자 1명 옆에서 `/setup` → Claude Code 첫 실행까지 완주 관찰
- [ ] 첫 10명 이후: 환경 진단 완료율, 프롬프트 빌더 완료율, 에러 번역기 사용 빈도 측정
- [ ] 2주 후 Vercel Analytics 이탈 데이터 기반 MCP-first 전환 여부 결정
