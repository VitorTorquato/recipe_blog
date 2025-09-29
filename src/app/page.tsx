import { About } from "../components/about/about";
import { Hero } from "../components/hero/hero";
import { Recipes } from "../components/receipes/receipes";
import { getHomeData, getRecipesData } from "../lib/utils/actions/get-data";
import { getLatestRecipes } from "../lib/utils/actions/getRecipes";
import type { HomeProps, HomeRecipeProps } from "../lib/utils/home.type";

export default async function Home() {
  const { object }: HomeProps = await getHomeData();
  const recipes: HomeRecipeProps = await getRecipesData();

  const latestRecipes = getLatestRecipes(recipes.objects , 6);

  return (
    <main className="w-full">
      <Hero
        bannerUrl={object.metadata.banner.url}
        heading={object.metadata.heading}
        sub_heading={object.metadata.sub_heading}
        button_title={object.metadata.cta_button.button_title}
      />
      <About object={object} />
      <Recipes recipes={{ objects: latestRecipes }} />
    </main>
  );
}
