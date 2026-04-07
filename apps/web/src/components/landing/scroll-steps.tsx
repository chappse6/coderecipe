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
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-stone-50 dark:bg-stone-900">
      {/* Section header */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <p className="mb-2 text-center text-sm font-medium text-amber-500">
          How it works
        </p>
        <h2 className="text-center text-3xl font-bold text-stone-800 dark:text-stone-100 sm:text-4xl">
          3단계로 앱이 완성돼요
        </h2>
      </div>

      {/* Sticky scroll area */}
      <div className="container relative mx-auto px-4 lg:flex">
        {/* Left: scrollable steps */}
        <div className="lg:w-1/2">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] items-center lg:min-h-screen lg:pr-12"
            >
              <div
                className={`max-w-md transition-opacity duration-500 ${
                  activeStep === i ? "opacity-100" : "lg:opacity-30"
                }`}
              >
                {/* Step number + icon */}
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

                {/* Title */}
                <h3 className="mb-1 text-2xl font-bold text-stone-800 dark:text-stone-100">
                  {step.title}
                </h3>
                <p className={`mb-4 text-sm font-medium ${step.color}`}>
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="whitespace-pre-line text-base leading-relaxed text-stone-600 dark:text-stone-400">
                  {step.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-8 flex gap-2">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        j === i
                          ? "w-8 bg-amber-400"
                          : "w-4 bg-stone-300 dark:bg-stone-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: sticky GIF preview */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="sticky top-0 flex h-screen items-center justify-center pl-12">
            <div className="relative w-full max-w-lg">
              {/* Browser chrome */}
              <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl dark:border-stone-700 dark:bg-stone-800">
                {/* Title bar */}
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

                {/* GIF area */}
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
                      {/* Placeholder for GIF */}
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

        {/* Mobile: show GIF inline */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-sm px-4 pb-12">
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg dark:border-stone-700 dark:bg-stone-800">
              <div className="flex items-center gap-1.5 border-b border-stone-200 bg-stone-100 px-3 py-2 dark:border-stone-700 dark:bg-stone-900">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <div className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <div className="flex aspect-[4/3] items-center justify-center bg-stone-50 p-6 dark:bg-stone-900">
                <div className="text-center">
                  <div
                    className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl ${steps[activeStep].bgColor}`}
                  >
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return (
                        <Icon
                          className={`h-8 w-8 ${steps[activeStep].color}`}
                        />
                      );
                    })()}
                  </div>
                  <p className="text-xs text-stone-400">GIF 플레이스홀더</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
