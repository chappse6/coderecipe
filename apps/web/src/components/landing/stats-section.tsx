import { Zap, Clock, Package } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "5분",
    label: "환경 설정 완료까지",
    description: "클릭 몇 번이면 개발 환경이 준비돼요",
  },
  {
    icon: Zap,
    value: "1줄",
    label: "프롬프트 입력이면 충분",
    description: "나머지는 CodeRecipe가 자동으로 채워드려요",
  },
  {
    icon: Package,
    value: "0원",
    label: "모든 기능 무료",
    description: "숨겨진 비용 없이, 지금 바로 시작하세요",
  },
];

export function StatsSection() {
  return (
    <section className="bg-stone-900 dark:bg-stone-950">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <p className="mb-3 text-center text-sm font-medium tracking-wide text-amber-400 uppercase">
          Why CodeRecipe
        </p>
        <h2 className="mb-20 text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          숫자로 보는 CodeRecipe
        </h2>

        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
                <stat.icon className="h-8 w-8 text-amber-400" />
              </div>
              <p className="text-5xl font-black text-white sm:text-6xl lg:text-7xl">
                {stat.value}
              </p>
              <p className="mt-3 text-base font-medium text-amber-400">
                {stat.label}
              </p>
              <p className="mt-2 text-base text-stone-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
