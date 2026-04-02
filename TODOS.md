# TODOS — CodeRecipe Deferred Items

Items deferred from the 2026-04-02 MVP CEO review. Not in the current PR.

## Extensions & Integrations

| Item | Effort | Notes |
|------|--------|-------|
| CodeRecipe Chrome Extension — 만든 앱 실시간 에러 번역 | L | 브라우저 콘솔 에러를 실시간으로 캡처해 에러 번역기로 라우팅. Extension manifest v3 기반. |
| MCP 자동 에러 번역 — Claude Code 에러 발생 시 자동 호출 | M | Claude Code hook 또는 stderr 감지로 `translate_error` 자동 트리거. 현재는 수동 붙여넣기. |
| MCP npm publish — 비개발자 공개 설치 가능하게 | M | `@coderecipe/mcp-plugin` 패키지 퍼블리시. README에 `npx` 설치 방법 포함. |
| 환경 진단 실제 자동화 (CLI/MCP 버전) | L | 현재 `/setup`은 정적 가이드. 실제 `node --version`, `git --version` 자동 실행 후 결과 표시하는 CLI 또는 MCP 툴 빌드. |

## Error Pattern Refinement

| Item | Effort | Notes |
|------|--------|-------|
| dom-exception 패턴 세분화 | S | 현재 `dom-exception`은 카메라/클립보드/위치정보 오류를 하나로 묶음. 실제 사용 데이터 수집 후 각각 별도 패턴으로 분리 권장. |

## Known Technical Debt

| Item | Location | Notes |
|------|----------|-------|
| MCP가 shared 함수의 단순 래퍼 수준 | `packages/mcp-plugin/src/index.ts` | 에러 자동 감지, 실제 환경 체크 등 MCP 전용 기능 미구현. 현재는 shared 함수 그대로 노출. |

## Validation Milestones (not code)

- [ ] 실제 비개발자 1명 옆에서 `/setup` → Claude Code 첫 실행까지 완주 관찰
- [ ] 첫 10명 이후: 환경 진단 완료율, 프롬프트 빌더 완료율, 에러 번역기 사용 빈도 측정
- [ ] 2주 후 Vercel Analytics 이탈 데이터 기반 MCP-first 전환 여부 결정
