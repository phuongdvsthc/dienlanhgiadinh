import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Checkbox } from '../../components/ui/Checkbox';
import { getCategoryBySlug, updateCategory } from '../../repositories/categoryRepository';
import { Category } from '../../types/category';

export function EditCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [loadError, setLoadError] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState<number | string>(0);
  const [published, setPublished] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function fetchCategory() {
      if (!slug) return;
      try {
        const data = await getCategoryBySlug(slug);
        if (data) {
          setCategory(data);
          setName(data.name || '');
          setDescription(data.description || '');
          setOrder(data.order !== undefined ? data.order : 0);
          setPublished(data.published);
          setImageUrl(data.image?.url || '');
          setImageAlt(data.image?.alt || '');
        } else {
          setLoadError('Không tìm thấy danh mục');
        }
      } catch (error: any) {
        setLoadError(error.message || 'Lỗi khi tải danh mục');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategory();
  }, [slug]);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setOrder('');
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setOrder(num);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Tên danh mục là bắt buộc';
    
    if (order === '' || Number(order) < 0) {
      newErrors.order = 'Thứ tự hiển thị phải là số nguyên không âm';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm() || !slug) return;
    
    setIsSubmitting(true);
    
    try {
      let finalImageAlt = imageAlt;
      if (imageUrl && !imageAlt) {
        finalImageAlt = name;
      }
      
      await updateCategory(slug, {
        name: name.trim(),
        description: description.trim(),
        order: Number(order) || 0,
        published,
        image: imageUrl ? {
          url: imageUrl.trim(),
          alt: finalImageAlt.trim()
        } : undefined
      });
      
      alert('Cập nhật danh mục thành công!');
      navigate('/admin/danh-muc');
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.message || 'Đã có lỗi xảy ra khi cập nhật danh mục');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (loadError || !category) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-error/10 border border-error/20 p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-error/20 text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-xl font-bold text-error mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-text-primary mb-6">{loadError || 'Không tìm thấy danh mục'}</p>
          <Button onClick={() => navigate('/admin/danh-muc')} variant="outline">
            Trở về danh sách danh mục
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/danh-muc')}
          className="!p-2"
          aria-label="Quay lại"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Sửa danh mục</h1>
          <p className="text-text-accent mt-1">Chỉnh sửa thông tin danh mục "{category.name}"</p>
        </div>
      </div>
      
      {submitError && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error">
          {submitError}
        </div>
      )}
      
      <div className="bg-surface border border-border/50 rounded-xl overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary border-b border-border/50 pb-2">
              Thông tin chung
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="name"
                label="Tên danh mục"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
                placeholder="VD: Lò vi sóng"
                disabled={isSubmitting}
              />
              
              <Input
                id="slug"
                label="Đường dẫn (Slug)"
                value={slug}
                readOnly
                disabled
                hint="Slug đang được dùng làm mã tài liệu và đường dẫn danh mục."
              />
            </div>
            
            <Textarea
              id="description"
              label="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn gọn về danh mục..."
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary border-b border-border/50 pb-2">
              Hình ảnh
            </h2>
            
            <Input
              id="imageUrl"
              label="Đường dẫn ảnh (URL)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
              type="url"
            />
            
            <Input
              id="imageAlt"
              label="Mô tả ảnh (Alt)"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder="Nếu trống sẽ dùng tên danh mục"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary border-b border-border/50 pb-2">
              Tùy chọn hiển thị
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="order"
                label="Thứ tự hiển thị"
                type="number"
                min="0"
                value={order}
                onChange={handleOrderChange}
                error={errors.order}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="mt-2">
              <Checkbox
                id="published"
                label="Hiển thị trên website"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/danh-muc')}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
