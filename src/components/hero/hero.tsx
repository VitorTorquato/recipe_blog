import Image from "next/image";
import Link from 'next/link';
import { Button } from '../ui/button';

interface HeroProps {
  heading: string;
  sub_heading: string;
  bannerUrl: string;
  button_title:string;
}

export function Hero({ bannerUrl, heading ,sub_heading, button_title}: HeroProps) {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <Image
          src={bannerUrl}
          alt="a Hero background"
          priority
          fill
          className="h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-balance">{sub_heading}</p>
        <Button asChild size="lg" className="bg-chart-4 text-base font-bold hover:bg-chart-4/90">
          <Link href="/receips">{button_title}</Link>
        </Button>
      </div>
    </section>
  );
}
