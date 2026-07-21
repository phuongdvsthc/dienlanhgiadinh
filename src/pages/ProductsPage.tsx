import React, { useState, useMemo, useEffect } from 'react';
import { Filter, ChevronRight, X, Loader2, Database } from 'lucide-react';
import { ProductCard, Product } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { productsData as initialProductsData, searchSuggestionsData, filtersData as initialFiltersData } from '../data/products';
import { categoriesData as initialCategoriesData } from '../data/categories';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Checkbox } from '../components/ui/Checkbox';
import { Select } from '../components/ui/Select';
import { SearchInput } from '../components/ui/SearchInput';
import { getPublishedCategories, getPublishedProducts } from '../repositories/catalogRepo';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProductsData);
  const [categories, setCategories] = useState<string[]>(initialFiltersData.categories);
  const [brands, setBrands] = useState<string[]>(initialFiltersData.brands);
  const [sizes, setSizes] = useState<string[]>(initialFiltersData.sizes);
  const [isFromFirestore, setIsFromFirestore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [fetchedCategories, fetchedProducts] = await Promise.all([
          getPublishedCategories(),
          getPublishedProducts()
        ]);
        
        // Ensure fetchedProducts is actually different from fallback array memory-wise, 
        // or check its length. Since repo returns fallback on error, let's check if 
        // it returned different arrays. Actually, repo returns the mock data itself on fallback.
        const isProdMock = fetchedProducts === initialProductsData;
        const isCatMock = fetchedCategories === initialCategoriesData;
        
        if (!isProdMock || !isCatMock) {
          setIsFromFirestore(true);
          
          if (!isProdMock && fetchedProducts.length > 0) {
            setProducts(fetchedProducts);
            
            const extractedBrands = Array.from(new Set(fetchedProducts.map(p => p.brand).filter(Boolean))) as string[];
            const extractedSizes = Array.from(new Set(fetchedProducts.map(p => p.size).filter(Boolean))) as string[];
            
            if (extractedBrands.length > 0) setBrands(extractedBrands);
            if (extractedSizes.length > 0) setSizes(extractedSizes);
          }
          
          if (!isCatMock && fetchedCategories.length > 0) {
            setCategories(fetchedCategories.map((c: any) => c.title));
          }
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu (sẽ dùng mock):", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleFilter = (setFilterState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setFilterState(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
    setCurrentPage(1); // Reset page on filter change
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.productCode?.toLowerCase().includes(searchTerm.toLowerCase());
      if (searchTerm && !searchMatch) return false;

      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;

      // Brand
      if (selectedBrands.length > 0 && (!product.brand || !selectedBrands.includes(product.brand))) return false;

      // Size
      if (selectedSizes.length > 0 && (!product.size || !selectedSizes.includes(product.size))) return false;

      // Price
      if (priceRange !== 'all') {
        const price = product.price || 0;
        if (priceRange === 'under_100' && price >= 100000) return false;
        if (priceRange === '100_300' && (price < 100000 || price > 300000)) return false;
        if (priceRange === '300_500' && (price < 300000 || price > 500000)) return false;
        if (priceRange === 'over_500' && price <= 500000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0; // newest/default - assuming productsData is already sorted by newest
    });
  }, [products, searchTerm, selectedCategories, selectedBrands, selectedSizes, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeFilterCount = selectedCategories.length + selectedBrands.length + selectedSizes.length + (priceRange !== 'all' ? 1 : 0);

  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col">
      <Container className="flex-grow flex flex-col">
        {/* Breadcrumbs */}
        <nav className="text-sm text-text-accent mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
          <ChevronRight size={16} />
          <span className="text-text-primary font-semibold">Sản phẩm</span>
          {isFromFirestore && (
            <span className="ml-auto flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              <Database size={10} /> Live Data
            </span>
          )}
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <Heading level={1} variant="display" className="text-primary mb-2">Sản phẩm điện lạnh và linh kiện thay thế</Heading>
          <Text variant="large" className="text-text-accent">Tìm theo danh mục, thương hiệu, kích thước hoặc model thiết bị.</Text>
          
          <div className="max-w-3xl mt-6 relative z-10">
            <SearchInput 
              placeholder="Tìm tên sản phẩm, model hoặc kích thước..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              buttonText="Tìm kiếm"
            />
            <div className="flex flex-wrap gap-2 mt-3 items-center">
              <span className="text-sm font-semibold text-text-accent mr-1">Gợi ý:</span>
              {searchSuggestionsData.slice(0,3).map(suggestion => (
                <button 
                  key={suggestion} 
                  className="px-3 py-1 rounded-full bg-surface text-text-primary text-xs font-semibold hover:bg-border transition-colors cursor-pointer"
                  onClick={() => { setSearchTerm(suggestion); setCurrentPage(1); }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden sticky top-16 z-30 bg-background py-3 -mx-4 px-4 border-b border-border/30 mb-6 shadow-sm">
          <Button 
            variant="outline" 
            fullWidth 
            iconLeft={<Filter size={18} />} 
            onClick={() => setIsMobileFilterOpen(true)}
          >
            Lọc sản phẩm {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 flex-grow">
          {/* Sidebar Filters */}
          <aside className={`fixed inset-0 z-50 bg-background md:bg-transparent md:relative md:z-0 md:w-64 shrink-0 transition-transform duration-300 md:translate-x-0 overflow-y-auto md:overflow-visible ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="md:sticky md:top-24 bg-background p-6 md:p-6 md:rounded-xl md:border md:border-border/50 md:shadow-sm min-h-screen md:min-h-0">
              <div className="flex justify-between items-center mb-6 border-b border-border/30 pb-4 md:border-none md:pb-0">
                <Heading level={2} variant="h3" className="flex items-center gap-2">
                  <Filter size={20} className="hidden md:block" />
                  Bộ lọc
                </Heading>
                <div className="flex items-center gap-4">
                  {(activeFilterCount > 0 || searchTerm) && (
                    <button onClick={clearAllFilters} className="text-sm text-accent hover:underline font-semibold">Xóa lọc</button>
                  )}
                  <button className="md:hidden p-2 text-text-primary" onClick={() => setIsMobileFilterOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6 pb-6 border-b border-border/30">
                <Heading level={3} variant="h4" className="mb-4">Danh mục</Heading>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <Checkbox 
                      key={cat}
                      label={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(setSelectedCategories, cat)}
                    />
                  ))}
                </div>
              </div>

              {/* Brands */}
              {brands.length > 0 && (
                <div className="mb-6 pb-6 border-b border-border/30">
                  <Heading level={3} variant="h4" className="mb-4">Thương hiệu</Heading>
                  <div className="flex flex-col gap-3">
                    {brands.map((brand) => (
                      <Checkbox 
                        key={brand}
                        label={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(setSelectedBrands, brand)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="mb-6 pb-6 border-b border-border/30">
                  <Heading level={3} variant="h4" className="mb-4">Kích thước</Heading>
                  <div className="flex flex-col gap-3">
                    {sizes.map((size) => (
                      <Checkbox 
                        key={size}
                        label={size}
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleFilter(setSelectedSizes, size)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-6 md:mb-0">
                <Heading level={3} variant="h4" className="mb-4">Mức giá</Heading>
                <div className="flex flex-col gap-3">
                  {[
                    { value: 'all', label: 'Tất cả mức giá' },
                    { value: 'under_100', label: 'Dưới 100.000đ' },
                    { value: '100_300', label: '100.000đ - 300.000đ' },
                    { value: '300_500', label: '300.000đ - 500.000đ' },
                    { value: 'over_500', label: 'Trên 500.000đ' }
                  ].map((priceOption) => (
                    <label key={priceOption.value} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="priceRange"
                        value={priceOption.value}
                        checked={priceRange === priceOption.value}
                        onChange={(e) => { setPriceRange(e.target.value); setCurrentPage(1); }}
                        className="w-4 h-4 border-border text-primary focus:ring-primary accent-primary" 
                      />
                      <Text variant="small" as="span" className="text-text-accent group-hover:text-text-primary transition-colors">{priceOption.label}</Text>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Button (Mobile Only) */}
              <div className="md:hidden mt-8 sticky bottom-0 bg-background pt-4 pb-8 border-t border-border/30">
                <Button fullWidth onClick={() => setIsMobileFilterOpen(false)}>Áp dụng bộ lọc</Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow flex flex-col">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Text variant="normal" className="text-text-accent">
                Hiển thị {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} trong <span className="font-bold text-text-primary">{filteredProducts.length}</span> kết quả
                {searchTerm && <span> cho "{searchTerm}"</span>}
              </Text>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm font-semibold text-text-accent whitespace-nowrap">Sắp xếp:</span>
                <Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={[
                    { value: 'newest', label: 'Mới nhất' },
                    { value: 'price_asc', label: 'Giá thấp-cao' },
                    { value: 'price_desc', label: 'Giá cao-thấp' },
                    { value: 'name_asc', label: 'Tên A-Z' }
                  ]}
                  className="bg-background py-2 min-h-[40px]"
                />
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {cat} <button onClick={() => toggleFilter(setSelectedCategories, cat)}><X size={14} /></button>
                  </span>
                ))}
                {selectedBrands.map(brand => (
                  <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {brand} <button onClick={() => toggleFilter(setSelectedBrands, brand)}><X size={14} /></button>
                  </span>
                ))}
                {selectedSizes.map(size => (
                  <span key={size} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {size} <button onClick={() => toggleFilter(setSelectedSizes, size)}><X size={14} /></button>
                  </span>
                ))}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {priceRange === 'under_100' ? 'Dưới 100k' : priceRange === 'over_500' ? 'Trên 500k' : 'Theo khoảng giá'}
                    <button onClick={() => { setPriceRange('all'); setCurrentPage(1); }}><X size={14} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 bg-surface rounded-xl border border-border/30 flex-grow text-center">
                <Loader2 size={32} className="text-primary animate-spin mb-4" />
                <Heading level={3} variant="h4" className="mb-2">Đang tải dữ liệu...</Heading>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-surface rounded-xl border border-border/30 flex-grow text-center">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-border mb-4">
                  <SearchInput placeholder="" className="w-0 h-0 p-0 border-0 opacity-0 absolute" />
                  <Filter size={32} />
                </div>
                <Heading level={3} variant="h3" className="mb-2">Không tìm thấy sản phẩm</Heading>
                <Text className="text-text-accent max-w-md mb-6">Chúng tôi không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại. Vui lòng thử lại với các tiêu chí khác.</Text>
                <Button variant="outline" onClick={clearAllFilters}>Xóa tất cả bộ lọc</Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-auto flex justify-center items-center gap-2 pt-8">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-10 h-10 p-0 text-text-accent hover:text-primary disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <ChevronRight size={20} className="rotate-180" />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button 
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'primary' : 'outline'} 
                    size="sm" 
                    className={`w-10 h-10 p-0 ${currentPage !== i + 1 ? 'text-text-accent hover:text-primary' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-10 h-10 p-0 text-text-accent hover:text-primary disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
