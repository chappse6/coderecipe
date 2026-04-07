import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat } from "lucide-react";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-recipe-primary">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white" />
      </div>

      <div className="container relative mx-auto px-4 py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
          <ChefHat className="h-8 w-8 text-stone-800" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-stone-800 sm:text-4xl">
          지금 바로 시작해 보세요
        </h2>
        <p className="mx-auto mb-8 max-w-md text-base text-stone-700">
          코딩 경험이 없어도 괜찮아요.
          <br />
          5분이면 첫 번째 앱을 만들 준비가 됩니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="gap-2 bg-stone-800 text-white hover:bg-stone-900"
            asChild
          >
            <Link href="/builder">
              레시피 시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-stone-800/30 bg-transparent text-stone-800 hover:bg-white/30"
            asChild
          >
            <Link href="/setup">환경 진단 먼저</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
