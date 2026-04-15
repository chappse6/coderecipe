"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Copy, Check, ArrowRight, BookOpen } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

interface DirectionItem {
  label: string;
  description: string;
  command?: string;
  tag?: "복붙" | "확인" | "팁";
}

interface DirectionSection {
  id: string;
  title: string;
  intro?: string;
  items: DirectionItem[];
  next?: { label: string; href?: string; sectionId?: string; hint?: string };
}

const SECTIONS: DirectionSection[] = [
  {
    id: "what",
    title: "1. 플러그인이 뭐예요?",
    intro:
      "Claude Code는 똑똑한 요리사예요. 플러그인은 그 요리사가 더 잘 일하게 해주는 '도구 모음'입니다. 두 개만 깔면 결과물 품질이 확 달라져요.",
    items: [
      {
        label: "gstack — 같이 회의해주는 동료",
        description:
          "'뭘 만들지' 명확히 정해주는 도우미. 혼자 머릿속에서 정리하기 어려운 아이디어를, Claude가 질문을 던져서 끌어내 줍니다. 시작하기 전에 30분 같이 회의하는 느낌이에요.",
      },
      {
        label: "superpowers — 안전하게 진행해주는 매니저",
        description:
          "큰 작업을 작은 단위로 쪼개서 하나씩 안전하게 처리해줘요. '이쪽 고치니 저쪽 깨졌어요' 같은 사고를 막아주는 안전장치라고 생각하시면 됩니다.",
      },
      {
        label: "왜 둘 다 필요한가요?",
        description:
          "gstack은 '뭘 만들지'를 정해주고, superpowers는 '어떻게 안전하게 만들지'를 도와줘요. 회의 없이 바로 공사하면 결과물이 엇나가는 것처럼, 둘 다 있어야 흐름이 매끄러워집니다.",
        tag: "팁",
      },
    ],
    next: { label: "다음", sectionId: "install" },
  },
  {
    id: "install",
    title: "2. 설치하기",
    intro:
      "두 플러그인의 설치 방법이 조금 달라요. gstack은 터미널에서 직접 설치하고, Superpowers는 Claude Code 안에서 마켓플레이스로 설치합니다. 순서대로 따라오면 5분이면 끝나요.",
    items: [
      {
        label: "먼저 — Bun이 필요해요",
        description:
          "gstack을 설치하려면 Bun이라는 도구가 필요해요. 터미널에 아래 명령어를 붙여넣어서 설치하세요. 이미 있다면 건너뛰어도 됩니다.",
        command: "curl -fsSL https://bun.sh/install | bash",
        tag: "복붙",
      },
      {
        label: "gstack 설치 — 터미널에서",
        description:
          "터미널(Claude Code 바깥, 검은 화면)에 아래 두 줄을 차례로 붙여넣으세요. 첫 줄은 gstack을 내려받고, 두 번째 줄은 필요한 것들을 자동으로 준비합니다.",
        command:
          "git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack",
        tag: "복붙",
      },
      {
        label: "gstack 설정 스크립트 실행",
        description:
          "이어서 이 한 줄을 붙여넣으면 의존성 설치와 브라우저 바이너리 컴파일까지 자동으로 처리돼요. 완료 메시지가 뜰 때까지 잠깐 기다리세요.",
        command: "~/.claude/skills/gstack/setup",
        tag: "복붙",
      },
      {
        label: "Claude Code 켜기",
        description:
          "터미널에 claude 를 입력해서 Claude Code를 실행하세요. 이제 Superpowers를 설치할 차례입니다.",
        command: "claude",
        tag: "복붙",
      },
      {
        label: "Superpowers 마켓플레이스 등록",
        description:
          "Claude Code 안에서 아래 명령어를 붙여넣으면 Superpowers가 들어있는 마켓이 등록돼요.",
        command: "/plugin marketplace add obra/superpowers-marketplace",
        tag: "복붙",
      },
      {
        label: "Superpowers 설치",
        description:
          "이어서 이 명령어로 Superpowers를 설치합니다. 설치가 끝나면 Claude Code를 한 번 종료하고 다시 켜주세요. 재시작하면 session-start-hook으로 Superpowers가 자동 활성화됩니다.",
        command: "/plugin install superpowers@superpowers-marketplace",
        tag: "복붙",
      },
      {
        label: "잘 깔렸는지 체크",
        description:
          "재시작한 Claude Code에 /help 를 입력해서 명령어 목록을 보세요. /office-hours, /brainstorming 같은 gstack 명령어가 보이면 모두 준비 완료입니다.",
        command: "/help",
        tag: "확인",
      },
    ],
    next: { label: "다음", sectionId: "office-hours" },
  },
  {
    id: "office-hours",
    title: "3. 아이디어 정리 — /office-hours",
    intro:
      "가장 먼저 쓸 명령어예요. '바로 만들어줘'라고 하지 말고, 일단 같이 정리부터 합니다. Claude가 인터뷰하듯 질문을 던지고, 한국어로 답하면 됩니다.",
    items: [
      {
        label: "이걸 복붙하세요",
        description:
          "Claude Code에 그대로 입력하세요. 실행하면 Claude가 '뭘 만들고 싶으세요?' 같은 질문부터 시작합니다.",
        command: "/office-hours",
        tag: "복붙",
      },
      {
        label: "이렇게 답하세요",
        description:
          "한국어로 편하게 답해도 돼요. 모르면 '잘 모르겠어요'라고 답해도 Claude가 다른 각도로 다시 물어봐 줍니다. 정답을 맞춰야 하는 자리가 아니니 부담 갖지 마세요.",
      },
      {
        label: "끝났다는 신호",
        description:
          "Claude가 '정리해 보면 이런 아이디어네요' 하면서 요약해 주면 1단계 완료예요. 그 요약 내용을 메모장이나 다음 단계에 가져가서 쓸 거예요.",
        tag: "팁",
      },
      {
        label: "한국어로 답해달라고 미리 말하기",
        description:
          "영어로 답이 오면 답답해요. 시작할 때 '한국어로 답해줘' 한 줄 추가하면 끝까지 한국어로 진행됩니다.",
        command: "/office-hours 한국어로 답해줘",
      },
    ],
    next: { label: "다음", sectionId: "deepen" },
  },
  {
    id: "deepen",
    title: "4. 더 깊게 다듬기",
    intro:
      "office-hours로 정리한 아이디어를 더 단단하게 만드는 단계예요. 안 해도 되지만, 큰 프로젝트라면 이걸 거치면 결과물이 훨씬 좋아집니다.",
    items: [
      {
        label: "/brainstorming — 놓친 부분 검토",
        description:
          "방향이 맞는지, 빠진 요구사항이 없는지 다시 한 번 점검해줘요. 출발 전에 지도를 다시 확인하는 단계라고 보시면 됩니다.",
        command: "/brainstorming",
        tag: "복붙",
      },
      {
        label: "/writing-plans — 단계별 계획서",
        description:
          "'1단계: ..., 2단계: ...' 식으로 작업 순서를 문서로 만들어줘요. 이 계획서가 있으면 중간에 길을 잃지 않습니다. 공사 전에 받는 설계 도면 같은 거예요.",
        command: "/writing-plans",
        tag: "복붙",
      },
      {
        label: "여기까지 오면 준비 완료",
        description:
          "이 시점에 '뭘 만들지', '어떤 순서로 만들지' 둘 다 정리되어 있어요. 이제 실제로 만들 차례입니다.",
        tag: "팁",
      },
    ],
    next: {
      label: "레시피 만들기",
      href: "/builder",
      hint: "정리한 아이디어를 바탕으로 Claude Code에 바로 쓸 프롬프트를 만들어 드려요.",
    },
  },
  {
    id: "tips",
    title: "이럴 땐 이렇게",
    items: [
      {
        label: "Claude가 영어로 답할 때",
        description:
          "'한국어로 답해줘' 한 줄 보내면 됩니다. 매번 안 해도 되고, 한 번만 말해도 그 대화 내내 한국어로 응답해요.",
      },
      {
        label: "질문이 너무 많아서 지칠 때",
        description:
          "대답하기 어려운 질문은 '잘 모르겠어요, 대신 알려주세요'라고 해도 돼요. Claude가 옵션을 제시해줍니다.",
      },
      {
        label: "처음부터 다시 하고 싶을 때",
        description:
          "/clear 를 입력하면 대화가 새로 시작돼요. 방향이 너무 어긋났다면 부담 없이 다시 시작하세요.",
        command: "/clear",
      },
      {
        label: "어디까지 했는지 헷갈릴 때",
        description:
          "Claude에게 '지금까지 정리한 거 요약해줘' 하면 한눈에 보여줍니다. 메모장에 옮겨두면 더 좋아요.",
      },
    ],
  },
];

// ── Components ───────────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag: "복붙" | "확인" | "팁" }) {
  const styles = {
    복붙: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    확인: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    팁: "bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-400",
  };
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${styles[tag]}`}
    >
      {tag}
    </span>
  );
}

function CommandCopy({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-mono text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-600" /> 복사됨
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> {command}
        </>
      )}
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function DirectionGuide() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const activeSection = SECTIONS.find((s) => s.id === activeId)!;

  const goNext = () => {
    if (!activeSection.next?.sectionId) return;
    setActiveId(activeSection.next.sectionId);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left sidebar */}
      <nav className="hidden w-60 flex-shrink-0 md:block">
        <div className="sticky top-24 space-y-1">
          {SECTIONS.filter((s) => s.id !== "tips").map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveId(section.id)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                activeId === section.id
                  ? "border-l-[3px] border-amber-500 bg-amber-50 pl-[9px] text-stone-800 dark:border-amber-400 dark:bg-stone-700 dark:text-white"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              }`}
            >
              {section.title}
            </button>
          ))}

          <div className="mt-3 border-t border-stone-200 pt-3 dark:border-stone-700">
            {SECTIONS.filter((s) => s.id === "tips").map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveId(section.id)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeId === section.id
                    ? "border-l-[3px] border-amber-500 bg-amber-50 pl-[9px] text-stone-800 dark:border-amber-400 dark:bg-stone-700 dark:text-white"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          <div className="mt-3 border-t border-stone-200 pt-3 dark:border-stone-700">
            <Link
              href="/guide"
              className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            >
              <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span className="min-w-0">
                <span className="block font-medium">Claude Code 가이드</span>
                <span className="block text-xs text-stone-400 dark:text-stone-500">
                  명령어·단축키를 한눈에
                </span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className="mb-4 w-full md:hidden">
        <select
          value={activeId}
          onChange={(e) => setActiveId(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
        >
          {SECTIONS.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {/* Right content */}
      <div className="min-w-0 flex-1">
        <h2 className="mb-2 text-xl font-bold text-stone-800 dark:text-white">
          {activeSection.title}
        </h2>
        {activeSection.intro && (
          <p className="mb-5 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {activeSection.intro}
          </p>
        )}

        <div className="space-y-3">
          {activeSection.items.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-stone-200 bg-white px-5 py-4 shadow-sm dark:border-stone-700 dark:bg-stone-800"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="font-semibold text-stone-800 dark:text-white">
                  {item.label}
                </span>
                {item.tag && <TagBadge tag={item.tag} />}
              </div>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {item.description}
              </p>
              {item.command && <CommandCopy command={item.command} />}
            </div>
          ))}
        </div>

        {activeSection.next && activeSection.next.href ? (
          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 dark:border-stone-700 dark:bg-stone-800/50">
            <div className="min-w-0">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                다음 단계
              </p>
              <p className="text-sm font-medium text-stone-800 dark:text-white">
                {activeSection.next.label}
              </p>
              {activeSection.next.hint && (
                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                  {activeSection.next.hint}
                </p>
              )}
            </div>
            <Link
              href={activeSection.next.href as Route}
              className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-recipe-primary px-4 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:bg-recipe-primary-hover"
            >
              이동
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : activeSection.next ? (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              {activeSection.next.label}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
