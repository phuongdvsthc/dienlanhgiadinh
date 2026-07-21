import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { ProductForm } from '../../components/admin/ProductForm';
import { createProduct, AdminProduct } from '../../repositories/productRepository';
import { getAllCategoriesForAdmin } from '../../repositories/categoryRepository';
import { Category } from '../../types/category';

export function AddProductPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategoriesForAdmin();
        setCategories(data);
      } catch (err: any) {
        setError('Không thể tải danh sách danh mục: ' + err.message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await createProduct(data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/san-pham');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tạo sản phẩm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingCategories) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Link 
            to="/admin/san-pham"
            className="w-10 h-10 rounded-full bg-surface border border-border/50 flex items-center justify-center text-text-accent hover:text-primary hover:border-primary/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Thêm sản phẩm mới</h1>
          </div>
        </div>
        
        <div className="bg-warning/10 border border-warning/20 p-8 rounded-xl text-center space-y-4">
          <AlertCircle size={48} className="text-warning mx-auto" />
          <h2 className="text-xl font-bold text-warning">Chưa có danh mục nào</h2>
          <p className="text-text-primary max-w-md mx-auto">
            Bạn cần tạo ít nhất một danh mục trước khi có thể thêm sản phẩm.
          </p>
          <div className="pt-4">
            <Link 
              to="/admin/danh-muc/them"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tạo danh mục ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link 
          to="/admin/san-pham"
          className="w-10 h-10 rounded-full bg-surface border border-border/50 flex items-center justify-center text-text-accent hover:text-primary hover:border-primary/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Thêm sản phẩm mới</h1>
          <p className="text-text-accent mt-1">Điền thông tin bên dưới để tạo sản phẩm</p>
        </div>
      </div>

      {success && (
        <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg mb-6 flex items-center">
          <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
          Thêm sản phẩm thành công! Đang chuyển hướng...
        </div>
      )}

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
