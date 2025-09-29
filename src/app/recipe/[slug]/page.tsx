import { Content } from './_components/content';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page(props : PageProps) {

  const params = await props.params;
  const {slug} = params;
  
  return (
    <main>
      <Content slug={slug}/>
    </main>
  )
}
