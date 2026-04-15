import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/layout/nav";
import TerminalTyping from "@/components/terminal-typing";
import { ComingSoonCard } from "@/components/coming-soon-card";
import { ScrollSteps } from "@/components/landing/scroll-steps";
import { StatsSection } from "@/components/landing/stats-section";
import { FinalCta } from "@/components/landing/final-cta";
import {
  Settings2,
  Wand2,
  AlertCircle,
  BookOpen,
  MonitorSmartphone,
  HelpCircle,
  ChefHat,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Github,
  Compass,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />

      <main>
        {/* First screen: Hero + Tools */}
        <div className="lg:flex lg:min-h-[calc(100dvh-57px)] lg:flex-col">
          {/* Hero */}
          <section className="lg:flex lg:flex-1 lg:items-center">
            <div className="container mx-auto grid items-center gap-8 px-4 py-8 lg:grid-cols-2 lg:gap-8">
              <div>
                <p className="mb-2 text-sm font-medium text-orange-500 dark:text-amber-400">
                  Claude Code + CodeRecipe
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight text-stone-800 dark:text-stone-100 lg:text-5xl">
                  코딩 없이{" "}
                  <span className="text-amber-500 dark:text-amber-400">
                    앱을 만들어요
                  </span>
                </h1>
                <p className="mb-5 max-w-lg text-base text-stone-600 dark:text-stone-400 lg:text-lg">
                  원하는 앱을 설명하면 Claude Code가 단계별 레시피를 만들어 드려요.
                  요리하듯 따라하면 어느새 나만의 앱이 완성됩니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-recipe-primary hover:bg-recipe-primary-hover text-stone-800"
                    asChild
                  >
                    <Link href="/builder">레시피 시작하기</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/setup">환경 진단 먼저</Link>
                  </Button>
                </div>
                <p className="mt-3 text-sm text-stone-400 dark:text-stone-500">
                  코딩 경험 없어도 괜찮아요
                </p>
              </div>

              {/* Animated terminal */}
              <TerminalTyping height={280} />
            </div>
          </section>

          {/* Tools */}
          <section id="tools" className="lg:flex-shrink-0">
            <div className="container mx-auto px-4 pb-6 pt-4">
              <h2 className="mb-5 text-2xl font-bold text-stone-800 dark:text-stone-100">
                무엇을 도와드릴까요?
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative h-32 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5 transition-all duration-300 hover:border-transparent hover:bg-recipe-primary hover:shadow-lg dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-recipe-primary"
                >
                  <h3 className="relative z-10 text-xl font-bold text-amber-500 transition-colors duration-300 group-hover:text-stone-800 dark:text-amber-400">
                    {tool.title}
                  </h3>
                  <tool.icon
                    className="absolute -bottom-8 -right-8 h-36 w-36 text-amber-500/25 transition-colors duration-300 group-hover:text-stone-800/15"
                    strokeWidth={2}
                  />
                </Link>
              ))}
              {soonTools.map((tool) => (
                <ComingSoonCard key={tool.title} title={tool.title} iconName={tool.iconName} />
              ))}
            </div>
          </div>
        </section>
        </div>

        {/* Steps — scroll-based with sticky GIF */}
        <ScrollSteps />
        {/* Before / After */}
        <section className="bg-stone-50 dark:bg-stone-900">
          <div className="container mx-auto px-4 py-24 lg:py-32">
            <div className="mb-16 text-center">
              <p className="mb-3 text-center text-sm font-medium tracking-wide text-amber-500 uppercase">
                Before → After
              </p>
              <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 sm:text-4xl lg:text-5xl">
                이렇게 말하면, 이런 앱이 나와요
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-stone-500 dark:text-stone-400">
                한 줄 설명만 입력하면 Claude Code가 완성된 앱을 만들어 드려요
              </p>
            </div>

            <div className="mx-auto max-w-5xl space-y-8">
              {demos.map((demo) => (
                <div
                  key={demo.title}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800"
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Before — 프롬프트 */}
                    <div className="flex flex-col justify-center border-b border-stone-200 p-6 lg:border-b-0 lg:border-r dark:border-stone-700">
                      <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 dark:bg-stone-700 dark:text-stone-400">
                        입력
                      </span>
                      <p className="text-lg font-medium leading-relaxed text-stone-800 dark:text-stone-100">
                        &ldquo;{demo.prompt}&rdquo;
                      </p>
                    </div>
                    {/* After — 결과 미리보기 */}
                    <div className="bg-stone-50 p-6 dark:bg-stone-900">
                      <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                        결과
                      </span>
                      <p className="mb-3 font-semibold text-stone-800 dark:text-stone-100">
                        {demo.title}
                      </p>
                      {/* 목업 UI */}
                      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-600 dark:bg-stone-800">
                        {/* 브라우저 탑바 */}
                        <div className="flex items-center gap-1.5 border-b border-stone-200 bg-stone-100 px-3 py-2 dark:border-stone-600 dark:bg-stone-700">
                          <div className="h-2 w-2 rounded-full bg-red-400" />
                          <div className="h-2 w-2 rounded-full bg-yellow-400" />
                          <div className="h-2 w-2 rounded-full bg-green-400" />
                          <div className="ml-2 h-4 flex-1 rounded bg-stone-200 dark:bg-stone-600" />
                        </div>
                        {/* 앱 내용 스켈레톤 */}
                        <div className="space-y-3 p-4">
                          {demo.skeleton}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {demo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500 dark:bg-stone-700 dark:text-stone-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                size="lg"
                className="gap-2 bg-recipe-primary text-stone-800 hover:bg-recipe-primary-hover"
                asChild
              >
                <Link href="/builder">
                  나도 만들어보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Persona */}
        <section>
          <div className="container mx-auto px-4 py-24 lg:py-32">
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium tracking-wide text-amber-500 uppercase">
                Who is it for
              </p>
              <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 sm:text-4xl lg:text-5xl">
                이런 분을 위한 서비스예요
              </h2>
              <p className="mt-4 text-lg text-stone-500 dark:text-stone-400">
                코딩을 모르는 분도, 조금 아는 분도, 누구나 환영합니다
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:gap-8">
              {personas.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-2xl border border-stone-200 bg-white p-8 transition-all hover:border-amber-300 hover:shadow-lg dark:border-stone-700 dark:bg-stone-800 dark:hover:border-amber-500/50"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-colors group-hover:bg-amber-100 dark:bg-amber-900/30 dark:group-hover:bg-amber-900/50">
                    <p.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-stone-800 dark:text-stone-100">
                    {p.title}
                  </h3>
                  <p className="mb-4 text-base leading-relaxed text-stone-500 dark:text-stone-400">
                    {p.description}
                  </p>
                  <p className="text-base font-medium text-amber-600 dark:text-amber-400">
                    &ldquo;{p.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* Final CTA */}
        <FinalCta />
      </main>

      <footer className="border-t border-stone-200 bg-amber-50/50 dark:border-stone-700 dark:bg-stone-900">
        <div className="container mx-auto px-4 pt-10">
          {/* Top row: logo + description left, links right */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-stone-800 dark:text-stone-100">
                <ChefHat className="h-6 w-6 text-amber-500" />
                CodeRecipe
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-stone-500 sm:justify-end dark:text-stone-400">
              <Link href="/setup" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                환경 진단
              </Link>
              <Link href="/guide" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                가이드
              </Link>
              <Link href="/direction" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                방향 잡기
              </Link>
              <Link href="/builder" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                레시피 만들기
              </Link>
              <Link href="/error-translator" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                에러 번역기
              </Link>
              <Link href="/glossary" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                용어 사전
              </Link>
              <Link href="/faq" className="transition-colors hover:text-stone-800 dark:hover:text-stone-200">
                FAQ
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-stone-400 dark:text-stone-500">
            <span>© 2026 CodeRecipe</span>
            <span className="h-3 w-px bg-stone-300 dark:bg-stone-600" />
            <span className="flex items-center gap-1.5">
              Built by Seeun
              <a
                href="https://github.com/chappse6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition-colors hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </span>
          </div>
        </div>

        {/* Illustration — full width, flush bottom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/coderecipe/images/footer-illustration.png"
          alt="CodeRecipe — 코드 재료를 요리하는 일러스트"
          className="mt-4 mx-auto block w-full max-w-[1504px] object-contain dark:opacity-80"
        />
      </footer>
    </div>
  );
}

const tools = [
  {
    href: "/setup" as const,
    icon: Settings2,
    title: "환경 진단",
  },
  {
    href: "/direction" as const,
    icon: Compass,
    title: "방향 잡기",
  },
  {
    href: "/builder" as const,
    icon: Wand2,
    title: "레시피 만들기",
  },
  {
    href: "/error-translator" as const,
    icon: AlertCircle,
    title: "에러 번역기",
  },
  {
    href: "/guide" as const,
    icon: MonitorSmartphone,
    title: "Claude Code 가이드",
  },
  {
    href: "/glossary" as const,
    icon: BookOpen,
    title: "용어 사전",
  },
  {
    href: "/faq" as const,
    icon: HelpCircle,
    title: "자주 묻는 질문",
  },
];

const soonTools: { title: string; iconName: string }[] = [
  { title: "내 앱 세상에 공개하기", iconName: "Rocket" },
];


const demos: {
  prompt: string;
  title: string;
  tags: string[];
  skeleton: React.ReactNode;
}[] = [
  {
    prompt: "할 일을 추가하고 완료 체크할 수 있는 투두앱 만들어줘",
    title: "Todo 앱",
    tags: ["React", "LocalStorage", "반응형"],
    skeleton: (
      <>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-amber-400" />
          <div className="h-3 w-32 rounded bg-stone-200 dark:bg-stone-600" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded border-2 border-green-400 bg-green-400">
            <span className="text-[8px] text-white">✓</span>
          </div>
          <div className="h-3 w-24 rounded bg-stone-200 line-through dark:bg-stone-600" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-amber-400" />
          <div className="h-3 w-40 rounded bg-stone-200 dark:bg-stone-600" />
        </div>
        <div className="mt-2 flex gap-2">
          <div className="h-7 flex-1 rounded bg-stone-100 dark:bg-stone-700" />
          <div className="h-7 w-14 rounded bg-amber-400" />
        </div>
      </>
    ),
  },
  {
    prompt: "내 이름, 기술 스택, 프로젝트를 보여주는 포트폴리오 사이트",
    title: "포트폴리오 사이트",
    tags: ["Next.js", "반응형", "다크모드"],
    skeleton: (
      <>
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-stone-800 dark:bg-stone-200" />
          <div className="flex gap-3">
            <div className="h-2 w-10 rounded bg-stone-200 dark:bg-stone-600" />
            <div className="h-2 w-10 rounded bg-stone-200 dark:bg-stone-600" />
            <div className="h-2 w-10 rounded bg-stone-200 dark:bg-stone-600" />
          </div>
        </div>
        <div className="mt-2 space-y-2 py-4">
          <div className="h-5 w-48 rounded bg-stone-800 dark:bg-stone-200" />
          <div className="h-3 w-64 rounded bg-stone-200 dark:bg-stone-600" />
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-14 rounded-full bg-amber-100 dark:bg-amber-900/40" />
            <div className="h-5 w-16 rounded-full bg-blue-100 dark:bg-blue-900/40" />
            <div className="h-5 w-12 rounded-full bg-green-100 dark:bg-green-900/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded bg-stone-100 dark:bg-stone-700" />
          <div className="h-16 rounded bg-stone-100 dark:bg-stone-700" />
        </div>
      </>
    ),
  },
  {
    prompt: "우리 카페 메뉴판이랑 위치를 보여주는 홈페이지",
    title: "카페 홈페이지",
    tags: ["웹사이트", "지도 연동", "메뉴판"],
    skeleton: (
      <>
        <div className="h-20 rounded bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20" />
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1 rounded bg-stone-50 p-2 dark:bg-stone-700">
            <div className="h-2 w-14 rounded bg-stone-300 dark:bg-stone-500" />
            <div className="h-2 w-8 rounded bg-amber-300" />
          </div>
          <div className="space-y-1 rounded bg-stone-50 p-2 dark:bg-stone-700">
            <div className="h-2 w-12 rounded bg-stone-300 dark:bg-stone-500" />
            <div className="h-2 w-8 rounded bg-amber-300" />
          </div>
          <div className="space-y-1 rounded bg-stone-50 p-2 dark:bg-stone-700">
            <div className="h-2 w-16 rounded bg-stone-300 dark:bg-stone-500" />
            <div className="h-2 w-8 rounded bg-amber-300" />
          </div>
        </div>
        <div className="h-14 rounded bg-green-50 dark:bg-green-900/20" />
      </>
    ),
  },
];

const personas = [
  {
    icon: Briefcase,
    title: "사이드 프로젝트가 하고 싶은 직장인",
    description:
      "아이디어는 있는데 개발자를 구하기 어렵고, 외주 맡기기엔 비용이 부담되는 분",
    quote: "주말에 혼자서 MVP 하나 뚝딱 만들어보고 싶어요",
  },
  {
    icon: GraduationCap,
    title: "포트폴리오가 필요한 학생",
    description:
      "취업 준비에 포트폴리오가 필요한데, 코딩 수업만으로는 결과물을 만들기 어려운 분",
    quote: "면접에서 보여줄 프로젝트가 하나도 없어요",
  },
  {
    icon: Lightbulb,
    title: "업무를 자동화하고 싶은 비개발자",
    description:
      "반복 업무를 줄이고 싶은데, 엑셀 매크로 수준을 넘어서는 도구가 필요한 분",
    quote: "매일 똑같은 작업을 수작업으로 하는 게 너무 비효율적이에요",
  },
];
