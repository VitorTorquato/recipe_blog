// home.type.ts - Interfaces corrigidas baseadas nos dados reais do Cosmic

export interface RecipesProps {
  slug: string;
  title: string;
  type: string;
  metadata: {
    image: {
      url: string;
      imgix_url: string;
    };
    title: string;
    description: string;
    date: string;
    category: string;
    cooktime: string;
    servings: number;
    difficulty: string;
  };
}

export interface HomeRecipeProps {
  objects: RecipesProps[];
}

// Outras interfaces existentes...
export interface HomeProps {
  object: {
    slug: string;
    title: string;
    metadata: {
      banner: {
        url: string;
      };
      heading: string;
      sub_heading: string;
      cta_button: {
        button_title: string;
      };
      about: {
        heading: string;
        description1: string;
        description2: string;
        about_button: {
          button_title: string;
        };
        banner: {
          url: string;
        };
      };
      // Remove recipes daqui se não usar mais
    };
  };
}