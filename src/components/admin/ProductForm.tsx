import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { AdminProduct } from '../../repositories/productRepository';
import { Category } from '../../types/category';

export interface ProductFormProps {
  initialData?: Partial<AdminProduct>;
  categories: Category[];
  onSubmit: (data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function ProductForm({
  initialData,
  categories,
  onSubmit,
  isSubmitting,
  onCancel
}: ProductFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    productCode: initialData?.productCode || '',
    categoryId: initialData?.categoryId || '',
    price: initialData?.price?.toString() || '',
    oldPrice: initialData?.oldPrice?.toString() || '',
    stockStatus: initialData?.stockStatus || 'in_stock',
    featured: initialData?.featured || false,
    published: initialData?.published !== false,
    image: initialData?.image || '',
    imageAlt: initialData?.imageAlt || '',
    shortDescription: initialData?.shortDescription || '',
    specifications: initialData?.specifications || [],
    faq: initialData?.faq || [],
  });

  const [error, setError] = useState('');

  // Auto-generate slug from name if slug is empty and not editing
  useEffect(() => {
    if (!initialData?.id && formData.name && !formData.slug) {
      const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
          .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
          .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
          .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
          .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
          .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
          .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
          .replace(/đ/gi, 'd')
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      };
      // We don't auto-set slug to avoid annoying behavior while typing, 
      // but we could. For now, leave it manual or add a button.
    }
  }, [formData.name, initialData, formData.slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSpec = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }]
    }));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleRemoveSpec = (index: number) => {
    const newSpecs = [...formData.specifications];
    newSpecs.splice(index, 1);
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }]
    }));
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...formData.faq];
    newFaqs[index][field] = value;
    setFormData(prev => ({ ...prev, faq: newFaqs }));
  };

  const handleRemoveFaq = (index: number) => {
    const newFaqs = [...formData.faq];
    newFaqs.splice(index, 1);
    setFormData(prev => ({ ...prev, faq: newFaqs }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.name) throw new Error('Vui lòng nhập tên sản phẩm');
      if (!formData.slug) throw new Error('Vui lòng nhập đường dẫn (slug)');
      if (!formData.categoryId) throw new Error('Vui lòng chọn danh mục');

      const selectedCategory = categories.find(c => c.id === formData.categoryId || c.slug === formData.categoryId);
      if (!selectedCategory) throw new Error('Danh mục không hợp lệ');

      const submitData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        slug: formData.slug,
        productCode: formData.productCode || undefined,
        categoryId: selectedCategory.id,
        categorySlug: selectedCategory.slug,
        categoryName: selectedCategory.name,
        category: selectedCategory.name,
        price: formData.price ? Number(formData.price) : undefined,
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        stockStatus: formData.stockStatus as any,
        featured: formData.featured,
        published: formData.published,
        image: formData.image || undefined,
        imageAlt: formData.imageAlt || undefined,
        shortDescription: formData.shortDescription || undefined,
        specifications: formData.specifications.filter(s => s.label && s.value),
        faq: formData.faq.filter(f => f.question && f.answer),
      };

      await onSubmit(submitData);
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra');
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/admin/san-pham');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Thông tin cơ bản</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Tên sản phẩm <span className="text-error">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="VD: Giày thể thao nam"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Đường dẫn (Slug) <span className="text-error">*</span>
                </label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="VD: giay-the-thao-nam"
                  disabled={!!initialData?.id} // Không cho đổi slug khi sửa
                  required
                />
                <p className="text-xs text-text-accent mt-1">
                  {initialData?.id 
                    ? "Slug đang được dùng làm Document ID và đường dẫn sản phẩm. Không thể thay đổi." 
                    : "Đường dẫn URL của sản phẩm. Không nên thay đổi sau khi tạo để tốt cho SEO."}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Mô tả ngắn
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Nhập mô tả ngắn gọn về sản phẩm"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Giá & Kho</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Giá bán (VNĐ)
                </label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="VD: 1500000"
                  min="0"
                />
                <p className="text-xs text-text-accent mt-1">Để trống nếu muốn hiển thị "Liên hệ"</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Giá gốc (VNĐ)
                </label>
                <Input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="VD: 2000000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Tình trạng hàng
                </label>
                <Select
                  name="stockStatus"
                  value={formData.stockStatus}
                  onChange={handleChange}
                  options={[
                    { value: 'in_stock', label: 'Còn hàng' },
                    { value: 'low_stock', label: 'Sắp hết' },
                    { value: 'out_of_stock', label: 'Hết hàng' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Mã sản phẩm (SKU)
                </label>
                <Input
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleChange}
                  placeholder="VD: SP-001"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="font-semibold text-lg">Thông số kỹ thuật</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddSpec}>
                <Plus size={16} className="mr-1" /> Thêm
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.specifications.map((spec: any, index: number) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <Input
                      placeholder="Tên thông số (VD: Màu sắc)"
                      value={spec.label}
                      onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Giá trị (VD: Đen)"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    />
                  </div>
                  <Button type="button" variant="outline" className="shrink-0 text-error hover:bg-error/10 border-transparent px-3" onClick={() => handleRemoveSpec(index)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              {formData.specifications.length === 0 && (
                <p className="text-text-accent text-sm text-center py-4">Chưa có thông số kỹ thuật nào.</p>
              )}
            </div>
          </div>

          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="font-semibold text-lg">Hỏi đáp (FAQ)</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddFaq}>
                <Plus size={16} className="mr-1" /> Thêm
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.faq.map((item: any, index: number) => (
                <div key={index} className="flex gap-3 items-start bg-surface-muted/30 p-4 rounded-lg border border-border/30">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Câu hỏi"
                      value={item.question}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    />
                    <textarea
                      placeholder="Câu trả lời"
                      value={item.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow min-h-[80px]"
                    />
                  </div>
                  <Button type="button" variant="outline" className="shrink-0 text-error hover:bg-error/10 border-transparent px-3" onClick={() => handleRemoveFaq(index)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              {formData.faq.length === 0 && (
                <p className="text-text-accent text-sm text-center py-4">Chưa có câu hỏi FAQ nào.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Phân loại</h3>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Danh mục <span className="text-error">*</span>
              </label>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                options={[
                  { value: '', label: '-- Chọn danh mục --' },
                  ...categories.map(c => ({ value: c.id, label: c.name }))
                ]}
              />
            </div>
          </div>

          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Trạng thái hiển thị</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-border/50 rounded-lg cursor-pointer hover:bg-surface-muted/50 transition-colors">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
                />
                <div>
                  <div className="font-medium text-text-primary">Đang hiển thị</div>
                  <div className="text-xs text-text-accent">Cho phép khách hàng xem sản phẩm này</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border/50 rounded-lg cursor-pointer hover:bg-surface-muted/50 transition-colors">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50"
                />
                <div>
                  <div className="font-medium text-text-primary">Sản phẩm nổi bật</div>
                  <div className="text-xs text-text-accent">Hiển thị ở trang chủ hoặc danh sách ưu tiên</div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-surface border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Hình ảnh đại diện</h3>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                URL Hình ảnh
              </label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Văn bản thay thế (Alt)
              </label>
              <Input
                name="imageAlt"
                value={formData.imageAlt}
                onChange={handleChange}
                placeholder="Mô tả hình ảnh cho SEO"
              />
            </div>

            {formData.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-border/50 aspect-square flex items-center justify-center bg-surface-muted">
                <img 
                  src={formData.image} 
                  alt={formData.imageAlt || "Preview"} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBMMCAyMSIvPjwvc3ZnPg==';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <X size={20} className="mr-2" />
          Hủy
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Đang lưu...
            </div>
          ) : (
            <>
              <Save size={20} className="mr-2" />
              Lưu sản phẩm
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
