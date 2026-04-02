import { ErrorTranslator } from "@/components/error-translator";
import { Nav } from "@/components/layout/nav";

export const metadata = {
  title: "에러 번역기 - CodeRecipe",
  description:
    "Claude Code에서 나온 에러 메시지를 쉬운 한국어로 설명해 드려요.",
};

export default function ErrorTranslatorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
            에러 번역기
          </h1>
          <p className="mt-2 max-w-xl text-stone-500 dark:text-stone-400">
            에러 메시지를 붙여넣으면 한국어로 설명하고, Claude Code에 바로 쓸
            수 있는 해결 요청문을 만들어 드려요.
          </p>
        </div>

        <ErrorTranslator />
      </div>
    </div>
  );
}
