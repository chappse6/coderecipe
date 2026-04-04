import { Glossary } from "@/components/glossary";
import { Nav } from "@/components/layout/nav";

export const metadata = {
  title: "개발 용어 사전 - CodeRecipe",
  description: "개발 용어를 쉬운 한국어로 설명하는 1인 개발자 용어 사전이에요.",
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              용어 사전
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              개발 용어가 어렵게 느껴지시나요? 일상적인 비유로 쉽게 설명해
              드릴게요.
            </p>
          </div>

          <Glossary />
        </div>
      </div>
    </div>
  );
}
