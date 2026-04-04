"use client";

import { Menu } from "lucide-react";

export function MobileMenuButton() {
  const handleClick = () => {
    const el = document.getElementById("tools");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-stone-100"
      aria-label="메뉴"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
