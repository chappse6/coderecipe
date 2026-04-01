import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-purple-100 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <span className="text-xl">🍳</span>
            <span>CodeRecipe</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/setup" className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-400 dark:hover:bg-gray-800">환경 진단</Link>
            <Link href="/builder" className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-400 dark:hover:bg-gray-800">프롬프트 빌더</Link>
            <Link href="/error-translator" className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800">에러 번역기</Link>
            <Link href="/glossary" className="hidden rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-400 dark:hover:bg-gray-800 sm:block">용어 사전</Link>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
          🍳 코딩 레시피로 누구나 개발자가 될 수 있어요
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          코딩 없이{" "}
          <span className="text-purple-600 dark:text-purple-400">앱을 만들어요</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
          원하는 앱을 설명하면 Claude Code가 단계별 레시피를 만들어 드려요.
          요리하듯 따라하면 어느새 나만의 앱이 완성됩니다.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8" asChild>
            <Link href="/builder">레시피 시작하기</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8" asChild>
            <Link href="/setup">환경 진단 먼저</Link>
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          코딩 경험 없어도 괜찮아요 · 5분이면 시작할 수 있어요 · 완전 무료
        </p>
      </section>

      {/* Quick Access Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/setup" className="group rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-sm hover:border-purple-400 hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-3 text-3xl">🔧</div>
            <h3 className="mb-1 font-bold text-gray-900 dark:text-white">환경 진단</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">필수 프로그램 설치 여부 확인 + 단계별 설치 가이드</p>
            <span className="mt-3 inline-block text-sm font-medium text-purple-600 group-hover:underline dark:text-purple-400">시작하기 →</span>
          </Link>
          <Link href="/builder" className="group rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-sm hover:border-purple-400 hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-3 text-3xl">✨</div>
            <h3 className="mb-1 font-bold text-gray-900 dark:text-white">프롬프트 빌더</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">질문 3개로 Claude Code 프롬프트 자동 생성</p>
            <span className="mt-3 inline-block text-sm font-medium text-purple-600 group-hover:underline dark:text-purple-400">시작하기 →</span>
          </Link>
          <Link href="/error-translator" className="group rounded-2xl border-2 border-red-100 bg-white p-6 shadow-sm hover:border-red-400 hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-3 text-3xl">🔴</div>
            <h3 className="mb-1 font-bold text-gray-900 dark:text-white">에러 번역기</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">에러 메시지를 한국어로 설명 + 해결 요청문 생성</p>
            <span className="mt-3 inline-block text-sm font-medium text-red-500 group-hover:underline dark:text-red-400">사용하기 →</span>
          </Link>
          <Link href="/glossary" className="group rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-sm hover:border-purple-400 hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-3 text-3xl">📚</div>
            <h3 className="mb-1 font-bold text-gray-900 dark:text-white">용어 사전</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">개발 용어를 쉬운 한국어로 설명해 드려요</p>
            <span className="mt-3 inline-block text-sm font-medium text-purple-600 group-hover:underline dark:text-purple-400">보러 가기 →</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          CodeRecipe가 특별한 이유
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2 text-3xl">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          3단계로 앱이 완성돼요
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+3rem)] top-8 hidden h-0.5 w-[calc(100%-6rem)] bg-purple-200 dark:bg-purple-800 sm:block" />
              )}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl dark:bg-purple-900/40">
                {s.icon}
              </div>
              <div className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">
                {i + 1}단계
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{s.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            🍳 CodeRecipe
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            코딩을 몰라도 AI와 함께라면 누구나 앱을 만들 수 있어요.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/setup" className="hover:text-purple-600 dark:hover:text-purple-400">환경 진단</Link>
            <Link href="/builder" className="hover:text-purple-600 dark:hover:text-purple-400">프롬프트 빌더</Link>
            <Link href="/error-translator" className="hover:text-red-500">에러 번역기</Link>
            <Link href="/glossary" className="hover:text-purple-600 dark:hover:text-purple-400">용어 사전</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const steps = [
  {
    icon: "🔧",
    title: "환경 설정",
    description: "필요한 프로그램을 확인하고 설치해요. 클릭 몇 번으로 끝나요.",
  },
  {
    icon: "✨",
    title: "레시피 만들기",
    description: "만들고 싶은 앱을 설명하면 Claude Code 프롬프트가 자동으로 완성돼요.",
  },
  {
    icon: "🚀",
    title: "앱 완성",
    description: "만들어진 프롬프트를 Claude Code에 붙여넣으면 AI가 코드를 작성해줘요.",
  },
];

const features = [
  {
    icon: "🍳",
    title: "단계별 레시피",
    description:
      "복잡한 개발도 요리처럼 쉽게. 한 단계씩 따라하면 완성됩니다.",
  },
  {
    icon: "🤖",
    title: "Claude Code 연동",
    description:
      "MCP 플러그인으로 Claude Code와 직접 연결. AI가 코드를 대신 작성해요.",
  },
  {
    icon: "🌏",
    title: "한국어 완벽 지원",
    description:
      "한국어로 설명하고 한국어 레시피를 받아요. 번역 걱정 없이 바로 시작하세요.",
  },
  {
    icon: "⚡",
    title: "즉시 시작",
    description:
      "설치 없이 웹에서 바로 시작. 아이디어가 떠오르면 지금 바로 만들어보세요.",
  },
  {
    icon: "📚",
    title: "레시피 라이브러리",
    description:
      "커뮤니티가 만든 검증된 레시피를 활용하세요. 처음부터 만들 필요 없어요.",
  },
  {
    icon: "🎯",
    title: "난이도별 분류",
    description:
      "초급부터 고급까지. 내 수준에 맞는 레시피로 천천히 성장하세요.",
  },
];
