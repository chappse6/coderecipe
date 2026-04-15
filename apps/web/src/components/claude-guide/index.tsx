"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Compass } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

interface GuideSection {
  id: string;
  title: string;
  items: GuideItem[];
}

interface GuideItem {
  label: string;
  description: string;
  command?: string;
  tag?: "추천" | "필수" | "유용";
}

const SECTIONS: GuideSection[] = [
  {
    id: "what",
    title: "Claude Code가 뭐예요?",
    items: [
      {
        label: "AI 코딩 도우미",
        description:
          "터미널(검은 화면)에서 대화하듯 말하면 AI가 코드를 대신 짜주는 도구예요. 요리사에게 '이런 요리 만들어 주세요' 하면 알아서 만들어주는 것처럼요.",
      },
      {
        label: "어떻게 시작하나요?",
        description:
          "터미널을 열고 claude 라고 입력하면 시작돼요. 그 다음부터는 원하는 걸 한국어로 설명하면 됩니다.",
        command: "claude",
      },
      {
        label: "돈이 드나요?",
        description:
          "Claude Code는 유료 구독(Pro, Max, Team)이 필요해요. 월 $20(Pro)부터 시작하며, 사용량에 따라 플랜을 선택하면 돼요.",
      },
    ],
  },
  {
    id: "permission",
    title: "승인 요청이 뜨면?",
    items: [
      {
        label: "승인 요청이란",
        description:
          "Claude가 파일을 만들거나 명령어를 실행하기 전에 허락을 구하는 거예요. 택배 기사가 문 앞에서 '문 열어도 될까요?' 물어보는 것과 같아요. 안전장치이니 당황하지 마세요!",
      },
      {
        label: "Yes",
        description: "이번 한 번만 허락해요. 가장 안전한 선택이에요.",
        tag: "추천",
      },
      {
        label: "Yes, and don't ask again",
        description:
          "이런 종류의 작업은 앞으로 물어보지 않고 자동으로 해요. 익숙해진 뒤에 쓰세요.",
      },
      {
        label: "No",
        description:
          "거부해요. 잘 모르겠으면 No를 눌러도 괜찮아요. Claude에게 다시 물어볼 수 있어요.",
        tag: "필수",
      },
      {
        label: "Esc",
        description: "취소하고 다른 걸 입력할 수 있어요.",
      },
    ],
  },
  {
    id: "commands",
    title: "자주 쓰는 명령어",
    items: [
      {
        label: "/help",
        description: "도움말을 보여줘요. 뭘 해야 할지 모를 때 먼저 쳐보세요.",
        command: "/help",
        tag: "추천",
      },
      {
        label: "/clear",
        description:
          "대화를 새로 시작해요. 이전 대화가 꼬였거나 새 주제로 넘어갈 때 좋아요.",
        command: "/clear",
        tag: "추천",
      },
      {
        label: "/compact",
        description:
          "지금까지 대화를 요약 정리해요. Claude가 느려지거나 '컨텍스트가 부족합니다' 같은 메시지가 뜰 때 써보세요.",
        command: "/compact",
        tag: "필수",
      },
      {
        label: "/diff",
        description:
          "Claude가 바꾼 코드를 한눈에 보여줘요. 초록색은 추가된 부분, 빨간색은 삭제된 부분이에요.",
        command: "/diff",
        tag: "유용",
      },
      {
        label: "/cost",
        description: "지금까지 사용한 토큰(사용량)을 확인해요.",
        command: "/cost",
        tag: "유용",
      },
      {
        label: "! (느낌표 + 명령어)",
        description:
          "터미널 명령어를 바로 실행해요. 예: !npm run dev 로 개발 서버를 켤 수 있어요.",
        command: "!npm run dev",
        tag: "추천",
      },
      {
        label: "@ (골뱅이 + 파일명)",
        description:
          "파일을 언급할 때 써요. Claude에게 '이 파일을 봐줘' 할 때 유용해요.",
        command: "@src/app/page.tsx",
        tag: "유용",
      },
    ],
  },
  {
    id: "shortcuts",
    title: "유용한 단축키",
    items: [
      {
        label: "Ctrl + C",
        description:
          "Claude가 작업 중일 때 멈추게 해요. '잠깐, 그거 아니야!' 할 때 누르세요.",
        tag: "필수",
      },
      {
        label: "Shift + Tab",
        description:
          "권한 모드를 바꿔요. Plan(읽기만) → Auto(자동 승인) → Default(매번 물어봄) 순서로 돌아가요.",
        tag: "유용",
      },
      {
        label: "Esc",
        description: "승인 요청이나 입력을 취소해요.",
        tag: "추천",
      },
    ],
  },
  {
    id: "tips",
    title: "이럴 땐 이렇게",
    items: [
      {
        label: "Claude가 엉뚱한 걸 만들 때",
        description:
          "Ctrl+C로 멈추고, 더 구체적으로 설명해 보세요. '홈페이지 만들어줘' 보다 '카페 홈페이지인데, 메뉴판이랑 위치 지도가 있는 1페이지짜리로 만들어줘'가 훨씬 나아요.",
      },
      {
        label: "Claude가 느려지거나 이상할 때",
        description:
          "/compact 를 입력해서 대화를 정리하세요. 대화가 길어지면 Claude도 헷갈려해요.",
      },
      {
        label: "만든 사이트가 안 보일 때",
        description:
          "개발 서버가 꺼졌을 수 있어요. 터미널에서 !npm run dev 를 입력하거나, Claude에게 '개발 서버 켜줘'라고 말해보세요.",
      },
      {
        label: "코드를 되돌리고 싶을 때",
        description:
          "Claude에게 '방금 바꾼 거 되돌려줘'라고 말하면 돼요. 또는 /diff 로 뭐가 바뀌었는지 확인한 뒤 판단해도 좋아요.",
      },
      {
        label: "에러 메시지가 떴을 때",
        description:
          "당황하지 말고 에러 메시지를 그대로 복사해서 Claude에게 붙여넣으세요. '이 에러가 뭔지 설명해 줘'라고 하면 알려줘요. 또는 CodeRecipe 에러 번역기를 이용해 보세요!",
      },
    ],
  },
];

// ── Components ───────────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag: "추천" | "필수" | "유용" }) {
  const styles = {
    추천: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    필수: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    유용: "bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-400",
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

export function ClaudeGuide() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const activeSection = SECTIONS.find((s) => s.id === activeId)!;

  return (
    <div className="flex gap-6">
      {/* Left sidebar — topic list */}
      <nav className="hidden w-56 flex-shrink-0 md:block">
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

          <div className="mt-3 space-y-3 border-t border-stone-200 pt-3 dark:border-stone-700">
            <Link
              href="/direction"
              className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            >
              <Compass className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span className="min-w-0">
                <span className="block font-medium">방향 잡기</span>
                <span className="block text-xs text-stone-400 dark:text-stone-500">
                  플러그인으로 아이디어 정리
                </span>
              </span>
            </Link>
            <a
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 text-xs text-stone-400 underline hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300"
            >
              Claude Code 공식 문서
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown (md 미만) */}
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

      {/* Right content — sticky */}
      <div className="min-w-0 flex-1">
        <div className="sticky top-24">
          <h2 className="mb-5 text-xl font-bold text-stone-800 dark:text-white">
            {activeSection.title}
          </h2>
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
        </div>
      </div>
    </div>
  );
}
