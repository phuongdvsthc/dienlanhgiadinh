import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { getFeaturedProducts } from '../../repositories/catalogRepo';

export function FeaturedProducts() {
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await getFeaturedProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
      }
    }
    loadFeaturedProducts();
  }, []);

  return (
    <section className="py-section-md bg-background">
      <Container>
        <div className="flex justify-between items-end mb-10">
          <SectionHeading title="Sản phẩm nổi bật" subtitle="Các linh kiện và phụ kiện được mua nhiều nhất" className="!mb-0" />
          <Link to="/san-pham" className="text-primary font-semibold hover:text-accent transition-colors hidden sm:block mb-2">
            Xem tất cả sản phẩm &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/san-pham" className="text-primary font-semibold hover:text-accent transition-colors inline-block">
            Xem tất cả sản phẩm &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
