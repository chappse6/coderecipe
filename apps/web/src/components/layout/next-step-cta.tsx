import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";

interface NextStepCtaProps {
  href: Route;
  label: string;
  hint?: string;
}

export function NextStepCta({ href, label, hint }: NextStepCtaProps) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 dark:border-stone-700 dark:bg-stone-800/50">
      <div className="min-w-0">
        <p className="text-xs text-stone-500 dark:text-stone-400">다음 단계</p>
        <p className="text-sm font-medium text-stone-800 dark:text-white">
          {label}
        </p>
        {hint && (
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            {hint}
          </p>
        )}
      </div>
      <Link
        href={href}
        className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-recipe-primary px-4 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:bg-recipe-primary-hover"
      >
        이동
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
