// utils/recipes.ts
import type { RecipesProps} from "../home.type";

/**
 * Retorna as receitas mais recentes baseado na data
 * @param recipes - Array de receitas
 * @param count - Quantidade de receitas a retornar (padrão: 6)
 * @returns Array com as receitas mais recentes
 */
export function getLatestRecipes(
  recipes: RecipesProps[] | undefined,
  count = 6,
): RecipesProps[] {
  // Verificação de segurança
  if (!recipes || !Array.isArray(recipes)) return [];

  if (recipes.length === 0) {
    console.log("Empty recipes array");
    return [];
  }

  return recipes
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    )
    .slice(0, count);
}

/**
 * Filtra receitas por categoria
 * @param recipes - Array de receitas
 * @param category - Categoria para filtrar
 * @returns Array de receitas da categoria especificada
 */
export const getRecipesByCategory = (
  recipes: RecipesProps[],
  category: string,
): RecipesProps[] => {
  return recipes.filter(
    (recipe) =>
      recipe.metadata.category.toLowerCase() === category.toLowerCase(),
  );
};

/**
 * Filtra receitas por dificuldade
 * @param recipes - Array de receitas
 * @param difficulty - Nível de dificuldade
 * @returns Array de receitas com a dificuldade especificada
 */
export const getRecipesByDifficulty = (
  recipes: RecipesProps[],
  difficulty: string,
): RecipesProps[] => {
  return recipes.filter(
    (recipe) =>
      recipe.metadata.difficulty?.toLowerCase() === difficulty.toLowerCase(),
  );
};

/**
 * Busca receitas por texto no título ou descrição
 * @param recipes - Array de receitas
 * @param searchTerm - Termo de busca
 * @returns Array de receitas que contêm o termo buscado
 */
export const searchRecipes = (
  recipes: RecipesProps[],
  searchTerm: string,
): RecipesProps[] => {
  const term = searchTerm.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.metadata.title.toLowerCase().includes(term) ||
      recipe.metadata.description.toLowerCase().includes(term) ||
      recipe.metadata.category.toLowerCase().includes(term),
  );
};

/**
 * Filtra receitas por tempo de cozimento
 * @param recipes - Array de receitas
 * @param maxTime - Tempo máximo em minutos
 * @returns Array de receitas com tempo <= maxTime
 */
export const getQuickRecipes = (
  recipes: RecipesProps[],
  maxTime: number,
): RecipesProps[] => {
  return recipes.filter((recipe) => {
    if (!recipe.metadata.cooktime) return false;

    // Extrai número do cookTime (ex: "30 min" -> 30)
    const timeMatch = recipe.metadata.cooktime.match(/\d+/);
    if (!timeMatch) return false;

    // biome-ignore lint/correctness/useParseIntRadix: <no need for that now>
    const cookTime = parseInt(timeMatch[0]);
    return cookTime <= maxTime;
  });
};

/**
 * Agrupa receitas por categoria
 * @param recipes - Array de receitas
 * @returns Objeto com receitas agrupadas por categoria
 */
export const groupRecipesByCategory = (
  recipes: RecipesProps[],
): Record<string, RecipesProps[]> => {
  return recipes.reduce(
    (groups, recipe) => {
      const category = recipe.metadata.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(recipe);
      return groups;
    },
    {} as Record<string, RecipesProps[]>,
  );
};

