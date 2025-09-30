
import { getRecipesByCategory } from "@/lib/utils/actions/getRecipes";
import { getRecipesData } from "@/lib/utils/actions/get-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/receipes/recipe-card/recipe-card";
import Link from "next/link";
import type { RecipesProps } from "@/lib/utils/home.type";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryNames = {
  breakfast: "Breakfast",
  appetizers: "Appetizers",
  mains: "Main Dishes",
  desserts: "Desserts",
};

const categoryDescriptions = {
  breakfast: "Start your day right with these delicious breakfast recipes",
  appetizers: "Perfect starters and small bites for any occasion",
  mains: "Hearty and satisfying main course recipes",
  desserts: "Sweet treats and indulgent desserts to end your meal",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  if (!Object.keys(categoryNames).includes(category)) {
    notFound();
  }

  let recipes: RecipesProps[] = [];
  let error: string | null = null;

  try {
    const recipesData = await getRecipesData();
    recipes = getRecipesByCategory(recipesData.objects, category);
  } catch (err) {
    console.error('Error loading recipes:', err);
    error = 'Failed to load recipes';
    recipes = [];
  }

  const categoryName = categoryNames[category as keyof typeof categoryNames];
  const categoryDescription =
    categoryDescriptions[category as keyof typeof categoryDescriptions];

  return (
    <div className="min-h-screen bg-background">
  
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {categoryName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {categoryDescription}
          </p>
          <Button asChild variant="outline">
            <Link href="/recipes">View All Recipes</Link>
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Error Loading Recipes
              </h3>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Recipes Grid */}
        {!error && recipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.slug}
                recipe={recipe}
                showCategory={false}
              />
            ))}
          </div>
        ) : !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                No recipes found
              </h3>
              <p className="text-muted-foreground mb-6">
                We don't have any {categoryName.toLowerCase()} recipes yet, but
                check back soon!
              </p>
              <Button asChild>
                <Link href="/recipes">Browse All Recipes</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
