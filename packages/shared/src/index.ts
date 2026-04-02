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

export type ProjectType = "website" | "chrome-extension" | "chatbot" | "webapp";

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
    value: "chatbot",
    label: "챗봇",
    emoji: "🤖",
    description: "카카오톡, 슬랙 등 메신저 봇",
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
    { value: "contact-form", label: "문의하기 양식" },
    { value: "gallery", label: "사진/이미지 갤러리" },
    { value: "blog", label: "블로그/소식 게시판" },
    { value: "map", label: "위치/지도 안내" },
    { value: "newsletter", label: "이메일 구독 신청" },
    { value: "multilang", label: "다국어 지원" },
  ],
  "chrome-extension": [
    { value: "popup", label: "버튼 클릭으로 열리는 창" },
    { value: "page-modify", label: "웹페이지 내용 변경" },
    { value: "screenshot", label: "화면 캡처" },
    { value: "bookmark", label: "북마크/저장 기능" },
    { value: "notification", label: "알림 보내기" },
    { value: "context-menu", label: "마우스 우클릭 메뉴" },
  ],
  chatbot: [
    { value: "faq", label: "자주 묻는 질문 자동 답변" },
    { value: "reservation", label: "예약/일정 잡기" },
    { value: "product-recommend", label: "상품 추천" },
    { value: "survey", label: "설문/피드백 수집" },
    { value: "reminder", label: "일정 알림 보내기" },
    { value: "order-status", label: "주문 현황 안내" },
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
  features: string[];
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

export function translateError(errorMessage: string): TranslateErrorResult {
  const trimmed = errorMessage.trim();

  for (const pattern of ERROR_PATTERNS) {
    if (pattern.pattern.test(trimmed)) {
      return {
        matched: true,
        errorId: pattern.id,
        title: pattern.title,
        explanation: pattern.explanation,
        suggestedPrompt: `${pattern.suggestedPrompt}\n\n에러 내용:\n${trimmed}`,
      };
    }
  }

  // Generic fallback
  return {
    matched: false,
    title: "알 수 없는 오류",
    explanation: "이 오류의 정확한 유형은 파악하기 어렵지만, Claude Code에게 전달하면 분석해줄 수 있어요.",
    suggestedPrompt: `다음 오류가 발생했어요. 원인을 분석하고 해결 방법을 알려주세요:\n\n${trimmed}`,
  };
}

export function buildClaudePrompt(input: PromptBuilderInput): string {
  const typeOption = PROJECT_TYPE_OPTIONS.find(
    (o) => o.value === input.projectType
  );
  const featureOptions = FEATURES_BY_TYPE[input.projectType];
  if (!featureOptions) {
    throw new Error(`유효하지 않은 프로젝트 유형입니다: ${input.projectType}`);
  }
  if (input.referenceUrl && input.referenceUrl.trim()) {
    if (
      !input.referenceUrl.startsWith("http://") &&
      !input.referenceUrl.startsWith("https://")
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
  const featureList =
    selectedFeatures.length > 0
      ? selectedFeatures.map((f) => `- ${f.label}`).join("\n")
      : "- 기본 기능";

  const referenceSection = input.referenceUrl
    ? `\n## 참고 서비스\n${input.referenceUrl}`
    : "";

  const descriptionSection = input.description
    ? `\n## 추가 요청 사항\n${input.description}`
    : "";

  return `# ${typeLabel} 만들기 요청

## 프로젝트 유형
${typeLabel} (${typeOption?.description ?? ""})

## 필요한 기능
${featureList}${referenceSection}${descriptionSection}

## 개발 지침
- 한국어 사용자를 위한 서비스로, 모든 UI 텍스트는 한국어로 작성해 주세요.
- 초보자도 바로 실행할 수 있도록 설치 방법과 실행 방법을 README에 포함해 주세요.
- 가능한 한 단순하고 직관적인 디자인으로 만들어 주세요.
- 필요한 패키지 설치 명령어를 명확히 안내해 주세요.

지금 바로 위 내용으로 ${typeLabel}을 만들어 주세요!`;
}
