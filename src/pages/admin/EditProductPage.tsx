import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { ProductForm } from '../../components/admin/ProductForm';
import { getProductForAdminBySlug, updateProduct, AdminProduct } from '../../repositories/productRepository';
import { getAllCategoriesForAdmin } from '../../repositories/categoryRepository';
import { Category } from '../../types/category';
import { Button } from '../../components/ui/Button';

export function EditProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const fetchData = async () => {
    if (!slug) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const [productData, categoriesData] = await Promise.all([
        getProductForAdminBySlug(slug),
        getAllCategoriesForAdmin()
      ]);
      
      if (!productData) {
        setError('Không tìm thấy sản phẩm');
      } else {
        setProduct(productData);
      }
      setCategories(categoriesData);
    } catch (err: any) {
      setError('Lỗi tải dữ liệu: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleSubmit = async (data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!slug) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Bỏ slug ra khỏi data update vì không được phép đổi
      const { slug: formSlug, ...updateData } = data;
      
      await updateProduct(slug, updateData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/san-pham');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi cập nhật sản phẩm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !product) {
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
            <h1 className="text-2xl font-bold text-text-primary">Sửa sản phẩm</h1>
          </div>
        </div>
        
        <div className="bg-error/10 border border-error/20 p-8 rounded-xl text-center space-y-4">
          <AlertCircle size={48} className="text-error mx-auto" />
          <h2 className="text-xl font-bold text-error">Lỗi</h2>
          <p className="text-text-primary max-w-md mx-auto">
            {error}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button onClick={fetchData} variant="primary">Thử lại</Button>
            <Button onClick={() => navigate('/admin/san-pham')} variant="outline">Quay lại danh sách</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

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
          <h1 className="text-2xl font-bold text-text-primary">Sửa sản phẩm</h1>
          <p className="text-text-accent mt-1">Sản phẩm: {product.name}</p>
        </div>
      </div>

      {success && (
        <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg mb-6 flex items-center">
          <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
          Cập nhật sản phẩm thành công! Đang chuyển hướng...
        </div>
      )}

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <ProductForm
        initialData={product}
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
