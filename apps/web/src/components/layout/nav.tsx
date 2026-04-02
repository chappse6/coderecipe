import Link from "next/link";
import { ChefHat } from "lucide-react";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white"
        >
          <ChefHat className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <span>CodeRecipe</span>
        </Link>
        <div className="flex items-center gap-0.5">
          <Link
            href="/setup"
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            환경 진단
          </Link>
          <Link
            href="/builder"
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            프롬프트 빌더
          </Link>
          <Link
            href="/error-translator"
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            에러 번역기
          </Link>
          <Link
            href="/glossary"
            className="hidden rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:block dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            용어 사전
          </Link>
        </div>
      </div>
    </nav>
  );
}
