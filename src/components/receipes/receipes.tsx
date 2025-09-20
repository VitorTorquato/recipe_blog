import Link from "next/link";
import type { HomeRecipeProps } from "../../lib/utils/home.type";
import { Button } from "../ui/button";
import { RecipeCard } from "./recipe-card/recipe-card";

interface RecipeProps {
  recipes: HomeRecipeProps;
  showCategory?: boolean;
}

export function Receipes({ recipes, showCategory = true }: RecipeProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Latest Recipes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our newest culinary creations, from comfort food classics
            to innovative dishes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {recipes.objects.map((recipe) => (
            <RecipeCard
              key={recipe.slug}
              recipe={recipe}
              showCategory={showCategory}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
