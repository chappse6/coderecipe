import { Faq } from "@/components/faq";
import { Nav } from "@/components/layout/nav";

export const metadata = {
  title: "자주 묻는 질문 - CodeRecipe",
  description:
    "코딩을 처음 시작할 때 겪는 흔한 문제들, 쉬운 한국어로 답해드려요.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              자주 묻는 질문
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              처음 코딩할 때 누구나 겪는 당황스러운 순간들, 미리 알려드릴게요.
            </p>
          </div>

          <Faq />
        </div>
      </div>
    </div>
  );
}
