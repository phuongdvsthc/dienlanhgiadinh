import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Checkbox } from '../../components/ui/Checkbox';
import { createCategory, isCategorySlugAvailable } from '../../repositories/categoryRepository';

export function AddCategoryPage() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState<number | string>(0);
  const [published, setPublished] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chỉ cho phép chữ thường, số, dấu gạch ngang
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(value);
    setIsSlugManuallyEdited(true);
  };

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
    if (!slug.trim()) newErrors.slug = 'Đường dẫn (slug) là bắt buộc';
    else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = 'Slug chỉ gồm chữ thường không dấu, số và gạch ngang';
    }
    
    if (order === '' || Number(order) < 0) {
      newErrors.order = 'Thứ tự hiển thị phải là số nguyên không âm';
    }
    
    setErrors(newErrors);
    
    // Focus vào lỗi đầu tiên
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
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const isAvailable = await isCategorySlugAvailable(slug);
      if (!isAvailable) {
        setErrors(prev => ({ ...prev, slug: 'Đường dẫn (slug) này đã tồn tại' }));
        document.getElementById('slug')?.focus();
        setIsSubmitting(false);
        return;
      }
      
      let finalImageAlt = imageAlt;
      if (imageUrl && !imageAlt) {
        finalImageAlt = name;
      }
      
      await createCategory({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        order: Number(order) || 0,
        published,
        image: imageUrl ? {
          url: imageUrl.trim(),
          alt: finalImageAlt.trim()
        } : undefined
      });
      
      alert('Tạo danh mục thành công!');
      navigate('/admin/danh-muc');
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.message || 'Đã có lỗi xảy ra khi tạo danh mục');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Thêm danh mục mới</h1>
          <p className="text-text-accent mt-1">Tạo danh mục để phân loại sản phẩm</p>
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
                onChange={handleNameChange}
                error={errors.name}
                required
                placeholder="VD: Lò vi sóng"
                disabled={isSubmitting}
              />
              
              <Input
                id="slug"
                label="Đường dẫn (Slug)"
                value={slug}
                onChange={handleSlugChange}
                error={errors.slug}
                required
                hint="Dùng để tạo link, tự động tạo từ tên nếu để trống"
                disabled={isSubmitting}
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
              Lưu danh mục
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
