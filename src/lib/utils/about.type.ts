export interface AboutProps {
  object: {
    slug: string;
    title: string;
    metadata: {
      about: {
      title: string;
      subtitle: string;
      about_image: {
        url: string;
      };
      name: string;
      paragraph_1: string;
      paragraph_2: string;
      paragraph_3: string;
      paragraph_4: string;
    },
    card_1:{
      title:string;
      card_description: string;
    },
    card_2:{
      title:string;
      card_description: string;
    },
    card_3:{
      title:string;
      card_description: string;
    },
    };
  };
}