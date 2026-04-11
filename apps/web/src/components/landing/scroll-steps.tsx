"use client";

import { useEffect, useRef, useState } from "react";
import { Settings2, Wand2, Play } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings2,
    title: "환경 설정",
    subtitle: "클릭 몇 번이면 끝",
    description:
      "Node.js, Git, Claude Code — 필요한 프로그램을 하나씩 안내해 드려요.\n어려운 용어 없이, 버튼 클릭만으로 설치가 완료됩니다.",
    gif: "/coderecipe/images/step-1-setup.gif",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    number: "02",
    icon: Wand2,
    title: "레시피 만들기",
    subtitle: "질문에 답하면 프롬프트 완성",
    description:
      "만들고 싶은 앱을 선택하고 몇 가지 질문에 답하면\nClaude Code에 바로 붙여넣을 수 있는 프롬프트가 자동 생성돼요.",
    gif: "/coderecipe/images/step-2-recipe.gif",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    number: "03",
    icon: Play,
    title: "앱 완성",
    subtitle: "복사 → 붙여넣기 → 완성",
    description:
      "만들어진 프롬프트를 Claude Code에 붙여넣으면\nAI가 코드를 작성하고, 나만의 앱이 완성됩니다.",
    gif: "/coderecipe/images/step-3-result.gif",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
];

export function ScrollSteps() {
  const [progress, setProgress] = useState(0); // 0~100 overall progress
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Derive activeStep from progress so bar and content are always in sync
  const activeStep = Math.min(
    steps.length - 1,
    Math.floor((progress / 100) * steps.length)
  );

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100));
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-stone-50 dark:bg-stone-900">
      {/* Desktop: both sides sticky, scroll triggers in background */}
      <div className="hidden lg:block">
        <div className="container relative mx-auto px-4">
          {/* Scroll trigger spacers — invisible, just for height */}
          <div ref={wrapperRef} className="relative">
            {steps.map((_, i) => (
              <div
                key={i}
                ref={(el) => { triggerRefs.current[i] = el; }}
                className="h-[70vh]"
              />
            ))}

            {/* Sticky overlay: text left, GIF right */}
            <div className="pointer-events-none absolute inset-0 flex">
              {/* Left: sticky text */}
              <div className="w-1/2 pr-8">
                <div className="sticky top-0 flex h-screen items-center">
                  <div>
                    <div className="relative">
                      {steps.map((step, i) => (
                        <div
                          key={step.number}
                          className={`transition-all duration-500 ${
                            activeStep === i
                              ? "pointer-events-auto relative opacity-100"
                              : "pointer-events-none absolute inset-0 opacity-0"
                          }`}
                        >
                          {/* Step number + icon */}
                          <div className="mb-6 flex items-center gap-4">
                            <div
                              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.bgColor}`}
                            >
                              <step.icon className={`h-8 w-8 ${step.color}`} />
                            </div>
                            <span className="text-6xl font-black text-stone-200 dark:text-stone-700">
                              {step.number}
                            </span>
                          </div>

                          <h3 className="mb-1 text-3xl font-bold text-stone-800 dark:text-stone-100">
                            {step.title}
                          </h3>
                          <p className={`mb-4 font-medium ${step.color}`}>
                            {step.subtitle}
                          </p>

                          <p className="max-w-lg whitespace-pre-line text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Continuous progress bar */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {steps.map((_, j) => {
                          // Each segment: 0-33%, 33-66%, 66-100%
                          const segStart = (j / steps.length) * 100;
                          const segEnd = ((j + 1) / steps.length) * 100;
                          const segFill =
                            progress >= segEnd
                              ? 100
                              : progress <= segStart
                              ? 0
                              : ((progress - segStart) / (segEnd - segStart)) * 100;

                          return (
                            <div
                              key={j}
                              className="h-1.5 w-10 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-600"
                            >
                              <div
                                className="h-full rounded-full bg-amber-400 transition-[width] duration-150 ease-out"
                                style={{ width: `${segFill}%` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-xs font-medium text-stone-400 dark:text-stone-500">
                        {activeStep + 1} / {steps.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: sticky GIF */}
              <div className="w-1/2 pl-8">
                <div className="sticky top-0 flex h-screen items-center justify-center">
                  <div className="relative w-full max-w-xl">
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl dark:border-stone-700 dark:bg-stone-800">
                      <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-100 px-4 py-3 dark:border-stone-700 dark:bg-stone-900">
                        <div className="flex gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-red-400" />
                          <div className="h-3 w-3 rounded-full bg-yellow-400" />
                          <div className="h-3 w-3 rounded-full bg-green-400" />
                        </div>
                        <div className="ml-2 flex-1 rounded-md bg-stone-200 px-3 py-1 text-xs text-stone-400 dark:bg-stone-700 dark:text-stone-500">
                          coderecipe.dev
                        </div>
                      </div>

                      <div className="relative aspect-[4/3] bg-stone-50 dark:bg-stone-900">
                        {steps.map((step, i) => (
                          <div
                            key={step.number}
                            className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 transition-all duration-500 ${
                              activeStep === i
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0"
                            }`}
                          >
                            <div
                              className={`flex h-20 w-20 items-center justify-center rounded-2xl ${step.bgColor}`}
                            >
                              <step.icon className={`h-10 w-10 ${step.color}`} />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-stone-400 dark:text-stone-500">
                                GIF 플레이스홀더
                              </p>
                              <p className="mt-1 text-xs text-stone-300 dark:text-stone-600">
                                {step.gif}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Floating badge */}
                    <div
                      className={`absolute -bottom-4 -right-4 rounded-full px-4 py-2 text-sm font-bold text-white shadow-lg transition-all duration-500 ${
                        activeStep === 0
                          ? "bg-blue-500"
                          : activeStep === 1
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                    >
                      Step {activeStep + 1} / 3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: simple stacked layout */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 pb-12">
          {steps.map((step, i) => (
            <div key={step.number} className="py-10">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bgColor}`}
                >
                  <step.icon className={`h-7 w-7 ${step.color}`} />
                </div>
                <span className="text-5xl font-black text-stone-200 dark:text-stone-700">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-1 text-2xl font-bold text-stone-800 dark:text-stone-100">
                {step.title}
              </h3>
              <p className={`mb-4 text-sm font-medium ${step.color}`}>
                {step.subtitle}
              </p>
              <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-stone-600 dark:text-stone-400">
                {step.description}
              </p>

              {/* Mobile GIF */}
              <div className="mx-auto max-w-sm">
                <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg dark:border-stone-700 dark:bg-stone-800">
                  <div className="flex items-center gap-1.5 border-b border-stone-200 bg-stone-100 px-3 py-2 dark:border-stone-700 dark:bg-stone-900">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
                  <div className="flex aspect-[4/3] items-center justify-center bg-stone-50 p-6 dark:bg-stone-900">
                    <div className="text-center">
                      <div
                        className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl ${step.bgColor}`}
                      >
                        <step.icon className={`h-8 w-8 ${step.color}`} />
                      </div>
                      <p className="text-xs text-stone-400">GIF 플레이스홀더</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="mt-6 flex justify-center gap-2">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className={`h-1 rounded-full ${
                      j === i
                        ? "w-8 bg-amber-400"
                        : "w-4 bg-stone-300 dark:bg-stone-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
