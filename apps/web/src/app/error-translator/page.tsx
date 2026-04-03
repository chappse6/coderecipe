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
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 dark:text-white sm:text-4xl">
              에러 번역기
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              에러 메시지를 붙여넣으면 한국어로 설명하고, Claude Code에 바로 쓸
              수 있는 해결 요청문을 만들어 드려요.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Left — Error Translator */}
            <div className="min-w-0 flex-1">
              <ErrorTranslator />
            </div>

            {/* Right — Where to find errors */}
            <aside className="hidden w-72 flex-shrink-0 lg:block">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-800">
                  <h3 className="mb-4 text-sm font-bold text-stone-800 dark:text-white">
                    에러는 어디서 보나요?
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-recipe-primary text-xs font-bold text-stone-800">
                          1
                        </span>
                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                          터미널 (Claude Code)
                        </span>
                      </div>
                      <p className="pl-7 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                        Claude Code가 실행되는 검은 화면이에요. 빨간 글씨로 에러가 표시돼요.
                      </p>
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-recipe-primary text-xs font-bold text-stone-800">
                          2
                        </span>
                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                          브라우저 콘솔
                        </span>
                      </div>
                      <p className="pl-7 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                        웹사이트에서 F12 (Mac: Cmd+Option+I)를 누르면 개발자 도구가 열려요. Console 탭에서 빨간 에러를 확인할 수 있어요.
                      </p>
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-recipe-primary text-xs font-bold text-stone-800">
                          3
                        </span>
                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                          개발 서버 로그
                        </span>
                      </div>
                      <p className="pl-7 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                        npm run dev를 실행한 터미널 창이에요. 서버 쪽 에러가 여기에 나와요. Claude Code 창과 다른 별도 터미널이에요.
                      </p>
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-recipe-primary text-xs font-bold text-stone-800">
                          4
                        </span>
                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                          브라우저 화면
                        </span>
                      </div>
                      <p className="pl-7 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                        심각한 에러는 화면에 직접 표시돼요. &quot;Unhandled Runtime Error&quot; 같은 큰 빨간 박스가 나타나요.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-800">
                  <h3 className="mb-3 text-sm font-bold text-stone-800 dark:text-white">
                    에러 복사하는 법
                  </h3>
                  <ol className="space-y-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                    <li>
                      <strong className="text-stone-700 dark:text-stone-300">터미널:</strong>{" "}
                      에러 텍스트를 마우스로 드래그 → Ctrl+C (Mac: Cmd+C)
                    </li>
                    <li>
                      <strong className="text-stone-700 dark:text-stone-300">브라우저 콘솔:</strong>{" "}
                      빨간 에러를 우클릭 → &quot;Copy message&quot; 선택
                    </li>
                    <li>
                      <strong className="text-stone-700 dark:text-stone-300">화면 에러:</strong>{" "}
                      에러 메시지 텍스트를 드래그해서 복사
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/20">
                  <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                    <strong>Tip:</strong> 에러 전체를 복사해야 정확한 번역이 돼요. 일부만 복사하면 원인을 못 찾을 수 있어요.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
