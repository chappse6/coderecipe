import Link from "next/link";
import { ChefHat } from "lucide-react";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-amber-100 bg-amber-50/90 backdrop-blur-sm dark:border-stone-700 dark:bg-stone-800/90">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-stone-800 dark:text-stone-100"
        >
          <ChefHat className="h-5 w-5 text-amber-500" />
          <span>CodeRecipe</span>
        </Link>
        <div className="flex items-center gap-0.5">
          <Link
            href="/setup"
            className="rounded-md px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-amber-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
          >
            환경 진단
          </Link>
          <Link
            href="/builder"
            className="rounded-md px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-amber-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
          >
            프롬프트 빌더
          </Link>
          <Link
            href="/error-translator"
            className="rounded-md px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-amber-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
          >
            에러 번역기
          </Link>
          <Link
            href="/glossary"
            className="hidden rounded-md px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-amber-100 hover:text-stone-900 sm:block dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
          >
            용어 사전
          </Link>
        </div>
      </div>
    </nav>
  );
}
