#!/usr/bin/env node
/**
 * CodeRecipe MCP Plugin
 * TypeScript MCP server that provides recipe generation tools for Claude Code.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "coderecipe",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "hello_world",
        description:
          "CodeRecipe MCP 플러그인이 정상적으로 동작하는지 확인하는 헬로우 월드 도구입니다.",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "인사할 이름 (선택 사항)",
            },
          },
          required: [],
        },
      },
      {
        name: "generate_recipe",
        description:
          "사용자 프롬프트를 받아 코드 레시피(단계별 구현 가이드)를 생성합니다.",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "만들고 싶은 기능이나 프로젝트를 설명하세요.",
            },
            difficulty: {
              type: "string",
              enum: ["beginner", "intermediate", "advanced"],
              description: "레시피 난이도 (기본값: beginner)",
            },
          },
          required: ["prompt"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "hello_world": {
      const greeting = args?.name
        ? `안녕하세요, ${args.name}님! CodeRecipe MCP 플러그인이 정상 동작 중입니다. 🍳`
        : "안녕하세요! CodeRecipe MCP 플러그인이 정상 동작 중입니다. 🍳";
      return {
        content: [{ type: "text", text: greeting }],
      };
    }

    case "generate_recipe": {
      const { prompt, difficulty = "beginner" } = args as {
        prompt: string;
        difficulty?: string;
      };

      // Skeleton response — real implementation will call the CodeRecipe API
      const recipe = {
        id: crypto.randomUUID(),
        title: `${prompt} 레시피`,
        description: `"${prompt}"를 구현하는 단계별 가이드입니다.`,
        difficulty,
        steps: [
          {
            order: 1,
            instruction: "프로젝트 환경을 설정합니다.",
            code: "pnpm create next-app@latest my-app --typescript --tailwind --app",
            language: "bash",
          },
          {
            order: 2,
            instruction: "필요한 패키지를 설치합니다.",
            code: "pnpm install",
            language: "bash",
          },
          {
            order: 3,
            instruction: "구현을 시작합니다.",
            code: "// TODO: implement",
            language: "typescript",
          },
        ],
        tags: ["coderecipe", difficulty],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(recipe, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`알 수 없는 도구: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CodeRecipe MCP server started (stdio)");
}

main().catch((err) => {
  console.error("MCP server error:", err);
  process.exit(1);
});
