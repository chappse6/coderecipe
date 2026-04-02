import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/layout/nav";
import {
  Settings2,
  Wand2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Terminal,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 lg:py-28">
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
                  className="bg-amber-400 hover:bg-amber-500 text-stone-800"
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

            {/* Sample prompt card */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-1.5 border-b border-gray-200 px-4 py-2.5 dark:border-gray-700">
                <Terminal className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">생성된 프롬프트 예시</span>
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                {`# 쇼핑몰 웹앱 만들기

## 프로젝트 유형
Next.js + TypeScript 웹앱

## 주요 기능
- 상품 목록 및 상세 페이지
- 장바구니 시스템
- 결제 및 주문 관리

## 참고 서비스
https://coupang.com

## 요청사항
모바일 화면 우선으로 디자인해 주세요.
메인 색상은 파란색 계열로 부탁드려요.`}
              </pre>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="border-t border-amber-100 dark:border-stone-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="mb-10 text-2xl font-bold text-stone-800 dark:text-stone-100">
              무엇을 도와드릴까요?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-lg border border-amber-100 bg-white p-5 transition-all hover:border-amber-300 hover:shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:hover:border-stone-600"
                >
                  <tool.icon className="mb-3 h-5 w-5 text-stone-500 dark:text-stone-400" />
                  <h3 className="mb-1 font-semibold text-stone-800 dark:text-stone-100">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {tool.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-orange-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-amber-400">
                    시작하기 <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="border-t border-amber-100 dark:border-stone-700">
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

      <footer className="border-t border-amber-100 dark:border-stone-700">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            CodeRecipe
          </span>
          <div className="flex gap-4 text-xs text-stone-400 dark:text-stone-500">
            <Link href="/setup" className="hover:text-stone-700 dark:hover:text-stone-300">
              환경 진단
            </Link>
            <Link href="/builder" className="hover:text-stone-700 dark:hover:text-stone-300">
              프롬프트 빌더
            </Link>
            <Link href="/error-translator" className="hover:text-stone-700 dark:hover:text-stone-300">
              에러 번역기
            </Link>
            <Link href="/glossary" className="hover:text-stone-700 dark:hover:text-stone-300">
              용어 사전
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const tools: {
  href: "/setup" | "/builder" | "/error-translator" | "/glossary";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}[] = [
  {
    href: "/setup",
    icon: Settings2,
    title: "환경 진단",
    description: "필수 프로그램 설치 여부 확인 + 단계별 설치 가이드",
  },
  {
    href: "/builder",
    icon: Wand2,
    title: "프롬프트 빌더",
    description: "질문 3개로 Claude Code 프롬프트 자동 생성",
  },
  {
    href: "/error-translator",
    icon: AlertCircle,
    title: "에러 번역기",
    description: "에러 메시지를 한국어로 설명 + 해결 요청문 생성",
  },
  {
    href: "/glossary",
    icon: BookOpen,
    title: "용어 사전",
    description: "개발 용어를 쉬운 한국어로 설명해 드려요",
  },
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
