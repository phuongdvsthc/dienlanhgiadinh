import { mockProducts } from '../../data/mock';
import { ProductCard } from '../ui/ProductCard';

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-surface-lowest">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Sản phẩm nổi bật</h2>
            <p className="text-muted mt-2">Các linh kiện và phụ kiện được mua nhiều nhất</p>
          </div>
          <a href="/san-pham" className="text-primary font-semibold hover:text-secondary transition-colors hidden sm:block">
            Xem tất cả sản phẩm &rarr;
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <a href="/san-pham" className="text-primary font-semibold hover:text-secondary transition-colors inline-block">
            Xem tất cả sản phẩm &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
