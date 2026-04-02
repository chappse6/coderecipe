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
  translateError,
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
        name: "translate_error",
        description:
          "에러 메시지를 받아 한국어 설명과 Claude Code에 바로 사용할 수 있는 해결 요청 프롬프트를 반환합니다. ENOENT, EADDRINUSE, MODULE_NOT_FOUND, SyntaxError 등 일반적인 에러를 인식합니다.",
        inputSchema: {
          type: "object",
          properties: {
            errorMessage: {
              type: "string",
              description: "번역할 에러 메시지",
            },
          },
          required: ["errorMessage"],
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

    case "translate_error": {
      const { errorMessage } = args as { errorMessage: string };
      if (!errorMessage?.trim()) {
        throw new Error("errorMessage는 비어있을 수 없습니다.");
      }
      const translation = translateError(errorMessage);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(translation, null, 2),
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
