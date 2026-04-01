// CodeRecipe shared types and utilities

export interface Recipe {
  id: string;
  title: string;
  description: string;
  steps: RecipeStep[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  updatedAt: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  code?: string;
  language?: string;
}

export interface GenerateRecipeRequest {
  prompt: string;
  difficulty?: Recipe["difficulty"];
  tags?: string[];
}

export interface GenerateRecipeResponse {
  recipe: Recipe;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

export function buildClaudePrompt(input: PromptBuilderInput): string {
  const typeOption = PROJECT_TYPE_OPTIONS.find(
    (o) => o.value === input.projectType
  );
  const featureOptions = FEATURES_BY_TYPE[input.projectType];
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
