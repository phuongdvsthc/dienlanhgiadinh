import { HeroSection } from '../components/home/HeroSection';
import { ProductSearch } from '../components/home/ProductSearch';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { LatestPosts } from '../components/home/LatestPosts';
import { FinalCTA } from '../components/home/FinalCTA';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductSearch />
      <CategorySection />
      <FeaturedProducts />
      <BenefitsSection />
      <ReviewsSection />
      <LatestPosts />
      <FinalCTA />
    </>
  );
}
