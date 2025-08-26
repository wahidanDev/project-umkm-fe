import { About } from "@/components/about";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-card";
import Hero from "@/components/hero";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Hero />
        <About />
        <Categories />
        <FeaturedProducts />
      </section>
    </DefaultLayout>
  );
}
