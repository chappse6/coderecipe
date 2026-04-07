"use client";

import { Rocket, Compass } from "lucide-react";

const ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Rocket,
  Compass,
};

export function ComingSoonCard({
  title,
  iconName,
}: {
  title: string;
  iconName: string;
}) {
  const Icon = ICONS[iconName] ?? Rocket;

  return (
    <button
      type="button"
      onClick={() => alert("구현 예정이에요! 조금만 기다려 주세요.")}
      className="group relative h-32 cursor-default overflow-hidden rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-5 text-left transition-all duration-300 hover:border-stone-400 dark:border-stone-600 dark:bg-stone-800 dark:hover:border-stone-500"
    >
      <h3 className="relative z-10 text-xl font-bold text-stone-400 dark:text-stone-500">
        {title}
      </h3>
      <span className="relative z-10 mt-2 inline-block rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-medium text-stone-500 dark:bg-stone-700 dark:text-stone-400">
        준비 중
      </span>
      <Icon
        className="absolute -bottom-8 -right-8 h-36 w-36 text-stone-300/30 dark:text-stone-600/30"
        strokeWidth={2}
      />
    </button>
  );
}
