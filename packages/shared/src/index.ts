// CodeRecipe shared types and utilities

// ── Environment Checker Types ─────────────────────────────────────────────────

export type OsType = "mac" | "windows" | "linux";

export interface OsOption {
  value: OsType;
  label: string;
  emoji: string;
}

export const OS_OPTIONS: OsOption[] = [
  { value: "mac", label: "맥 (Mac)", emoji: "🍎" },
  { value: "windows", label: "윈도우 (Windows)", emoji: "🪟" },
  { value: "linux", label: "리눅스 (Linux)", emoji: "🐧" },
];

export interface DevTool {
  id: string;
  name: string;
  description: string; // Korean, no coding terms
  checkCommand: Record<OsType, string>;
  installGuide: Record<OsType, InstallStep[]>;
  required: boolean;
}

export interface InstallStep {
  step: number;
  title: string;
  detail: string;
  command?: string; // terminal command if needed
}

export const DEV_TOOLS: DevTool[] = [
  {
    id: "node",
    name: "Node.js",
    description: "앱을 실행하는 데 필요한 기본 엔진이에요. 자동차의 엔진처럼 꼭 있어야 해요.",
    checkCommand: {
      mac: "node --version",
      windows: "node --version",
      linux: "node --version",
    },
    required: true,
    installGuide: {
      mac: [
        { step: 1, title: "공식 사이트 열기", detail: "nodejs.org 사이트에서 LTS 버전을 내려받으세요.", command: "open https://nodejs.org" },
        { step: 2, title: "설치 파일 실행", detail: "내려받은 .pkg 파일을 더블클릭하고 '계속'을 눌러 설치하세요." },
        { step: 3, title: "설치 확인", detail: "터미널을 열고 아래 명령어를 입력하세요. 버전 번호가 나오면 성공!", command: "node --version" },
      ],
      windows: [
        { step: 1, title: "공식 사이트 열기", detail: "nodejs.org 사이트에서 LTS 버전 Windows Installer를 내려받으세요." },
        { step: 2, title: "설치 파일 실행", detail: "내려받은 .msi 파일을 더블클릭하고 Next를 눌러 설치하세요." },
        { step: 3, title: "설치 확인", detail: "명령 프롬프트(cmd)를 열고 아래 명령어를 입력하세요.", command: "node --version" },
      ],
      linux: [
        { step: 1, title: "패키지 목록 업데이트", detail: "터미널에서 아래 명령어를 실행하세요.", command: "sudo apt update" },
        { step: 2, title: "Node.js 설치", detail: "아래 명령어를 실행하세요.", command: "sudo apt install nodejs npm -y" },
        { step: 3, title: "설치 확인", detail: "버전 번호가 나오면 성공!", command: "node --version" },
      ],
    },
  },
  {
    id: "git",
    name: "Git",
    description: "작업 내용을 저장하고 되돌릴 수 있는 '저장 기록' 도구예요. 게임의 세이브 기능과 같아요.",
    checkCommand: {
      mac: "git --version",
      windows: "git --version",
      linux: "git --version",
    },
    required: true,
    installGuide: {
      mac: [
        { step: 1, title: "Xcode 도구 설치", detail: "터미널에서 아래 명령어를 실행하면 Git이 자동으로 설치돼요.", command: "xcode-select --install" },
        { step: 2, title: "설치 확인", detail: "버전 번호가 나오면 성공!", command: "git --version" },
      ],
      windows: [
        { step: 1, title: "공식 사이트에서 내려받기", detail: "git-scm.com 사이트에서 Windows용 Git을 내려받으세요." },
        { step: 2, title: "설치 파일 실행", detail: "내려받은 파일을 실행하고 기본 설정으로 Next를 눌러 설치하세요." },
        { step: 3, title: "설치 확인", detail: "명령 프롬프트에서 확인하세요.", command: "git --version" },
      ],
      linux: [
        { step: 1, title: "Git 설치", detail: "터미널에서 실행하세요.", command: "sudo apt install git -y" },
        { step: 2, title: "설치 확인", detail: "버전 번호가 나오면 성공!", command: "git --version" },
      ],
    },
  },
  {
    id: "npm",
    name: "npm",
    description: "앱에 필요한 재료(라이브러리)를 자동으로 구해주는 도구예요. Node.js를 설치하면 함께 설치돼요.",
    checkCommand: {
      mac: "npm --version",
      windows: "npm --version",
      linux: "npm --version",
    },
    required: true,
    installGuide: {
      mac: [
        { step: 1, title: "Node.js 설치 필요", detail: "npm은 Node.js를 설치하면 자동으로 함께 설치돼요. 위 Node.js 설치 단계를 먼저 완료해 주세요." },
        { step: 2, title: "설치 확인", detail: "버전 번호가 나오면 성공!", command: "npm --version" },
      ],
      windows: [
        { step: 1, title: "Node.js 설치 필요", detail: "npm은 Node.js를 설치하면 자동으로 함께 설치돼요. 위 Node.js 설치 단계를 먼저 완료해 주세요." },
        { step: 2, title: "설치 확인", command: "npm --version", detail: "버전 번호가 나오면 성공!" },
      ],
      linux: [
        { step: 1, title: "Node.js 설치 필요", detail: "npm은 Node.js를 설치하면 자동으로 함께 설치돼요. 위 Node.js 설치 단계를 먼저 완료해 주세요." },
        { step: 2, title: "설치 확인", command: "npm --version", detail: "버전 번호가 나오면 성공!" },
      ],
    },
  },
  {
    id: "claude",
    name: "Claude Code",
    description: "AI가 직접 코드를 써주는 도구예요. 이게 있어야 CodeRecipe가 작동해요.",
    checkCommand: {
      mac: "claude --version",
      windows: "claude --version",
      linux: "claude --version",
    },
    required: true,
    installGuide: {
      mac: [
        { step: 1, title: "npm으로 설치", detail: "터미널에서 아래 명령어를 실행하세요. npm이 먼저 설치되어 있어야 해요.", command: "npm install -g @anthropic-ai/claude-code" },
        { step: 2, title: "설치 확인", detail: "버전 번호가 나오면 성공!", command: "claude --version" },
      ],
      windows: [
        { step: 1, title: "npm으로 설치", detail: "명령 프롬프트에서 실행하세요.", command: "npm install -g @anthropic-ai/claude-code" },
        { step: 2, title: "설치 확인", command: "claude --version", detail: "버전 번호가 나오면 성공!" },
      ],
      linux: [
        { step: 1, title: "npm으로 설치", detail: "터미널에서 실행하세요.", command: "npm install -g @anthropic-ai/claude-code" },
        { step: 2, title: "설치 확인", command: "claude --version", detail: "버전 번호가 나오면 성공!" },
      ],
    },
  },
];

// ── Glossary Types ────────────────────────────────────────────────────────────

export interface GlossaryTerm {
  id: string;
  term: string;           // technical term (English or mixed)
  koreanTerm?: string;    // Korean name if exists
  plain: string;          // plain Korean explanation
  analogy?: string;       // everyday analogy
  tags: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "terminal",
    term: "터미널 / 명령 프롬프트",
    plain: "컴퓨터에 텍스트로 명령을 내리는 창이에요. 마우스 클릭 대신 글자를 입력해서 컴퓨터를 조종해요.",
    analogy: "전화 통화처럼 직접 컴퓨터에 말(텍스트)을 거는 방식이에요.",
    tags: ["기본", "환경"],
  },
  {
    id: "repository",
    term: "저장소 (Repository)",
    koreanTerm: "레포지토리",
    plain: "프로젝트의 모든 파일과 변경 기록을 보관하는 폴더예요. 클라우드에 올려두면 어디서든 접근할 수 있어요.",
    analogy: "구글 드라이브 폴더처럼 파일을 모아두는 공간이에요.",
    tags: ["Git", "기본"],
  },
  {
    id: "commit",
    term: "커밋 (Commit)",
    plain: "변경 내용을 '저장 지점'으로 기록하는 행동이에요. 나중에 이 지점으로 되돌아올 수 있어요.",
    analogy: "게임에서 세이브 버튼을 누르는 것과 같아요.",
    tags: ["Git"],
  },
  {
    id: "branch",
    term: "브랜치 (Branch)",
    plain: "기존 코드를 건드리지 않고 새 기능을 따로 시험해 볼 수 있는 복사본이에요.",
    analogy: "나무 줄기에서 뻗어나온 가지처럼, 원본은 그대로 두고 별도로 작업하는 거예요.",
    tags: ["Git"],
  },
  {
    id: "package",
    term: "패키지 / 라이브러리",
    plain: "누군가 미리 만들어둔 유용한 기능 묶음이에요. 직접 만들지 않고 가져다 쓸 수 있어요.",
    analogy: "요리할 때 직접 밀가루를 만들지 않고 마트에서 사오는 것처럼, 필요한 기능을 미리 만들어둔 것을 쓰는 거예요.",
    tags: ["기본", "개발"],
  },
  {
    id: "npm",
    term: "npm",
    plain: "패키지(필요한 재료)를 자동으로 설치·관리해주는 도구예요.",
    analogy: "레시피에 필요한 재료를 자동으로 주문해주는 배달 서비스예요.",
    tags: ["도구", "환경"],
  },
  {
    id: "localhost",
    term: "로컬호스트 (localhost)",
    plain: "내 컴퓨터 안에서만 실행되는 임시 웹사이트 주소예요. 다른 사람은 볼 수 없어요.",
    analogy: "인터넷에 올리기 전 내 방에서 혼자 미리 써보는 것과 같아요.",
    tags: ["개발", "배포"],
  },
  {
    id: "deploy",
    term: "배포 (Deploy)",
    plain: "만든 앱을 인터넷에 올려서 다른 사람들도 쓸 수 있게 공개하는 거예요.",
    analogy: "음식을 만든 뒤 배달 앱에 올려서 손님들이 주문할 수 있게 하는 거예요.",
    tags: ["배포"],
  },
  {
    id: "api",
    term: "API",
    plain: "서로 다른 프로그램끼리 소통하는 방법이에요. 한 앱이 다른 앱의 기능을 빌려 쓸 수 있게 해줘요.",
    analogy: "식당에서 손님(앱)이 종업원(API)에게 주문하면, 종업원이 주방(서버)에서 음식을 가져다주는 것과 같아요.",
    tags: ["개발", "기본"],
  },
  {
    id: "frontend",
    term: "프론트엔드 (Frontend)",
    plain: "화면에 보이는 부분이에요. 버튼, 텍스트, 이미지 등 사용자가 직접 보고 누르는 모든 것이에요.",
    analogy: "식당의 홀(인테리어, 메뉴판, 테이블)과 같아요.",
    tags: ["개발", "기본"],
  },
  {
    id: "backend",
    term: "백엔드 (Backend)",
    plain: "화면 뒤에서 데이터를 처리하고 저장하는 부분이에요. 사용자는 볼 수 없지만 중요한 역할을 해요.",
    analogy: "식당의 주방처럼 보이지 않지만 실제 요리(기능)를 담당하는 부분이에요.",
    tags: ["개발", "기본"],
  },
  {
    id: "node",
    term: "Node.js",
    plain: "JavaScript 코드를 컴퓨터에서 직접 실행할 수 있게 해주는 엔진이에요.",
    analogy: "자동차에 엔진이 필요하듯, 앱을 실행하려면 이 엔진이 필요해요.",
    tags: ["환경", "도구"],
  },
  {
    id: "git",
    term: "Git",
    plain: "파일 변경 기록을 관리하고 이전 상태로 되돌릴 수 있게 해주는 도구예요.",
    analogy: "문서 작업의 '실행 취소(Ctrl+Z)' 기능을 무한히, 영구적으로 쓸 수 있는 것과 같아요.",
    tags: ["도구", "Git"],
  },
  {
    id: "github",
    term: "GitHub",
    plain: "Git 저장소를 인터넷에 올려두는 서비스예요. 다른 사람과 코드를 공유하거나 협업할 수 있어요.",
    analogy: "구글 드라이브가 일반 파일을 저장하듯, GitHub는 코드 파일을 저장하고 공유하는 서비스예요.",
    tags: ["도구", "Git"],
  },
  {
    id: "env",
    term: "환경 변수 (.env)",
    plain: "비밀번호나 API 키처럼 외부에 노출되면 안 되는 중요한 정보를 따로 저장하는 파일이에요.",
    analogy: "집 열쇠를 사진에 찍어 올리지 않고 금고에 보관하는 것과 같아요.",
    tags: ["보안", "개발"],
  },
  {
    id: "framework",
    term: "프레임워크 (Framework)",
    plain: "앱을 만들기 위한 기본 틀이에요. 자주 쓰는 기능들이 미리 준비되어 있어서 더 빠르게 만들 수 있어요.",
    analogy: "이케아 가구처럼 기본 틀이 있어서 처음부터 나무를 깎지 않고 조립만 하면 되는 거예요.",
    tags: ["개발", "기본"],
  },
  {
    id: "port",
    term: "포트 (Port)",
    plain: "컴퓨터에서 특정 프로그램이 사용하는 번호 붙은 출입구예요. 예: localhost:3000의 3000이 포트 번호예요.",
    analogy: "아파트에서 동호수처럼, 컴퓨터의 각 프로그램이 사용하는 번지수예요.",
    tags: ["개발", "네트워크"],
  },
  {
    id: "mcp",
    term: "MCP (Model Context Protocol)",
    plain: "Claude Code 같은 AI가 외부 도구나 서비스와 소통하는 방법이에요.",
    analogy: "AI와 다른 프로그램 사이의 통역사 역할을 해요.",
    tags: ["AI", "개발"],
  },
  {
    id: "build",
    term: "빌드 (Build)",
    plain: "작성한 코드를 실제로 실행할 수 있는 형태로 변환하는 과정이에요.",
    analogy: "요리 레시피대로 실제 음식을 만드는 과정이에요.",
    tags: ["개발", "배포"],
  },
];

export const GLOSSARY_TAGS = [
  "전체", "기본", "Git", "환경", "개발", "도구", "배포", "보안", "AI", "네트워크",
];

// ── Prompt Builder Types ──────────────────────────────────────────────────────

export type ProjectType = "website" | "chrome-extension" | "ai-automation" | "webapp";

export interface ProjectTypeOption {
  value: ProjectType;
  label: string;
  emoji: string;
  description: string;
}

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  {
    value: "website",
    label: "웹사이트",
    emoji: "🌐",
    description: "소개 페이지, 블로그, 포트폴리오 등",
  },
  {
    value: "chrome-extension",
    label: "크롬 확장 프로그램",
    emoji: "🔌",
    description: "브라우저에서 사용하는 도구",
  },
  {
    value: "ai-automation",
    label: "AI 자동화 도구",
    emoji: "🤖",
    description: "로컬에서 돌리는 AI 스크립트, 자동화 봇",
  },
  {
    value: "webapp",
    label: "웹앱",
    emoji: "⚡",
    description: "쇼핑몰, 예약 시스템, 관리 도구 등",
  },
];

export interface FeatureOption {
  value: string;
  label: string;
}

export const FEATURES_BY_TYPE: Record<ProjectType, FeatureOption[]> = {
  website: [
    { value: "portfolio", label: "작업물/포트폴리오 카드" },
    { value: "contact-form", label: "문의하기 양식" },
    { value: "sns-links", label: "SNS 링크 (인스타, 링크드인 등)" },
    { value: "gallery", label: "사진/이미지 갤러리" },
    { value: "blog", label: "블로그/소식 게시판" },
    { value: "darkmode", label: "다크 모드" },
    { value: "animation", label: "애니메이션/인터랙션 효과" },
  ],
  "chrome-extension": [
    { value: "popup", label: "버튼 클릭으로 열리는 창" },
    { value: "page-modify", label: "웹페이지 내용 변경" },
    { value: "screenshot", label: "화면 캡처" },
    { value: "bookmark", label: "북마크/저장 기능" },
    { value: "notification", label: "알림 보내기" },
    { value: "context-menu", label: "마우스 우클릭 메뉴" },
  ],
  "ai-automation": [
    { value: "api-integration", label: "외부 API 연동 (OpenAI, Claude 등)" },
    { value: "file-processing", label: "파일 자동 처리 (변환, 정리, 분류)" },
    { value: "data-scraping", label: "데이터 수집/스크래핑" },
    { value: "scheduling", label: "스케줄링/반복 실행" },
    { value: "notification", label: "알림 보내기 (슬랙, 디스코드 등)" },
    { value: "report-gen", label: "리포트/요약 자동 생성" },
  ],
  webapp: [
    { value: "login", label: "회원가입 / 로그인" },
    { value: "payment", label: "결제 기능" },
    { value: "search", label: "검색 기능" },
    { value: "dashboard", label: "현황판 / 통계" },
    { value: "file-upload", label: "파일 업로드" },
    { value: "notification", label: "알림 기능" },
    { value: "admin", label: "관리자 페이지" },
    { value: "review", label: "리뷰 / 별점" },
  ],
};

export interface PromptBuilderInput {
  projectType: ProjectType;
  topic: string;              // 필수: 어떤 주제/내용의 사이트인지 (예: "카페 소개", "개인 포트폴리오")
  features: string[];
  customFeature?: string;
  referenceUrl?: string;
  description?: string;
}

// ── Error Translator Types ────────────────────────────────────────────────────

export interface ErrorPattern {
  id: string;
  pattern: RegExp;
  title: string;             // short error name in Korean
  explanation: string;       // "이건 ○○ 문제입니다" — plain Korean
  suggestedPrompt: string;   // ready-to-paste Claude Code prompt
}

export interface TranslateErrorResult {
  matched: boolean;
  errorId?: string;
  title: string;
  explanation: string;
  suggestedPrompt: string;
}

export const ERROR_PATTERNS: ErrorPattern[] = [
  {
    id: "enoent",
    pattern: /ENOENT|no such file or directory/i,
    title: "파일을 찾을 수 없음",
    explanation: "이건 파일(또는 폴더)을 찾지 못하는 문제입니다. 경로가 잘못되었거나 파일이 아직 만들어지지 않았을 때 나타나요.",
    suggestedPrompt: "ENOENT 에러가 발생했어요. 해당 파일이나 폴더가 존재하는지 확인하고, 경로가 올바른지 점검해서 해결해 주세요.",
  },
  {
    id: "eaddrinuse",
    pattern: /EADDRINUSE|address already in use/i,
    title: "포트 충돌",
    explanation: "이건 포트(통신 번호)가 이미 다른 프로그램에 의해 사용 중인 문제입니다. 같은 번호의 출입구를 두 개 동시에 열려고 할 때 나타나요.",
    suggestedPrompt: "EADDRINUSE 에러가 발생했어요. 해당 포트를 사용 중인 프로세스를 찾아 종료하거나, 다른 포트 번호로 변경해서 해결해 주세요.",
  },
  {
    id: "eperm",
    pattern: /EPERM|operation not permitted/i,
    title: "권한 문제",
    explanation: "이건 파일이나 폴더에 접근할 권한이 없는 문제입니다. 잠긴 서랍을 열쇠 없이 열려는 것과 같아요.",
    suggestedPrompt: "EPERM 권한 오류가 발생했어요. 해당 파일이나 폴더의 권한을 확인하고, 필요하다면 관리자 권한으로 실행하거나 권한을 변경해서 해결해 주세요.",
  },
  {
    id: "eacces",
    pattern: /EACCES|permission denied/i,
    title: "접근 권한 없음",
    explanation: "이건 파일이나 디렉토리에 접근이 거부된 문제입니다. 읽거나 쓸 수 있는 권한이 없을 때 나타나요.",
    suggestedPrompt: "EACCES 권한 거부 오류가 발생했어요. 파일 접근 권한을 확인하고 수정하거나, sudo/관리자 권한으로 실행해서 해결해 주세요.",
  },
  {
    id: "module-not-found",
    pattern: /MODULE_NOT_FOUND|Cannot find module|Module not found/i,
    title: "패키지 미설치",
    explanation: "이건 필요한 패키지(라이브러리)가 설치되어 있지 않은 문제입니다. 레시피 재료가 없는 것과 같아요.",
    suggestedPrompt: "모듈을 찾을 수 없는 에러가 발생했어요. 누락된 패키지를 확인하고 npm install 또는 pnpm install 명령어로 설치해서 해결해 주세요.",
  },
  {
    id: "syntax-error",
    pattern: /SyntaxError|Unexpected token|Unexpected end of/i,
    title: "코드 문법 오류",
    explanation: "이건 코드를 작성할 때 문법(규칙)을 지키지 않아서 생기는 문제입니다. 문장에 마침표가 빠진 것처럼 코드에 빠진 기호가 있어요.",
    suggestedPrompt: "SyntaxError 문법 오류가 발생했어요. 오류가 발생한 줄 근처를 확인하고, 빠진 괄호나 따옴표, 세미콜론 등을 찾아서 고쳐 주세요.",
  },
  {
    id: "type-error",
    pattern: /TypeError|is not a function|Cannot read propert|Cannot set propert/i,
    title: "타입(형식) 오류",
    explanation: "이건 잘못된 형식의 값을 사용하려 할 때 생기는 문제입니다. 숫자를 넣어야 할 곳에 문자를 넣거나, 존재하지 않는 기능을 호출하려 할 때 나타나요.",
    suggestedPrompt: "TypeError가 발생했어요. 오류가 발생한 변수나 함수가 올바른 값을 가지고 있는지 확인하고, undefined나 null 체크를 추가해서 해결해 주세요.",
  },
  {
    id: "reference-error",
    pattern: /ReferenceError|is not defined/i,
    title: "정의되지 않은 변수",
    explanation: "이건 아직 만들지 않은 변수나 함수를 사용하려 할 때 생기는 문제입니다. 이름을 부르기 전에 먼저 소개(정의)가 필요해요.",
    suggestedPrompt: "ReferenceError가 발생했어요. 오류가 난 변수나 함수가 올바르게 선언되었는지, 사용 전에 정의가 됐는지 확인해서 해결해 주세요.",
  },
  {
    id: "econnrefused",
    pattern: /ECONNREFUSED|connect ECONNREFUSED|Connection refused/i,
    title: "연결 거부",
    explanation: "이건 서버나 데이터베이스에 연결하려 했지만 거부된 문제입니다. 전화를 걸었는데 상대방이 받지 않는 것과 같아요.",
    suggestedPrompt: "ECONNREFUSED 연결 거부 오류가 발생했어요. 연결하려는 서버나 데이터베이스가 실행 중인지 확인하고, 호스트와 포트 설정이 올바른지 점검해 주세요.",
  },
  {
    id: "out-of-memory",
    pattern: /heap out of memory|JavaScript heap|ENOMEM|out of memory/i,
    title: "메모리 부족",
    explanation: "이건 프로그램이 사용할 수 있는 메모리(작업 공간)가 부족한 문제입니다. 책상이 너무 좁아서 더 이상 물건을 올려놓을 수 없는 것과 같아요.",
    suggestedPrompt: "메모리 부족 오류가 발생했어요. Node.js의 메모리 한도를 늘리거나(--max-old-space-size 옵션), 메모리 누수가 있는지 확인해서 해결해 주세요.",
  },
  {
    id: "network-error",
    pattern: /Network Error|fetch failed|ENETUNREACH|getaddrinfo/i,
    title: "네트워크 오류",
    explanation: "이건 인터넷 연결이나 서버 통신 중 문제가 생긴 것입니다. 도로가 막혀서 택배가 배달되지 못하는 상황과 같아요.",
    suggestedPrompt: "네트워크 오류가 발생했어요. 인터넷 연결 상태를 확인하고, API 주소나 URL이 올바른지, 서버가 정상 작동 중인지 점검해 주세요.",
  },
  {
    id: "env-missing",
    pattern: /process\.env\.|\.env|environment variable|missing.*key|api.*key.*not/i,
    title: "환경 변수 누락",
    explanation: "이건 API 키나 비밀번호 같은 중요한 설정값이 빠져있는 문제입니다. 자물쇠를 열 열쇠가 없는 것과 같아요.",
    suggestedPrompt: "환경 변수 누락 오류가 발생했어요. .env 파일이 존재하는지 확인하고, 필요한 환경 변수(API 키 등)가 올바르게 설정되어 있는지 점검해 주세요.",
  },
  {
    id: "unhandled-rejection",
    pattern: /Uncaught \(in promise\)|UnhandledPromiseRejection|unhandledrejection/i,
    title: "처리되지 않은 비동기 오류",
    explanation: "이건 약속(Promise)이 실패했는데 아무도 그 실패를 처리하지 않아서 생기는 문제예요. 음식 배달을 시켰는데 취소됐을 때 아무도 알림을 받지 못한 것과 같아요.",
    suggestedPrompt: "Unhandled Promise Rejection 에러가 발생했어요. 비동기 함수에 catch 처리가 빠져있거나 await 사용 시 try-catch가 없는지 확인해서 해결해 주세요.",
  },
  {
    id: "react-key-error",
    pattern: /Each child in a list should have a unique.*key|key.*prop/i,
    title: "React 리스트 key 누락",
    explanation: "이건 React에서 목록을 만들 때 각 항목에 고유한 이름표(key)를 붙여줘야 하는데 빠진 문제예요.",
    suggestedPrompt: "React key prop 경고가 발생했어요. 리스트를 렌더링하는 map() 함수에서 각 항목에 key={고유값} 속성을 추가해서 해결해 주세요.",
  },
  {
    id: "fetch-http-error",
    pattern: /HTTP error.*status|fetch.*failed|Failed to fetch/i,
    title: "API 통신 오류",
    explanation: "이건 서버에 데이터를 요청했는데 서버가 오류를 반환한 문제예요. 택배를 주문했는데 배송 불가 지역이라 거절당한 것과 같아요.",
    suggestedPrompt: "HTTP 통신 오류가 발생했어요. API 주소가 올바른지, 서버가 정상 동작 중인지, 인증 토큰이 유효한지 확인해서 해결해 주세요.",
  },
  {
    id: "dom-exception",
    pattern: /DOMException|NotAllowedError|NotSupportedError/i,
    title: "브라우저 기능 접근 오류",
    explanation: "이건 카메라, 마이크, 클립보드 같은 브라우저 기능에 접근하려 했는데 권한이 없거나 지원하지 않는 환경이라서 생기는 문제예요.",
    suggestedPrompt: "DOMException 오류가 발생했어요. 브라우저 권한 설정을 확인하고, 해당 기능이 현재 환경(HTTP vs HTTPS 등)에서 지원되는지 점검해 주세요.",
  },
  {
    id: "react-update-error",
    pattern: /Cannot update a component.*while rendering|Too many re-renders/i,
    title: "React 렌더링 루프 오류",
    explanation: "이건 화면을 그리는 도중에 화면을 다시 그리라는 명령을 내려서 무한 반복이 생기는 문제예요. 거울 두 개를 마주보게 놓은 것처럼 계속 반복돼요.",
    suggestedPrompt: "React 렌더링 오류가 발생했어요. useEffect나 이벤트 핸들러 밖에서 setState를 호출하고 있지 않은지, 의존성 배열이 올바른지 확인해서 해결해 주세요.",
  },
];

export function translateError(errorMessage: string, context?: string): TranslateErrorResult {
  const trimmed = errorMessage.trim();
  const contextSuffix = context?.trim()
    ? `\n\n상황 설명:\n${context.trim()}`
    : "";

  for (const pattern of ERROR_PATTERNS) {
    if (pattern.pattern.test(trimmed)) {
      return {
        matched: true,
        errorId: pattern.id,
        title: pattern.title,
        explanation: pattern.explanation,
        suggestedPrompt: `${pattern.suggestedPrompt}\n\n에러 내용:\n${trimmed}${contextSuffix}`,
      };
    }
  }

  // Generic fallback
  return {
    matched: false,
    title: "알 수 없는 오류",
    explanation: "이 오류의 정확한 유형은 파악하기 어렵지만, Claude Code에게 전달하면 분석해줄 수 있어요.",
    suggestedPrompt: `다음 오류가 발생했어요. 원인을 분석하고 해결 방법을 알려주세요:\n\n${trimmed}${contextSuffix}`,
  };
}

// ── Type-specific prompt sections ─────────────────────────────────────────────

const PERSONA_BY_TYPE: Record<ProjectType, string> = {
  website: `당신은 10년 경력의 웹 디자이너 겸 프론트엔드 개발자입니다. 깔끔하고 세련된 사이트를 한 번에 완성하는 것이 당신의 특기입니다. 템플릿 느낌이 아닌, 해당 주제에 딱 맞는 맞춤형 사이트를 만들어 주세요.`,

  "chrome-extension": `당신은 크롬 확장 프로그램 전문 개발자입니다. 사용자가 매일 쓰게 되는 실용적인 도구를 만드는 것이 당신의 특기입니다. 가볍고 빠르게 동작하면서도, 쓸 때 "이거 잘 만들었다"라는 느낌이 드는 확장 프로그램을 만들어 주세요.`,

  "ai-automation": `당신은 AI 자동화 도구 전문 개발자입니다. 복잡한 반복 작업을 스크립트 하나로 자동화하는 것이 당신의 특기입니다. 배포 없이 로컬에서 바로 실행할 수 있고, 비개발자도 설정만 바꿔서 쓸 수 있는 실용적인 자동화 도구를 만들어 주세요.`,

  webapp: `당신은 풀스택 웹 애플리케이션 개발자입니다. 실제로 사람들이 매일 쓸 수 있는 수준의 완성도 높은 웹앱을 만드는 것이 당신의 특기입니다. SaaS 제품처럼 깔끔한 UX와 안정적인 동작을 갖춘 웹앱을 만들어 주세요.`,
};

const TECH_STACK_BY_TYPE: Record<ProjectType, string> = {
  website: `## 기술 스택
- HTML5 + CSS3 + 바닐라 JavaScript (프레임워크 없이)
- CSS는 커스텀 프로퍼티(변수)를 활용해서 색상과 간격을 체계적으로 관리해 주세요
- 필요한 경우에만 가벼운 CSS 라이브러리(예: normalize.css) 사용 가능
- 별도의 빌드 도구 없이 브라우저에서 바로 열 수 있게 만들어 주세요`,

  "chrome-extension": `## 기술 스택
- Manifest V3 기반
- 팝업/옵션 UI: HTML + CSS + 바닐라 JavaScript
- 데이터 저장: chrome.storage.local
- 필요한 경우 content script와 background service worker 활용
- 외부 프레임워크 없이 가볍게 만들어 주세요`,

  "ai-automation": `## 기술 스택
- Node.js (ES Modules)
- 설정: .env 파일 + JSON 설정 파일
- 의존성: 최소화 (필요한 패키지만 package.json에 명시)
- 실행: \`node index.js\` 또는 \`npm start\`로 바로 실행 가능하게
- 배포 불필요 — 로컬 환경에서 완결되는 구조로 만들어 주세요`,

  webapp: `## 기술 스택
- HTML + CSS + 바닐라 JavaScript (또는 간단한 모듈 구조)
- 데이터 저장: localStorage + JSON 구조
- 라우팅: hash 기반 SPA 라우팅 또는 멀티페이지
- 별도의 빌드 도구나 프레임워크 없이 바로 실행 가능하게 만들어 주세요`,
};

const DESIGN_GUIDANCE_BY_TYPE: Record<ProjectType, string> = {
  website: `## 디자인 원칙
- 콘텐츠 중심 레이아웃: 텍스트와 이미지 사이 여백을 넉넉하게, 줄 간격(line-height)은 1.6~1.8로 읽기 편하게
- 첫 화면(히어로 섹션): 이 사이트가 무엇인지 한 문장으로 전달. 배경 이미지보다 타이포그래피와 여백으로 임팩트를 주세요
- 색상: 주색 1개 + 보조색 1개 + 배경/텍스트 계열. 채도가 너무 높은 색은 피하고, 차분하면서도 개성 있는 팔레트를 선택하세요
- 레이아웃: 모든 섹션이 같은 구조(카드 3개 나열 등)로 반복되지 않게 해주세요. 전체 너비 섹션, 텍스트+이미지 교차 배치, 강조 인용구 등 변화를 주세요
- 타이포그래피: 제목과 본문의 크기 대비를 확실하게 (제목 2rem 이상, 본문 1rem). 자간과 행간을 세심하게 조절하세요
- 반응형: 모바일(375px) 먼저, 태블릿(768px), 데스크톱(1200px) 순서로 대응
- 마이크로 인터랙션: 호버 시 미세한 색상 변화, 스크롤 시 자연스러운 fade-in 정도만. 과한 애니메이션은 금지`,

  "chrome-extension": `## 디자인 원칙
- 팝업 사이즈: 가로 360px, 세로 최대 500px. 이 안에서 핵심 기능이 한눈에 보여야 합니다
- 조작 효율: 사용자가 클릭 1~2번으로 원하는 결과를 얻을 수 있게 해주세요
- 브라우저 조화: 크롬 기본 UI와 이질감 없는 깔끔한 디자인. 둥근 모서리(8px), 부드러운 그림자
- 상태 표시: 로딩(스피너), 성공(체크), 실패(에러 메시지)를 시각적으로 명확히 구분
- 아이콘: 16x16, 32x32, 48x48, 128x128 사이즈 모두 준비. SVG 기반으로 선명하게
- 색상: 시스템 UI와 어울리는 중립적 색상 + 주요 액션에만 포인트 색 하나`,

  "ai-automation": `## 설계 원칙
- 단일 책임: 하나의 도구가 하나의 작업을 확실하게 처리
- 설정 분리: API 키, 경로, 옵션 등은 .env 또는 config.json으로 분리. 코드 수정 없이 설정만 바꿔서 다른 용도로 재활용 가능하게
- 에러 복원: 네트워크 실패, API 오류 시 자동 재시도(최대 3회) + 명확한 에러 로그
- 진행 표시: 처리 중인 항목 수, 완료율 등을 콘솔에 표시
- 로그: 실행 결과를 logs/ 폴더에 날짜별로 저장
- 안전장치: 실행 전 dry-run 모드로 미리 확인 가능하게`,

  webapp: `## 디자인 원칙
- 핵심 유저 플로우를 먼저 설계하고, 그 흐름이 3단계 이내에 완료되게 해주세요
- Empty State: 데이터가 없을 때 일러스트나 안내 문구로 다음 행동을 유도 (빈 화면 방치 금지)
- 폼: 실시간 유효성 검사, 에러 메시지는 입력 필드 바로 아래에, 성공 시 미세한 초록색 피드백
- 상태 피드백: 로딩(스켈레톤 UI 또는 스피너), 성공(토스트 메시지), 실패(인라인 에러) 명확히 구분
- 일관성: 버튼, 카드, 입력 필드 등 반복 요소는 동일한 스타일. CSS 변수로 디자인 토큰 관리
- 네비게이션: 현재 위치를 항상 알 수 있게 (활성 메뉴 하이라이트, 브레드크럼 등)
- 레이아웃: 사이드바+메인 또는 탑바+콘텐츠 구조. 반응형으로 모바일에서는 자연스럽게 접히게`,
};

const WORK_STYLE_BY_TYPE: Record<ProjectType, string> = {
  website: `## 작업 방식
1. 전체 페이지 구조(헤더, 히어로, 본문 섹션들, 푸터)를 HTML로 먼저 잡기
2. CSS로 레이아웃과 타이포그래피 완성 (모바일 먼저)
3. 각 섹션의 콘텐츠를 주제에 맞는 실제 내용으로 채우기
4. 인터랙션과 반응형 마무리
- 한 섹션 완성할 때마다 "여기까지 확인해 보세요"라고 알려주세요
- HTML 시맨틱 태그 필수 (header, main, section, article, footer)`,

  "chrome-extension": `## 작업 방식
1. manifest.json(V3) 설정 — 필요한 권한만 최소로
2. 팝업 UI 완성 — 핵심 화면과 인터랙션
3. 백그라운드/콘텐츠 스크립트 — 실제 기능 로직
4. chrome.storage로 데이터 저장 — 사용자 설정 유지
- 한 기능 완성할 때마다 "크롬에서 확장 프로그램 로드해서 확인해 보세요"라고 알려주세요
- 에러 발생 시 크롬 개발자도구 어디서 확인하는지도 안내해 주세요`,

  "ai-automation": `## 작업 방식
1. 입출력 설계 — 어떤 데이터를 받아서 어떤 결과를 만드는지 명확하게 정의
2. 핵심 로직 구현 — 메인 자동화 파이프라인 완성
3. 설정 파일 분리 — .env, config.json으로 커스터마이징 가능하게
4. 에러 처리 + 로깅 — 실패 시 원인 파악 가능한 로그
- 한 단계 완성할 때마다 "여기까지 테스트해 보세요"라고 알려주세요
- 설정 파일은 주석과 예시를 넣어서 비개발자도 수정 가능하게`,

  webapp: `## 작업 방식
1. 데이터 모델 설계 — 어떤 정보를 어떤 구조로 저장할지 먼저 정하기
2. 핵심 CRUD — 만들기, 읽기, 수정, 삭제 기본 기능 완성
3. UI/UX 다듬기 — 빈 상태, 로딩, 에러 처리, 폼 유효성 검사
4. 부가 기능 하나씩 추가
- 한 기능 완성할 때마다 "여기까지 확인해 보세요"라고 알려주세요
- 페이지 이동은 사용자 행동 흐름에 맞게 자연스럽게`,
};

const DEV_GUIDELINES_BY_TYPE: Record<ProjectType, string> = {
  website: `## 개발 지침
- 모든 텍스트는 한국어로, 주제에 맞는 실제 내용으로 채워주세요. "Lorem ipsum"이나 "여기에 내용을 입력하세요" 같은 임시 텍스트는 절대 쓰지 마세요
- SEO: title, meta description, og 태그 설정
- 이미지: alt 텍스트 필수. 실제 이미지가 필요한 곳은 picsum.photos나 unsplash.com의 소스 URL을 사용해 주세요
- 인터랙션: 클릭 가능한 요소에 hover 효과, 포커스 스타일 적용
- favicon 설정
- README에 로컬 실행 방법 포함`,

  "chrome-extension": `## 개발 지침
- Manifest V3 규격 필수
- 모든 UI 텍스트는 한국어
- 권한(permissions)은 꼭 필요한 것만 최소로
- chrome.storage.local로 데이터 저장
- 콘텐츠 스크립트가 기존 웹사이트 스타일/기능을 깨뜨리지 않도록 주의 (CSS 네임스페이스 격리)
- README에 설치 방법(개발자 모드 → 압축해제 로드) 포함`,

  "ai-automation": `## 개발 지침
- 콘솔 출력과 로그 메시지는 한국어로 작성
- .env.example 파일 제공 — 필요한 환경변수와 설명을 주석으로
- config.json.example 제공 — 설정 항목마다 용도 설명
- 민감 정보(API 키 등)는 반드시 .env로 분리, .gitignore에 포함
- package.json에 start, dry-run 스크립트 포함
- README에 설치 방법, 설정 방법, 실행 예시 포함`,

  webapp: `## 개발 지침
- 모든 UI 텍스트는 한국어. 버튼, 메시지, 안내문 모두 자연스러운 한국어로
- 폼: 프론트엔드 유효성 검사 + 친절한 에러 메시지 ("이메일 형식이 올바르지 않습니다" 식으로)
- 데이터: localStorage + JSON 구조. DB 없이 동작
- 라우팅: URL만 보고 어떤 페이지인지 알 수 있게
- 폴더 구조: 역할별로 명확하게 분리 (pages/, components/, data/, utils/)
- README에 설치, 실행, 주요 기능 설명 포함`,
};

const QUALITY_RULES_BY_TYPE: Record<ProjectType, string> = {
  website: `## 퀄리티 기준 (중요)
이것은 템플릿이 아닌, "${"{topic}"}"만을 위해 만든 맞춤 사이트여야 합니다:
- 콘텐츠: 주제에 맞는 구체적이고 현실적인 한국어 텍스트를 직접 작성해 주세요. 실제 운영하는 사이트처럼 보여야 합니다
- 색상: 주제의 분위기에 어울리는 고유한 색상 팔레트를 선택하세요 (카페라면 따뜻한 브라운 계열, 기술 블로그라면 차분한 블루 계열 등)
- 레이아웃 변화: 섹션마다 구조를 다르게. 한 섹션은 좌우 배치, 다른 섹션은 전체 너비, 또 다른 섹션은 카드 그리드 — 단조로운 반복 금지
- 디테일: 섹션 간 부드러운 전환, 일관된 간격 시스템(8px 또는 4px 단위), 의도적인 여백 활용
- 사진: 주제에 맞는 실제 사진을 unsplash 소스 URL로 넣어주세요 (placehold.co는 최후의 수단)`,

  "chrome-extension": `## 퀄리티 기준 (중요)
실제 크롬 웹스토어에 올라와 있는 인기 확장 프로그램 수준이어야 합니다:
- 첫인상: 설치 직후 바로 쓸 수 있어야 합니다. 복잡한 설정 단계 없이 핵심 기능이 즉시 동작
- 피드백: 모든 사용자 액션에 시각적 반응이 있어야 합니다 (클릭 → 로딩 → 완료)
- 에러 대응: "문제가 발생했습니다" 같은 모호한 메시지 대신, 구체적인 원인과 해결 방법 안내
- 데이터: 사용자 설정과 데이터가 브라우저를 닫았다 열어도 유지
- 디자인: 기본 HTML 느낌이 아닌, 다듬어진 UI. 적절한 패딩, 정렬, 색상 대비`,

  "ai-automation": `## 퀄리티 기준 (중요)
실제로 매일 돌려도 문제없는, 안정적인 자동화 도구여야 합니다:
- 안정성: 네트워크 오류, API 제한, 파일 없음 등 예외 상황에서도 크래시 없이 처리
- 재현성: 같은 설정으로 실행하면 같은 결과. 랜덤 요소가 있다면 시드 설정 가능하게
- 투명성: 무엇을 처리했고, 무엇을 건너뛰었는지 로그로 명확히 확인 가능
- 효율성: 불필요한 API 호출 최소화. 이미 처리한 항목은 건너뛰기
- 설정 용이성: .env와 config.json만 수정하면 다른 환경에서도 바로 동작`,

  webapp: `## 퀄리티 기준 (중요)
실제 서비스 중인 웹앱처럼 보이고 동작해야 합니다:
- 샘플 데이터: 빈 앱이 아닌, 주제에 맞는 현실적인 샘플 데이터 5~10개가 미리 들어있어야 합니다
- 상태 관리: 새로고침해도 데이터가 유지되어야 합니다 (localStorage)
- 에러 방지: 잘못된 입력, 빈 제출 등 사용자 실수를 미리 방어
- 비어있을 때: "아직 데이터가 없습니다" 화면이 아닌, 첫 데이터를 만들도록 자연스럽게 유도하는 안내
- 반응형: 모바일에서도 핵심 기능을 불편 없이 사용 가능`,
};

const ANTI_SLOP_RULES = `## 절대 하지 말 것
- "Lorem ipsum" 또는 아무 의미 없는 임시 텍스트 사용 금지
- 모든 섹션이 똑같은 3열 카드 레이아웃으로 반복되는 것 금지
- 무지개색 그라디언트, 과도한 그림자, 네온 컬러 사용 금지
- "환영합니다!", "최고의 서비스", "혁신적인 솔루션" 같은 의미 없는 마케팅 문구 금지
- 의미 없는 아이콘 남발 금지
- 과도한 애니메이션이나 화려한 효과 금지. 목적이 있는 인터랙션만 사용하세요`;

const COMPLETION_BY_TYPE: Record<ProjectType, string> = {
  website: `## 완료 후
모두 완성되면 아래 내용을 정리해서 알려주세요:
1. 브라우저에서 열어 확인하는 방법
2. 모바일 확인 방법 (크롬 개발자도구 → 반응형 모드)
3. 텍스트나 이미지를 바꾸고 싶을 때 수정할 파일과 위치
4. 다음 단계로 추가하면 좋을 기능 2~3개 제안`,

  "chrome-extension": `## 완료 후
모두 완성되면 아래 내용을 정리해서 알려주세요:
1. 크롬에 설치하는 방법 (단계별)
2. 주요 기능 사용법
3. 기능 수정 시 어떤 파일을 보면 되는지
4. 크롬 웹스토어 등록을 위해 추가로 필요한 것`,

  "ai-automation": `## 완료 후
모두 완성되면 아래 내용을 정리해서 알려주세요:
1. 설치 및 실행 방법 (환경변수 설정 포함)
2. 설정 파일 수정 가이드 (각 옵션 설명)
3. dry-run 모드로 테스트하는 방법
4. 다음 단계로 추가하면 좋을 기능 2~3개 제안`,

  webapp: `## 완료 후
모두 완성되면 아래 내용을 정리해서 알려주세요:
1. 로컬 실행 및 확인 방법
2. 주요 기능별 사용 가이드
3. 데이터 구조 변경 시 수정할 파일과 방법
4. 다음 단계로 추가하면 좋을 기능 2~3개 제안`,
};

export function buildClaudePrompt(input: PromptBuilderInput): string {
  const typeOption = PROJECT_TYPE_OPTIONS.find(
    (o) => o.value === input.projectType
  );
  const featureOptions = FEATURES_BY_TYPE[input.projectType];
  if (!featureOptions) {
    throw new Error(`유효하지 않은 프로젝트 유형입니다: ${input.projectType}`);
  }
  const trimmedTopic = input.topic?.trim();
  if (!trimmedTopic) {
    throw new Error("주제를 입력해 주세요. (예: 카페 소개, 개인 포트폴리오)");
  }
  const trimmedReferenceUrl = input.referenceUrl?.trim() || undefined;
  if (trimmedReferenceUrl) {
    if (
      !trimmedReferenceUrl.startsWith("http://") &&
      !trimmedReferenceUrl.startsWith("https://")
    ) {
      throw new Error(
        "referenceUrl은 http:// 또는 https://로 시작해야 합니다"
      );
    }
  }
  const selectedFeatures = featureOptions.filter((f) =>
    input.features.includes(f.value)
  );

  const typeLabel = typeOption?.label ?? input.projectType;
  const customText = input.customFeature?.trim();
  const lines = selectedFeatures.map((f) => `- ${f.label}`);
  if (customText) lines.push(`- ${customText}`);
  const featureList = lines.length > 0 ? lines.join("\n") : "- 기본 기능";

  // 외부 API가 필요한 기능 목록
  const externalApiFeatures = ["map", "payment", "newsletter", "order-status"];
  const needsExternalApi = selectedFeatures.some((f) =>
    externalApiFeatures.includes(f.value)
  );

  const referenceSection = trimmedReferenceUrl
    ? `\n## 참고 서비스\n${trimmedReferenceUrl}\n이 서비스의 구조, 정보 배치, 사용자 흐름을 참고하되, 디자인은 "${trimmedTopic}"에 맞게 새로 만들어 주세요. 그대로 복사하지 마세요.`
    : "";

  const descriptionSection = input.description
    ? `\n## 추가 요청 사항\n${input.description}`
    : "";

  const noExternalApiLine = needsExternalApi
    ? ""
    : "\n- 외부 API 연동 없이 만들어 주세요. API 키 발급이 필요한 기능은 쓰지 마세요.";

  const persona = PERSONA_BY_TYPE[input.projectType];
  const techStack = TECH_STACK_BY_TYPE[input.projectType];
  const designGuidance = DESIGN_GUIDANCE_BY_TYPE[input.projectType];
  const workStyle = WORK_STYLE_BY_TYPE[input.projectType];
  const devGuidelines = DEV_GUIDELINES_BY_TYPE[input.projectType];
  const qualityRules = QUALITY_RULES_BY_TYPE[input.projectType].replace(
    "{topic}",
    trimmedTopic
  );
  const completion = COMPLETION_BY_TYPE[input.projectType];

  return `# "${trimmedTopic}" ${typeLabel} 만들기

${persona}

## 프로젝트 개요
"${trimmedTopic}" 주제로 ${typeLabel}을(를) 처음부터 끝까지 완성해 주세요.
복사해서 바로 쓸 수 있는 수준으로, 빈칸이나 미완성 부분 없이 모든 콘텐츠가 채워진 상태여야 합니다.

## 필요한 기능
${featureList}${referenceSection}${descriptionSection}

${techStack}

${designGuidance}

${workStyle}
- 기술 용어가 나오면 일상적인 비유로 쉽게 풀어서 설명해 주세요.

${devGuidelines}${noExternalApiLine}

${qualityRules}

${ANTI_SLOP_RULES}

${completion}`;
}
