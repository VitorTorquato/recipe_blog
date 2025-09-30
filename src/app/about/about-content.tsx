import { Clock, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recipes } from "../../components/receipes/receipes";
import type { AboutProps } from "../../lib/utils/about.type";
import { getAboutData, getRecipesData } from "../../lib/utils/actions/get-data";
import { getLatestRecipes } from "../../lib/utils/actions/getRecipes";
import type { HomeRecipeProps } from "../../lib/utils/home.type";

export default async function AboutContent() {
  const { object }: AboutProps = await getAboutData();
  const recipes: HomeRecipeProps = await getRecipesData();
  const latestRecipes = getLatestRecipes(recipes.objects, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {object.metadata.about.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {object.metadata.about.subtitle}
          </p>
        </section>

        {/* Main About Content */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <Image
                src={object.metadata.about.about_image.url}
                alt={object.metadata.about.name}
                width={500}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {object.metadata.about.name}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{object.metadata.about.paragraph_1}</p>
                <p>{object.metadata.about.paragraph_2}</p>
                <p>{object.metadata.about.paragraph_3}</p>
                <p>{object.metadata.about.paragraph_4}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            My Cooking Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {object.metadata.card_1.title}
                </h3>
                <p className="text-muted-foreground">
                  {object.metadata.card_1.card_description}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {object.metadata.card_2.title}
                </h3>
                <p className="text-muted-foreground">
                  {object.metadata.card_2.card_description}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {object.metadata.card_3.title}
                </h3>
                <p className="text-muted-foreground">
                  {object.metadata.card_3.card_description}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Featured Recipes */}
        <section className="mb-16">
          <Recipes recipes={{ objects: latestRecipes }} />
        </section>
      </div>
    </div>
  );
}
