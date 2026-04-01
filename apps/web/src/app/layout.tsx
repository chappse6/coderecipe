import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeRecipe - 코딩 없이 만드는 앱",
  description:
    "코딩을 모르는 일반인이 Claude Code로 앱/웹사이트를 만들 수 있게 도와주는 서비스",
  keywords: ["Claude Code", "AI 코딩", "노코드", "앱 만들기", "CodeRecipe"],
  authors: [{ name: "CodeRecipe" }],
  openGraph: {
    title: "CodeRecipe - 코딩 없이 만드는 앱",
    description:
      "Claude Code와 함께라면 누구나 앱을 만들 수 있어요. 레시피를 따라하세요!",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
