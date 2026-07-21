import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  getAllCategoriesForAdmin, 
  deleteCategory, 
  countProductsByCategorySlug 
} from '../../repositories/categoryRepository';
import { Category } from '../../types/category';

export function CategoryListPage() {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isCheckingProducts, setIsCheckingProducts] = useState(false);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const fetchCategories = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getAllCategoriesForAdmin();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách danh mục');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteClick = async (category: Category) => {
    setCategoryToDelete(category);
    setIsModalOpen(true);
    setDeleteError('');
    setProductCount(null);
    setIsCheckingProducts(true);

    try {
      const count = await countProductsByCategorySlug(category.slug);
      setProductCount(count);
    } catch (err: any) {
      setDeleteError(err.message || 'Lỗi khi kiểm tra sản phẩm');
    } finally {
      setIsCheckingProducts(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete || productCount !== 0) return;
    
    setIsDeleting(true);
    setDeleteError('');
    
    try {
      await deleteCategory(categoryToDelete.slug);
      setIsModalOpen(false);
      setCategoryToDelete(null);
      // Reload categories
      fetchCategories();
      alert('Đã xóa danh mục thành công!');
    } catch (err: any) {
      setDeleteError(err.message || 'Đã có lỗi xảy ra khi xóa danh mục');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    if (isDeleting) return; // Prevent closing while deleting
    setIsModalOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Quản lý danh mục</h1>
          <p className="text-text-accent mt-1">Quản lý các danh mục sản phẩm trên website</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/admin/danh-muc/them')}
          className="shrink-0"
        >
          <Plus size={20} className="mr-2" />
          Thêm danh mục
        </Button>
      </div>

      {error ? (
        <div className="bg-error/10 border border-error/20 p-4 rounded-lg text-error">
          {error}
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-surface border border-border/50 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-muted border-b border-border/50">
                  <th className="px-6 py-4 font-medium text-text-primary">Tên danh mục</th>
                  <th className="px-6 py-4 font-medium text-text-primary">Slug</th>
                  <th className="px-6 py-4 font-medium text-text-primary text-center">Thứ tự</th>
                  <th className="px-6 py-4 font-medium text-text-primary text-center">Trạng thái</th>
                  <th className="px-6 py-4 font-medium text-text-primary text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-accent">
                      Chưa có danh mục nào. Hãy thêm danh mục đầu tiên!
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-surface-muted/30 transition-colors">
                      <td className="px-6 py-4 text-text-primary font-medium">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-text-accent text-sm">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 text-text-primary text-center">
                        {category.order}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {category.published ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                            Đang hiển thị
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-muted text-text-accent">
                            Đang ẩn
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/danh-muc/${category.slug}/sua`)}
                            className="p-2 text-text-accent hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                            title="Sửa danh mục"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(category)}
                            className="p-2 text-text-accent hover:text-error transition-colors rounded-lg hover:bg-error/10"
                            title="Xóa danh mục"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Xóa danh mục"
      >
        <div className="space-y-4">
          <p className="text-text-primary font-medium text-lg border-b border-border/50 pb-2">
            {categoryToDelete?.name}
          </p>

          {isCheckingProducts ? (
            <div className="flex items-center gap-3 text-text-accent">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Đang kiểm tra sản phẩm...</span>
            </div>
          ) : deleteError ? (
            <div className="text-error bg-error/10 p-3 rounded-lg">
              {deleteError}
            </div>
          ) : productCount !== null && productCount > 0 ? (
            <div className="text-error bg-error/10 p-3 rounded-lg">
              Không thể xóa danh mục vì đang có {productCount} sản phẩm thuộc danh mục này.
            </div>
          ) : (
            <p className="text-text-accent">
              Cảnh báo thao tác không thể hoàn tác. Bạn có chắc chắn muốn xóa danh mục này không?
            </p>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={handleCloseModal}
              disabled={isDeleting}
            >
              {productCount !== null && productCount > 0 ? 'Đóng' : 'Hủy'}
            </Button>
            
            {!isCheckingProducts && productCount === 0 && (
              <Button 
                variant="primary" 
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                isLoading={isDeleting}
                className="!bg-error hover:!bg-error/90 !text-white !border-error"
              >
                Xóa danh mục
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
