export interface PostProps {
  objects: ObjectPost[];
}

interface ObjectPost {
  slug: string;
  title: string;
  type: string;
  metadata: {
    image: {
      url: string;
    };
    title: string;
    description: string;
    date: string;
    category: string;
    cooktime: string;
    preptime: string;
    totaltime: string;
    servings: number;
    difficulty: string;
    ingredients: string;
    instructions: string;
    nutrition: {
      calories: number;
      protein: string;
      carbs: string;
      fat: string;
    }
    tags: { text: string }[];
  };
}








