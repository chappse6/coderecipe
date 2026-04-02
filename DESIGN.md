# CodeRecipe 디자인 팔레트 — Lemon Kitchen

## 컨셉
"요리하듯 쉽게 코딩한다" — 밝고 친근한 톤으로 비개발자도 부담 없이 접근 가능한 느낌.

---

## Core Colors

| 역할 | HEX | Tailwind | 용도 |
|------|-----|----------|------|
| Primary | `#FBBF24` | `amber-400` | 버튼, CTA, 로고, 강조 요소 |
| Primary Hover | `#F59E0B` | `amber-500` | Primary의 hover/active 상태 |
| Accent | `#F97316` | `orange-500` | 보조 강조, 배지, 태그, 링크 |
| Accent Hover | `#EA580C` | `orange-600` | Accent의 hover/active 상태 |

## Background Colors

| 역할 | HEX | Tailwind | 용도 |
|------|-----|----------|------|
| Light BG | `#FFFBEB` | `amber-50` | 메인 페이지 배경 (라이트 모드) |
| Surface | `#FEF3C7` | `amber-100` | 카드, 섹션 배경 |
| Dark BG | `#292524` | `stone-800` | 다크 모드 배경 |
| Dark Surface | `#3D3835` | `stone-700` | 다크 모드 카드/섹션 배경 |

## Text Colors

| 역할 | HEX | Tailwind | 용도 |
|------|-----|----------|------|
| Text Primary | `#44403C` | `stone-700` | 본문 텍스트 (라이트 모드) |
| Text Secondary | `#78716C` | `stone-500` | 보조 텍스트, 설명 |
| Text Tertiary | `#A8A29E` | `stone-400` | 힌트, 플레이스홀더 |
| Text on Dark | `#F5F5F4` | `stone-100` | 다크 모드 본문 텍스트 |
| Text on Primary | `#292524` | `stone-800` | Primary(노란) 배경 위 텍스트 |
| Text on Accent | `#FFFFFF` | `white` | Accent(오렌지) 배경 위 텍스트 |

## Semantic Colors

| 역할 | HEX | Tailwind | 용도 |
|------|-----|----------|------|
| Success | `#16A34A` | `green-600` | 환경 체크 통과, 성공 메시지 |
| Success BG | `#F0FDF4` | `green-50` | 성공 알림 배경 |
| Error | `#DC2626` | `red-600` | 에러 표시, 실패 |
| Error BG | `#FEF2F2` | `red-50` | 에러 알림 배경 |
| Info | `#2563EB` | `blue-600` | 안내, 팁 |
| Info BG | `#EFF6FF` | `blue-50` | 안내 알림 배경 |
| Warning | `#D97706` | `amber-600` | 주의 사항 |
| Warning BG | `#FFFBEB` | `amber-50` | 주의 알림 배경 |

## Code Block

| 역할 | HEX | 용도 |
|------|-----|------|
| Code BG | `#1C1917` | 코드 블록 배경 |
| Code Text | `#E7E5E4` | 코드 기본 텍스트 |
| Code Keyword | `#FBBF24` | 키워드 하이라이트 (Primary 활용) |
| Code String | `#4ADE80` | 문자열 |
| Code Comment | `#78716C` | 주석 |

---

## 사용 가이드라인

- **Primary(#FBBF24 / amber-400)**: 노란색이라 위에 올라가는 텍스트는 반드시 `stone-800` (`#292524`) 사용
- **Accent(#F97316 / orange-500)**: 오렌지는 흰색 텍스트 OK
- **접근성**: Primary 버튼은 텍스트 대비 4.5:1 이상 확보 (다크 텍스트 사용으로 충족)
- **다크 모드**: Primary/Accent 색은 그대로 유지, 배경(`stone-800`)과 텍스트(`stone-100`)만 반전

## Tailwind 클래스 치트시트

```
페이지 배경:    bg-amber-50 dark:bg-stone-800
카드 배경:      bg-white dark:bg-stone-700
Primary 버튼:   bg-amber-400 hover:bg-amber-500 text-stone-800
Accent 버튼:    bg-orange-500 hover:bg-orange-600 text-white
본문 텍스트:    text-stone-700 dark:text-stone-100
보조 텍스트:    text-stone-500 dark:text-stone-400
힌트 텍스트:    text-stone-400 dark:text-stone-500
테두리:         border-amber-100 dark:border-stone-700
링크/강조:      text-orange-500 dark:text-amber-400
포커스 링:      ring-amber-400
```
