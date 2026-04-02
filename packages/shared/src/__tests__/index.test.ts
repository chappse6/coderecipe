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
});

// ── buildClaudePrompt ──────────────────────────────────────────────────────────

describe("buildClaudePrompt", () => {
  it("includes '기본 기능' when features is empty", () => {
    const result = buildClaudePrompt({ projectType: "website", features: [] });
    expect(result).toContain("기본 기능");
  });

  it("includes feature label for contact-form", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      features: ["contact-form"],
    });
    expect(result).toContain("문의하기 양식");
  });

  it("includes 참고 서비스 section when referenceUrl is provided", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      features: [],
      referenceUrl: "https://example.com",
    });
    expect(result).toContain("## 참고 서비스");
    expect(result).toContain("https://example.com");
  });

  it("omits 참고 서비스 section when referenceUrl is undefined", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      features: [],
      referenceUrl: undefined,
    });
    expect(result).not.toContain("## 참고 서비스");
  });

  it("omits 참고 서비스 section when referenceUrl is empty string", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      features: [],
      referenceUrl: "",
    });
    expect(result).not.toContain("## 참고 서비스");
  });

  it("throws for javascript: referenceUrl", () => {
    expect(() =>
      buildClaudePrompt({
        projectType: "website",
        features: [],
        referenceUrl: "javascript:alert(1)",
      })
    ).toThrow("referenceUrl은 http:// 또는 https://로 시작해야 합니다");
  });

  it("throws for invalid projectType", () => {
    expect(() =>
      buildClaudePrompt({ projectType: "invalid" as any, features: [] })
    ).toThrow("유효하지 않은 프로젝트 유형입니다");
  });

  it("includes 추가 요청 사항 section when description is provided", () => {
    const result = buildClaudePrompt({
      projectType: "website",
      features: [],
      description: "초록색 테마로 만들어 주세요",
    });
    expect(result).toContain("## 추가 요청 사항");
    expect(result).toContain("초록색 테마로 만들어 주세요");
  });
});
