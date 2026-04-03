"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  tip?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "터미널을 닫았더니 사이트가 안 보여요",
    answer:
      "내 컴퓨터에서 돌리는 '개발 서버'가 꺼진 거예요. 카페에서 영업 종료하면 손님이 못 들어오는 것과 같아요. 터미널을 다시 열고 프로젝트 폴더로 이동한 뒤 npm run dev (또는 pnpm dev)를 입력하면 다시 켜져요.",
    tip: 'Claude에게 "개발 서버 켜줘"라고 하면 알아서 해줘요.',
  },
  {
    question: "코드를 수정했는데 화면에 반영이 안 돼요",
    answer:
      "브라우저에서 Ctrl+Shift+R (Mac: Cmd+Shift+R)을 눌러 강력 새로고침을 해보세요. 그래도 안 되면 개발 서버를 껐다 다시 켜보세요.",
    tip: "대부분의 프레임워크는 코드 변경을 자동 감지하지만, 가끔 캐시(임시 저장본) 때문에 안 될 수 있어요.",
  },
  {
    question: "Claude가 멈춘 것 같아요",
    answer:
      "복잡한 작업은 시간이 좀 걸릴 수 있어요. 30초 이상 기다려도 반응이 없으면 Ctrl+C를 눌러 멈추고 다시 요청해 보세요.",
    tip: "/compact 를 입력해서 대화를 정리하면 Claude가 더 빠르게 응답할 수 있어요.",
  },
  {
    question: "localhost:3000이 뭐예요?",
    answer:
      "내 컴퓨터(localhost)의 3000번 출입구(포트)라는 뜻이에요. 내 컴퓨터가 작은 서버가 되어서, 브라우저로 접속하면 만든 앱을 볼 수 있어요. 다른 사람은 이 주소로 접속할 수 없으니 안심하세요.",
  },
  {
    question: "포트가 이미 사용 중이라고 나와요",
    answer:
      "다른 프로그램이 같은 포트를 쓰고 있는 거예요. 하나의 출입구에 두 사람이 동시에 들어갈 수 없는 것처럼요. 이전에 켜둔 개발 서버가 아직 실행 중일 수 있어요.",
    tip: 'Claude에게 "3000 포트 쓰는 프로세스 종료해줘"라고 하면 해결해줘요.',
  },
  {
    question: "npm install 하라는데 뭔가요?",
    answer:
      "프로젝트에 필요한 재료(라이브러리)를 내려받는 거예요. 요리 전에 재료를 사오는 것과 같아요. 터미널에서 npm install 을 입력하면 돼요.",
    tip: "프로젝트를 처음 받았거나, 새 패키지가 추가됐을 때 한 번씩 해주면 돼요.",
  },
  {
    question: "Git이 뭔가요? 꼭 써야 하나요?",
    answer:
      "코드의 '저장 기록' 도구예요. 게임 세이브처럼 작업 내용을 기록해두면, 실수했을 때 이전 상태로 돌아갈 수 있어요. Claude Code가 자동으로 관리해주니 신경 쓰지 않아도 괜찮아요.",
  },
  {
    question: "node_modules 폴더가 엄청 큰데 괜찮은 건가요?",
    answer:
      "정상이에요! 프로젝트에 필요한 재료(라이브러리)가 모여 있는 창고예요. 수백 MB가 될 수 있지만 걱정하지 마세요. 이 폴더는 인터넷에 올릴 때 자동으로 제외돼요.",
  },
  {
    question: "Claude에게 뭐라고 말해야 할지 모르겠어요",
    answer:
      "일상 대화하듯 말하면 돼요! '로그인 기능 만들어줘', '이 버튼 색을 파란색으로 바꿔줘', '에러가 나는데 고쳐줘' 같은 식으로요. 완벽한 표현이 아니어도 Claude가 이해해요.",
    tip: "CodeRecipe 프롬프트 빌더를 쓰면 더 정확한 프롬프트를 만들 수 있어요!",
  },
  {
    question: "만든 앱을 친구에게 보여주고 싶어요",
    answer:
      "지금은 내 컴퓨터에서만 보이는 상태예요. 다른 사람에게 보여주려면 '배포'라는 과정이 필요해요. Vercel이나 Netlify 같은 무료 서비스를 쓰면 쉽게 인터넷에 올릴 수 있어요.",
    tip: "배포 가이드는 준비 중이에요. 조금만 기다려 주세요!",
  },
];

function FaqCard({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="border border-stone-200 shadow-sm dark:border-stone-700">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="pr-4 font-semibold text-stone-800 dark:text-white">
          {item.question}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 flex-shrink-0 text-stone-400" />
        ) : (
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-stone-400" />
        )}
      </button>
      {open && (
        <CardContent className="px-5 pb-5 pt-0">
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {item.answer}
          </p>
          {item.tip && (
            <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm dark:border-amber-900/40 dark:bg-amber-950/20">
              <span className="font-medium text-amber-700 dark:text-amber-400">
                Tip:
              </span>{" "}
              <span className="text-stone-600 dark:text-stone-400">
                {item.tip}
              </span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export function Faq() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {FAQ_ITEMS.map((item) => (
        <FaqCard key={item.question} item={item} />
      ))}

      <p className="pt-2 text-center text-xs text-stone-400 dark:text-stone-500">
        총 {FAQ_ITEMS.length}개 질문 수록
      </p>
    </div>
  );
}
