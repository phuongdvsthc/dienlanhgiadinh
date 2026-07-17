import { Hero } from '../components/home/Hero';
import { SearchBar } from '../components/home/SearchBar';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { CTASection } from '../components/home/CTASection';

export function HomePage() {
  return (
    <>
      <Hero />
      <SearchBar />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
