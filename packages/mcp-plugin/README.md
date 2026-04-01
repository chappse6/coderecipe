# @coderecipe/mcp-plugin

CodeRecipe MCP 플러그인 — Claude Code에서 앱 제작 레시피와 에러 번역 기능을 바로 사용하세요.

## 설치 방법

```bash
npm install -g @coderecipe/mcp-plugin
```

## Claude Code에 등록하기

`.claude/settings.json` 또는 Claude Code 설정에서 아래와 같이 추가하세요:

```json
{
  "mcpServers": {
    "coderecipe": {
      "command": "coderecipe-mcp"
    }
  }
}
```

또는 npx로 바로 실행:

```json
{
  "mcpServers": {
    "coderecipe": {
      "command": "npx",
      "args": ["-y", "@coderecipe/mcp-plugin"]
    }
  }
}
```

## 사용 가능한 도구

| 도구 | 설명 |
|------|------|
| `translate_error` | 에러 메시지 → 한국어 설명 + Claude Code 해결 요청 프롬프트 |
| `build_prompt` | 프로젝트 유형·기능·참고 사이트 → 구조화된 Claude Code 프롬프트 |
| `list_features` | 프로젝트 유형별 선택 가능한 기능 목록 반환 |
| `generate_recipe` | 자연어 설명 → 단계별 구현 가이드 |
| `hello_world` | 플러그인 동작 확인 |

## 예시

Claude Code에서:

```
에러 번역기: ENOENT: no such file or directory, open '/app/config.json'
```

→ 한국어 설명 + 해결 요청 프롬프트 자동 생성

---

웹 버전: [https://coderecipe.vercel.app](https://coderecipe.vercel.app)
