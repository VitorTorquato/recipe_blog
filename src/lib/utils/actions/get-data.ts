import { redirect } from "next/navigation";

export async function getHomeData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/objects/68c7d325fe0840663f64f50d?pretty=true&read_key=${process.env.READ_KEY}&props=slug,title,metadata,type`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw new Error(`Failed to fetch data`);
  }
}

export async function getRecipesData() {
  try {
    // Decode the query parameter for better debugging
    const query = JSON.stringify({ type: "recipes" });
    const encodedQuery = encodeURIComponent(query);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const readKey = process.env.NEXT_PUBLIC_READ_KEY || process.env.READ_KEY;

  
    const url = `${apiUrl}/objects?pretty=true&query=${encodedQuery}&limit=100&skip=0&read_key=${readKey}&props=slug,metadata&sort=-order`;


    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch data`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes data:", error);
    throw new Error(`Error to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getItemBySlug(itemslug: string) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`;

  const queryParams = new URLSearchParams({
    query: JSON.stringify({
      slug: itemslug,
    }),
    props: "slug,title,metadata,type",
    read_key: process.env.READ_KEY as string,
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, { next: { revalidate: 120 } });

    if (!response.ok) {
      throw new Error("Error to fetch data");
    }

    const data = await response.json();

    return data;

    // // Return the first object from the objects array is an option as well
    // if (data.objects && data.objects.length > 0) {
    //   return { object: data.objects[0] };
    // } else {
    //   throw new Error('Recipe not found');
    // }
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
