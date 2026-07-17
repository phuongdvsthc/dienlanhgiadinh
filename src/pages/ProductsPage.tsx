import { Filter, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { mockProducts } from '../data/mock';

// Generate some extra mock products by duplicating for layout purposes
const extendedProducts = [
  ...mockProducts,
  { ...mockProducts[0], id: '5', name: 'Đĩa xoay lò vi sóng Electrolux 24.5cm', isNew: false },
  { ...mockProducts[1], id: '6', name: 'Trục xoay lò vi sóng LG hình hoa mai', isNew: true },
  { ...mockProducts[2], id: '7', name: 'Tụ điện máy lạnh Daikin chính hãng', oldPrice: undefined },
  { ...mockProducts[3], id: '8', name: 'Bo mạch máy giặt Sanyo Inverter', isNew: false, price: 350000 },
  { ...mockProducts[0], id: '9', name: 'Vòng xoay lò vi sóng 3 bánh xe', isNew: false, price: 45000 },
];

export function ProductsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-muted mb-8 flex items-center gap-2">
        <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
        <span>/</span>
        <span className="text-surface-foreground font-semibold">Sản phẩm</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-surface-lowest rounded-xl border border-border/50 p-6 sticky top-24 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-border/50 pb-4">
              <Filter size={20} />
              <h2 className="font-bold text-lg">Bộ lọc</h2>
            </div>
            
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-bold text-surface-foreground mb-4">Danh mục</h3>
              <div className="flex flex-col gap-3">
                {['Tất cả sản phẩm', 'Đĩa xoay lò vi sóng', 'Linh kiện lò vi sóng', 'Linh kiện máy lạnh', 'Linh kiện máy giặt', 'Năng lượng mặt trời'].map((cat, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary" 
                      defaultChecked={idx === 0}
                    />
                    <span className="text-sm text-muted group-hover:text-surface-foreground transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-bold text-surface-foreground mb-4">Mức giá</h3>
              <div className="flex flex-col gap-3">
                {['Tất cả mức giá', 'Dưới 100.000đ', '100.000đ - 300.000đ', '300.000đ - 500.000đ', 'Trên 500.000đ'].map((price, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price"
                      className="w-4 h-4 border-border text-primary focus:ring-primary accent-primary" 
                      defaultChecked={idx === 0}
                    />
                    <span className="text-sm text-muted group-hover:text-surface-foreground transition-colors">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Top Bar */}
          <div className="bg-surface-lowest rounded-xl border border-border/50 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
            <h1 className="text-2xl font-bold text-primary tracking-tight">Tất cả sản phẩm <span className="text-sm font-normal text-muted ml-2">({extendedProducts.length} sản phẩm)</span></h1>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-muted whitespace-nowrap">Sắp xếp:</span>
              <div className="relative w-full sm:w-48">
                <select className="w-full appearance-none bg-surface-variant/50 border border-border/50 rounded-md py-2 pl-4 pr-10 text-sm font-medium text-surface-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                  <option>Bán chạy nhất</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {extendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <Button variant="outline" size="sm" className="w-10 h-10 p-0 text-muted hover:text-primary">&lt;</Button>
            <Button variant="primary" size="sm" className="w-10 h-10 p-0">1</Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0 text-muted hover:text-primary">2</Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0 text-muted hover:text-primary">3</Button>
            <span className="text-muted px-2">...</span>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0 text-muted hover:text-primary">&gt;</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
