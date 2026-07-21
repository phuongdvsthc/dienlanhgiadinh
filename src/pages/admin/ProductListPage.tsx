import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Filter, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { getAllProductsForAdmin, deleteProduct, AdminProduct } from '../../repositories/productRepository';
import { getAllCategoriesForAdmin } from '../../repositories/categoryRepository';
import { Category } from '../../types/category';
import { Price } from '../../components/ui/Price';
import { Modal } from '../../components/ui/Modal';

export function ProductListPage() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteClick = (product: AdminProduct) => {
    setProductToDelete(product);
    setDeleteError('');
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      await deleteProduct(productToDelete.slug);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err: any) {
      setDeleteError(err.message || 'Lỗi khi xóa sản phẩm');
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProductsForAdmin(),
        getAllCategoriesForAdmin()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách sản phẩm');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setStockFilter('all');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        product.name?.toLowerCase().includes(searchLower) ||
        product.slug?.toLowerCase().includes(searchLower) ||
        product.productCode?.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory = categoryFilter === 'all' || 
        product.categoryId === categoryFilter || 
        product.categorySlug === categoryFilter;

      // Status filter
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'published' && product.published) ||
        (statusFilter === 'draft' && !product.published);

      // Stock filter
      const matchesStock = stockFilter === 'all' || product.stockStatus === stockFilter;

      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, statusFilter, stockFilter]);

  const hasActiveFilters = searchTerm !== '' || categoryFilter !== 'all' || statusFilter !== 'all' || stockFilter !== 'all';

  const getStockStatusLabel = (status?: string) => {
    switch (status) {
      case 'in_stock': return <span className="text-success font-medium">Còn hàng</span>;
      case 'low_stock': return <span className="text-warning font-medium">Sắp hết</span>;
      case 'out_of_stock': return <span className="text-error font-medium">Hết hàng</span>;
      default: return <span className="text-text-accent">Không rõ</span>;
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Quản lý sản phẩm</h1>
          <p className="text-text-accent mt-1">Quản lý danh sách sản phẩm trên website</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/admin/san-pham/them')}
          className="shrink-0"
        >
          <Plus size={20} className="mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border/50 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <Input
            id="search"
            placeholder="Tìm theo tên, mã, thương hiệu, slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            iconLeft={<Search size={18} />}
          />
        </div>
        <div className="w-full md:w-48 shrink-0">
          <Select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Tất cả danh mục' },
              ...categories.map(c => ({ value: c.slug, label: c.name }))
            ]}
          />
        </div>
        <div className="w-full md:w-40 shrink-0">
          <Select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'published', label: 'Đang hiển thị' },
              { value: 'draft', label: 'Đang ẩn' }
            ]}
          />
        </div>
        <div className="w-full md:w-40 shrink-0">
          <Select
            id="stockFilter"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Tất cả kho' },
              { value: 'in_stock', label: 'Còn hàng' },
              { value: 'low_stock', label: 'Sắp hết' },
              { value: 'out_of_stock', label: 'Hết hàng' }
            ]}
          />
        </div>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="w-full md:w-auto shrink-0 !px-3"
            title="Xóa bộ lọc"
          >
            <Filter size={18} className="mr-2 md:mr-0 lg:mr-2" />
            <span className="md:hidden lg:inline">Xóa lọc</span>
          </Button>
        )}
      </div>

      {error ? (
        <div className="bg-error/10 border border-error/20 p-6 rounded-xl text-center">
          <p className="text-error mb-4">{error}</p>
          <Button onClick={fetchData} variant="outline">Thử lại</Button>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-surface border border-border/50 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-muted border-b border-border/50">
                  <th className="px-4 py-3 font-medium text-text-primary w-16">Ảnh</th>
                  <th className="px-4 py-3 font-medium text-text-primary">Thông tin sản phẩm</th>
                  <th className="px-4 py-3 font-medium text-text-primary w-32">Danh mục</th>
                  <th className="px-4 py-3 font-medium text-text-primary w-32 text-right">Giá</th>
                  <th className="px-4 py-3 font-medium text-text-primary w-32 text-center">Tình trạng</th>
                  <th className="px-4 py-3 font-medium text-text-primary w-32 text-center">Trạng thái</th>
                  <th className="px-4 py-3 font-medium text-text-primary w-32 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-text-accent">
                      {hasActiveFilters ? (
                        <div className="flex flex-col items-center">
                          <p className="mb-4">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
                          <Button onClick={handleClearFilters} variant="outline">Xóa bộ lọc</Button>
                        </div>
                      ) : (
                        "Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!"
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-surface-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 bg-surface-muted rounded-md flex items-center justify-center overflow-hidden border border-border/50">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBMMCAyMSIvPjwvc3ZnPg==';
                              (e.target as HTMLImageElement).classList.add('p-2', 'opacity-50');
                            }} />
                          ) : (
                            <ImageIcon size={20} className="text-text-accent/50" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-text-primary line-clamp-1" title={product.name}>{product.name}</span>
                          <div className="flex items-center gap-2 text-xs text-text-accent mt-0.5">
                            {product.productCode && <span>Mã: {product.productCode}</span>}
                            {product.brand && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                <span>{product.brand}</span>
                              </>
                            )}
                            {product.featured && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-border"></span>
                                <span className="text-accent font-medium">Nổi bật</span>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary line-clamp-2" title={product.categoryName || product.category}>
                        {product.categoryName || product.category}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {product.price !== undefined && product.price > 0 ? (
                          <Price price={product.price} size="sm" layout="column" className="items-end !gap-0" oldPrice={product.oldPrice} />
                        ) : (
                          <span className="text-sm font-medium text-text-accent">Liên hệ</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-sm">
                        {getStockStatusLabel(product.stockStatus)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {product.published ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                            Đang hiển thị
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-muted text-text-accent">
                            Đang ẩn
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {product.published && (
                            <a
                              href={`/san-pham/${product.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-text-accent hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                              title="Xem trên website"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                          <button
                            onClick={() => navigate(`/admin/san-pham/${product.slug}/sua`)}
                            className="p-1.5 text-text-accent hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                            title="Sửa sản phẩm"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="p-1.5 text-text-accent hover:text-error transition-colors rounded-lg hover:bg-error/10"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="text-[10px] text-text-accent text-right mt-1" title="Cập nhật lần cuối">
                          {formatDate(product.updatedAt)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border/50 bg-surface-muted/30 text-sm text-text-accent flex justify-between items-center">
            <span>Hiển thị <strong className="text-text-primary">{filteredProducts.length}</strong> / {products.length} sản phẩm</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Xóa sản phẩm"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-error hover:bg-error/90 border-error"
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa sản phẩm'}
            </Button>
          </div>
        }
      >
        {productToDelete && (
          <div className="space-y-4">
            <p className="text-text-primary">
              Sản phẩm sẽ bị xóa khỏi Firestore. Thao tác này không thể hoàn tác.
            </p>
            {deleteError && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg text-sm">
                {deleteError}
              </div>
            )}
            <div className="flex items-center gap-4 p-4 border border-border/50 rounded-lg bg-surface-muted/30">
              <div className="w-16 h-16 bg-surface-muted rounded-md flex items-center justify-center overflow-hidden border border-border/50 shrink-0">
                {productToDelete.image ? (
                  <img src={productToDelete.image} alt={productToDelete.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-text-accent/50" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-text-primary line-clamp-2">{productToDelete.name}</h4>
                {productToDelete.productCode && (
                  <p className="text-sm text-text-accent mt-1">Mã: {productToDelete.productCode}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
