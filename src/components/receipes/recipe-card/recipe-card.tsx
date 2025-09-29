import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RecipesProps} from "../../../lib/utils/home.type";



export interface RecipeCardProps {
  recipe: RecipesProps;
  showCategory?: boolean;
}

export function RecipeCard({ recipe , showCategory = true }: RecipeCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      breakfast: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      appetizers: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      mains: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      dessert: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 hover:bg-gray-200"
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={recipe.metadata.image.url}
          alt={recipe.metadata.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showCategory && (
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className={`capitalize ${getCategoryColor(recipe.metadata.category)}`}
            >
              {recipe.metadata.category}
            </Badge>
          </div>
        )}
        {recipe.metadata.difficulty && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 text-gray-700">
              {recipe.metadata.difficulty}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <time dateTime={recipe.metadata.date}>{formatDate(recipe.metadata.date)}</time>
          {recipe.metadata.cooktime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.metadata.cooktime}</span>
            </div>
          )}
          {recipe.metadata.servings && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.metadata.servings} servings</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
          {recipe.metadata.title}
        </h3>

        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {recipe.metadata.description}
        </p>

        <Button
          asChild
          variant="ghost"
          className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
        >
          <Link href={`/recipe/${recipe.slug}`}>Continue Reading →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
