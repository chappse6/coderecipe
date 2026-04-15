import Link from "next/link";
import { ChefHat } from "lucide-react";
import { NavSearch } from "./nav-search";
import { MobileMenuButton } from "./mobile-menu-button";

const navLinks = [
  { href: "/guide" as const, label: "가이드" },
  { href: "/setup" as const, label: "환경 진단" },
  { href: "/direction" as const, label: "방향 잡기" },
  { href: "/builder" as const, label: "레시피 만들기" },
  { href: "/error-translator" as const, label: "에러 번역기" },
  { href: "/faq" as const, label: "FAQ" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-sm dark:border-stone-700 dark:bg-stone-800/90">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-stone-800 dark:text-stone-100"
        >
          <ChefHat className="h-5 w-5 text-amber-500" />
          <span>CodeRecipe</span>
        </Link>

        {/* Desktop: full menu (lg+) */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavSearch />
          <Link
            href="/glossary"
            className="rounded-md px-3 py-2.5 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
          >
            용어 사전
          </Link>
          <div className="mx-1.5 h-4 w-px bg-stone-200 dark:bg-stone-600" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile: search + hamburger (< lg) */}
        <div className="flex items-center gap-2 lg:hidden">
          <NavSearch />
          <MobileMenuButton />
        </div>
      </div>
    </nav>
  );
}
