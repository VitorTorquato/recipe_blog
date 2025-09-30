import { Calendar, ChefHat, Clock, Users } from "lucide-react";
import Image from "next/image";
import type { PostProps } from "@/lib/utils/post.type";
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { getItemBySlug } from "../../../lib/utils/actions/get-data";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function Content({ slug }: { slug: string }) {
  const { objects }: PostProps = await getItemBySlug(slug);

  // Split ingredients and instructions by semicolon
  const ingredients = objects[0].metadata.ingredients
    ? objects[0].metadata.ingredients
        .split(";")
        .map((item: string) => item.trim())
        .filter((item: string) => item)
    : [];
  const instructions = objects[0].metadata.instructions
    ? objects[0].metadata.instructions
        .split(";")
        .map((item: string) => item.trim())
        .filter((item: string) => item)
    : [];

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Recipe Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge
            variant="secondary"
            // className={`capitalize ${getCategoryColor(recipe.category)}`}
          >
            {objects[0].metadata.category}
          </Badge>
          {objects[0].metadata.difficulty && (
            <Badge variant="outline" className="capitalize">
              {objects[0].metadata.difficulty}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
          {objects[0].title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(objects[0].metadata.date)}</span>
          </div>
          {objects[0].metadata.preptime && (
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              <span>Prep: {objects[0].metadata.preptime}</span>
            </div>
          )}
          {objects[0].metadata.cooktime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Cook: {objects[0].metadata.cooktime}</span>
            </div>
          )}
          {objects[0].metadata.servings && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{objects[0].metadata.servings} servings</span>
            </div>
          )}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {objects[0].metadata.description}
        </p>
      </div>

      {/* Recipe Image */}
      <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={objects[0].metadata.image.url}
          alt={objects[0].metadata.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {ingredients.map((ingredient: string, index: number) => (
                  <li
                    key={`ingredient-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <no reason>
                      index
                    }`}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {instructions.map((instruction: string, index: number) => (
                  <li
                    key={`instruction-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <no reason>
                      index
                    }`}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-foreground leading-relaxed pt-1">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nutrition Info */}
          {objects[0].metadata.nutrition && (
            <Card>
              <CardHeader>
                <CardTitle>Nutrition (per serving)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {objects[0].metadata.nutrition.calories && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="font-medium">
                      {objects[0].metadata.nutrition.calories}
                    </span>
                  </div>
                )}
                {objects[0].metadata.nutrition.protein && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-medium">
                      {objects[0].metadata.nutrition.protein}
                    </span>
                  </div>
                )}
                {objects[0].metadata.nutrition.carbs && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-medium">
                      {objects[0].metadata.nutrition.carbs}
                    </span>
                  </div>
                )}
                {objects[0].metadata.nutrition.fat && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fat</span>
                    <span className="font-medium">
                      {objects[0].metadata.nutrition.fat}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {objects[0].metadata.tags && objects[0].metadata.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {objects[0].metadata.tags.map(
                    (tag: { text: string }, index: number) => (
                      <Badge
                        key={`tag-${
                          // biome-ignore lint/suspicious/noArrayIndexKey: <no reason>
                          index
                        }`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag.text}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recipe Times Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {objects[0].metadata.preptime && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prep Time</span>
                  <span className="font-medium">
                    {objects[0].metadata.preptime}
                  </span>
                </div>
              )}
              {objects[0].metadata.cooktime && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cook Time</span>
                  <span className="font-medium">
                    {objects[0].metadata.cooktime}
                  </span>
                </div>
              )}
              {objects[0].metadata.totaltime && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Time</span>
                  <span className="font-medium">
                    {objects[0].metadata.totaltime}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servings</span>
                <span className="font-medium">
                  {objects[0].metadata.servings}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium">
                  {objects[0].metadata.difficulty}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
