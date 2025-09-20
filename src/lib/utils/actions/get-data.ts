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

export async function getRecipesData(){

  try{

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22%3A%22recipes%22%7D&limit=10&skip=0&read_key=${process.env.READ_KEY}&props=slug%2Ctitle%2Cmetadata%2Ctype&sort=-order`,
    );

    if(!res.ok){
      throw new Error('Error to fetch data');
    }

    const data = await res.json();
    console.log(data);
    return data;

  }catch(error){
    console.error('Erro to ffetch data' , error);
    throw new Error('Error to fetch data');
  }
}