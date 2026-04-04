import { describe, it, expect } from "vitest";
import { translateError, buildClaudePrompt } from "../index.js";

// ── translateError ─────────────────────────────────────────────────────────────

describe("translateError", () => {
  it("matches ENOENT errors", () => {
    const result = translateError("ENOENT: no such file or directory");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("enoent");
  });

  it("matches EADDRINUSE errors", () => {
    const result = translateError("EADDRINUSE: address already in use :::3000");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("eaddrinuse");
  });

  it("matches SyntaxError", () => {
    const result = translateError("SyntaxError: Unexpected token '<'");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("syntax-error");
  });

  it("returns generic fallback for empty string", () => {
    const result = translateError("");
    expect(result.matched).toBe(false);
    expect(result.errorId).toBeUndefined();
  });

  it("returns generic fallback for unrecognized error", () => {
    const result = translateError("completely unknown error xyz 99999");
    expect(result.matched).toBe(false);
    expect(result.errorId).toBeUndefined();
  });

  it("matches unhandled promise rejection", () => {
    const result = translateError("UnhandledPromiseRejection: some database error occurred");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("unhandled-rejection");
  });

  it("matches react key error", () => {
    const result = translateError("Each child in a list should have a unique key prop.");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("react-key-error");
  });

  it("matches fetch HTTP error", () => {
    const result = translateError("Failed to fetch");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("fetch-http-error");
  });

  it("matches DOMException", () => {
    const result = translateError("DOMException: NotAllowedError: The request is not allowed.");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("dom-exception");
  });

  it("matches react too many re-renders", () => {
    const result = translateError("Too many re-renders. React limits the number of renders.");
    expect(result.matched).toBe(true);
    expect(result.errorId).toBe("react-update-error");
  });
});

// ── buildClaudePrompt ──────────────────────────────────────────────────────────

describe("buildClaudePrompt", () => {
  const baseTopic = "동네 카페 소개";

  it("includes '기본 기능' when features is empty", () => {
    const result = buildClaudePrompt({ projectType: "website", topic: baseTopic, features: [] });
    expect(result).toContain("기본 기능");
  });

  it("includes topic in prompt output", () => {
    const result = buildClaudePrompt({ projectType: "website", topic: baseTopic, features: [] });
    expect(result).toContain("동네 카페 소개");
  });

  it("throws when topic is empty", () => {
    expect(() =>
      buildClaudePrompt({ projectType: "website", topic: "  ", features: [] })
    ).toThrow("주제를 입력해 주세요");
  });

  it("includes feature label for contact-form", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      topic: baseTopic,
      features: ["contact-form"],
    });
    expect(result).toContain("문의하기 양식");
  });

  it("includes 참고 서비스 section when referenceUrl is provided", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      topic: baseTopic,
      features: [],
      referenceUrl: "https://example.com",
    });
    expect(result).toContain("## 참고 서비스");
    expect(result).toContain("https://example.com");
  });

  it("omits 참고 서비스 section when referenceUrl is undefined", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      topic: baseTopic,
      features: [],
      referenceUrl: undefined,
    });
    expect(result).not.toContain("## 참고 서비스");
  });

  it("omits 참고 서비스 section when referenceUrl is empty string", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      topic: baseTopic,
      features: [],
      referenceUrl: "",
    });
    expect(result).not.toContain("## 참고 서비스");
  });

  it("omits 참고 서비스 section when referenceUrl is whitespace-only", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      topic: baseTopic,
      features: [],
      referenceUrl: "   ",
    });
    expect(result).not.toContain("## 참고 서비스");
  });

  it("throws for javascript: referenceUrl", () => {
    expect(() =>
      buildClaudePrompt({
        projectType: "website",
        topic: baseTopic,
        features: [],
        referenceUrl: "javascript:alert(1)",
      })
    ).toThrow("referenceUrl은 http:// 또는 https://로 시작해야 합니다");
  });

  it("throws for invalid projectType", () => {
    expect(() =>
      buildClaudePrompt({ projectType: "invalid" as any, topic: baseTopic, features: [] })
    ).toThrow("유효하지 않은 프로젝트 유형입니다");
  });

  it("includes 추가 요청 사항 section when description is provided", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      topic: baseTopic,
      features: [],
      description: "초록색 테마로 만들어 주세요",
    });
    expect(result).toContain("## 추가 요청 사항");
    expect(result).toContain("초록색 테마로 만들어 주세요");
  });

  it("generates type-specific design guidance for webapp", () => {
    const result = buildClaudePrompt({
      projectType: "webapp",
      topic: "독서 기록 관리",
      features: ["login"],
    });
    expect(result).toContain("디자인 원칙");
    expect(result).toContain("독서 기록 관리");
  });

  it("generates type-specific design guidance for chrome-extension", () => {
    const result = buildClaudePrompt({
      projectType: "chrome-extension",
      topic: "유튜브 메모",
      features: ["popup"],
    });
    expect(result).toContain("Manifest V3");
    expect(result).toContain("유튜브 메모");
  });
});
