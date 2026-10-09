import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";
import { getProducts, getTopFallers, getTopRisers } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";

export default async function HomePage() {
  const products = await getProducts();

  const risers = getTopRisers(products, 6);
  const fallers = getTopFallers(products, 6);

  const markets = products.flatMap((product) => product.markets ?? []);
  const marketCount = new Set(markets.map((market) => market.market)).size;
  const divisionCount = new Set(markets.map((market) => market.division)).size;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-14">
      <Hero productCount={products.length} marketCount={marketCount} divisionCount={divisionCount} />

      {/* Section A — top risers */}
      <section>
        <SectionHeader id="দাম-বেড়েছে" icon="▲" iconClass="text-error" title="আজ দাম বেড়েছে" />
        {risers.length > 0 ? (
          <ProductGrid products={risers} />
        ) : (
          <p className="opacity-70">আজ কোনো পণ্যের দাম বাড়েনি।</p>
        )}
      </section>

      {/* Section B — top fallers */}
      <section>
        <SectionHeader id="দাম-কমেছে" icon="▼" iconClass="text-primary" title="আজ দাম কমেছে" />
        {fallers.length > 0 ? (
          <ProductGrid products={fallers} />
        ) : (
          <p className="opacity-70">আজ কোনো পণ্যের দাম কমেনি।</p>
        )}
      </section>

      {/* Section C — all products */}
      <section>
        <SectionHeader
          id="সব-পণ্য"
          title="সব পণ্য"
          subtitle={`মোট ${toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
