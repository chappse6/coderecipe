// CodeRecipe shared types and utilities

export interface Recipe {
  id: string;
  title: string;
  description: string;
  steps: RecipeStep[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  updatedAt: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  code?: string;
  language?: string;
}

export interface GenerateRecipeRequest {
  prompt: string;
  difficulty?: Recipe["difficulty"];
  tags?: string[];
}

export interface GenerateRecipeResponse {
  recipe: Recipe;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
