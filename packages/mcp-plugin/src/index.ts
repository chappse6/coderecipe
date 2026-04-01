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
import {
  buildClaudePrompt,
  PROJECT_TYPE_OPTIONS,
  FEATURES_BY_TYPE,
  type ProjectType,
} from "@coderecipe/shared";

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
      {
        name: "build_prompt",
        description:
          "프로젝트 유형, 필요한 기능, 참고 서비스를 입력받아 Claude Code에 바로 사용할 수 있는 구조화된 프롬프트를 생성합니다. 코딩을 모르는 사용자도 쉽게 앱을 만들 수 있도록 도와줍니다.",
        inputSchema: {
          type: "object",
          properties: {
            projectType: {
              type: "string",
              enum: ["website", "chrome-extension", "chatbot", "webapp"],
              description:
                "만들고 싶은 프로젝트 유형: website(웹사이트), chrome-extension(크롬 확장 프로그램), chatbot(챗봇), webapp(웹앱)",
            },
            features: {
              type: "array",
              items: { type: "string" },
              description:
                "필요한 기능 목록. 각 유형별 사용 가능한 기능은 list_features 도구로 확인하세요.",
            },
            referenceUrl: {
              type: "string",
              description: "참고할 서비스의 URL (선택 사항)",
            },
            description: {
              type: "string",
              description: "추가 요청 사항이나 설명 (선택 사항)",
            },
          },
          required: ["projectType", "features"],
        },
      },
      {
        name: "list_features",
        description:
          "특정 프로젝트 유형에서 선택할 수 있는 기능 목록을 반환합니다. build_prompt 호출 전에 사용하면 유효한 feature 값을 확인할 수 있습니다.",
        inputSchema: {
          type: "object",
          properties: {
            projectType: {
              type: "string",
              enum: ["website", "chrome-extension", "chatbot", "webapp"],
              description: "프로젝트 유형",
            },
          },
          required: ["projectType"],
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

    case "build_prompt": {
      const { projectType, features, referenceUrl, description } = args as {
        projectType: ProjectType;
        features: string[];
        referenceUrl?: string;
        description?: string;
      };

      const validTypes = PROJECT_TYPE_OPTIONS.map((o) => o.value);
      if (!validTypes.includes(projectType)) {
        throw new Error(
          `유효하지 않은 프로젝트 유형입니다. 사용 가능한 유형: ${validTypes.join(", ")}`
        );
      }

      const prompt = buildClaudePrompt({
        projectType,
        features,
        referenceUrl,
        description,
      });

      return {
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      };
    }

    case "list_features": {
      const { projectType } = args as { projectType: ProjectType };

      const validTypes = PROJECT_TYPE_OPTIONS.map((o) => o.value);
      if (!validTypes.includes(projectType)) {
        throw new Error(
          `유효하지 않은 프로젝트 유형입니다. 사용 가능한 유형: ${validTypes.join(", ")}`
        );
      }

      const features = FEATURES_BY_TYPE[projectType];
      const typeOption = PROJECT_TYPE_OPTIONS.find(
        (o) => o.value === projectType
      );

      const result = {
        projectType,
        label: typeOption?.label,
        availableFeatures: features,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
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
