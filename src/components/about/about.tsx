import Image from "next/image";
import Link from "next/link";
import type { HomeProps } from "../../lib/utils/home.type";
import { Button } from "../ui/button";

export function About({ object }: HomeProps) {
  return (
    <div>
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {object.metadata.about.heading}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {object.metadata.about.description1}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {object.metadata.about.description2}
              </p>
              <Button asChild variant="outline">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              <Image
                src={object.metadata.about.banner.url}
                alt="a frienfly guy"
                width={400}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
