import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/layout/nav";
import TerminalTyping from "@/components/terminal-typing";
import { ComingSoonCard } from "@/components/coming-soon-card";
import {
  Settings2,
  Wand2,
  AlertCircle,
  BookOpen,
  MonitorSmartphone,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 pb-6 pt-12 lg:pb-8 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-medium text-orange-500 dark:text-amber-400">
                Claude Code + CodeRecipe
              </p>
              <h1 className="mb-5 text-5xl font-bold tracking-tight text-stone-800 dark:text-stone-100 sm:text-6xl">
                코딩 없이{" "}
                <span className="text-amber-500 dark:text-amber-400">
                  앱을 만들어요
                </span>
              </h1>
              <p className="mb-8 max-w-lg text-lg text-stone-600 dark:text-stone-400">
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
              <p className="mt-6 text-sm text-stone-400 dark:text-stone-500">
                코딩 경험 없어도 괜찮아요 · 완전 무료
              </p>
            </div>

            {/* Animated terminal */}
            <TerminalTyping />
          </div>
        </section>

        {/* Tools */}
        <section>
          <div className="container mx-auto px-4 py-16">
            <h2 className="mb-10 text-2xl font-bold text-stone-800 dark:text-stone-100">
              무엇을 도와드릴까요?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative h-40 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 px-6 py-6 transition-all duration-300 hover:border-transparent hover:bg-recipe-primary hover:shadow-lg dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-recipe-primary"
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

        {/* Steps */}
        <section>
          <div className="container mx-auto px-4 py-16">
            <h2 className="mb-10 text-2xl font-bold text-stone-800 dark:text-stone-100">
              3단계로 앱이 완성돼요
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-stone-200 text-sm font-bold text-stone-500 dark:border-stone-700 dark:text-stone-400">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-stone-800 dark:text-stone-100">
                      {s.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-700">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            CodeRecipe
          </span>
          <div className="flex flex-wrap gap-4 text-xs text-stone-400 dark:text-stone-500">
            <Link href="/setup" className="hover:text-stone-700 dark:hover:text-stone-300">
              환경 진단
            </Link>
            <Link href="/guide" className="hover:text-stone-700 dark:hover:text-stone-300">
              Claude Code 가이드
            </Link>
            <Link href="/builder" className="hover:text-stone-700 dark:hover:text-stone-300">
              레시피 만들기
            </Link>
            <Link href="/error-translator" className="hover:text-stone-700 dark:hover:text-stone-300">
              에러 번역기
            </Link>
            <Link href="/glossary" className="hover:text-stone-700 dark:hover:text-stone-300">
              용어 사전
            </Link>
            <Link href="/faq" className="hover:text-stone-700 dark:hover:text-stone-300">
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const tools: {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
}[] = [
  {
    href: "/setup",
    icon: Settings2,
    title: "환경 진단",
  },
  {
    href: "/guide",
    icon: MonitorSmartphone,
    title: "Claude Code 가이드",
  },
  {
    href: "/builder",
    icon: Wand2,
    title: "레시피 만들기",
  },
  {
    href: "/error-translator",
    icon: AlertCircle,
    title: "에러 번역기",
  },
  {
    href: "/glossary",
    icon: BookOpen,
    title: "용어 사전",
  },
  {
    href: "/faq",
    icon: HelpCircle,
    title: "자주 묻는 질문",
  },
];

const soonTools: { title: string; iconName: string }[] = [
  { title: "내 앱 세상에 공개하기", iconName: "Rocket" },
  { title: "다음에 뭐 하지?", iconName: "Compass" },
];

const steps = [
  {
    title: "환경 설정",
    description: "필요한 프로그램을 확인하고 설치해요. 클릭 몇 번으로 끝나요.",
  },
  {
    title: "레시피 만들기",
    description:
      "만들고 싶은 앱을 설명하면 Claude Code 프롬프트가 자동으로 완성돼요.",
  },
  {
    title: "앱 완성",
    description:
      "만들어진 프롬프트를 Claude Code에 붙여넣으면 AI가 코드를 작성해줘요.",
  },
];
