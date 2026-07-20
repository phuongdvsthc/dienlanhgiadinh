import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { QuantitySelector } from './QuantitySelector';
import { Checkbox } from '../ui/Checkbox';
import { DetailedProduct } from '../../data/products';

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: DetailedProduct;
  initialQuantity: number;
}

export function BuyNowModal({ isOpen, onClose, product, initialQuantity }: BuyNowModalProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    agreedToTerms: false
  });

  const totalPrice = (product.price || 0) * quantity;

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setQuantity(initialQuantity);
      setIsSuccess(false);
      setFormData({
        name: '',
        phone: '',
        address: '',
        notes: '',
        agreedToTerms: false
      });
    }
  }, [isOpen, initialQuantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.agreedToTerms) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc và đồng ý với điều khoản.");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 600);
  };

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6 text-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Đặt hàng thành công!</h2>
          <p className="text-text-secondary mb-8">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm để xác nhận đơn hàng và phí vận chuyển.
          </p>
          <div className="bg-surface-muted/30 px-6 py-3 rounded-lg border border-border/50 mb-8 w-full">
            <span className="text-sm font-semibold text-text-accent block mb-1">Mã Yêu Cầu</span>
            <span className="text-xl font-bold text-primary">#ORD-{Math.floor(10000 + Math.random() * 90000)}</span>
          </div>
          <Button onClick={onClose} fullWidth>Đóng</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yêu cầu đặt hàng">
      <div className="flex flex-col gap-6">
        {/* Product Summary */}
        <div className="bg-surface-muted/10 p-4 rounded-lg shadow-sm border border-border/50 flex gap-4 items-start">
          <div className="w-20 h-20 bg-surface-muted/30 rounded border border-border/50 flex-shrink-0 p-1">
            <img src={product.gallery?.[0] || product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-primary line-clamp-2">{product.name}</h3>
            {product.productCode && <p className="text-xs text-text-accent mt-1">Mã: {product.productCode}</p>}
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-bold text-accent">
                {product.price ? product.price.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
              </span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} min={1} max={99} />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm text-text-secondary bg-primary/5 p-3 rounded text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Phí giao hàng sẽ được thông báo khi xác nhận đơn.</p>
        </div>

        <form id="buy-now-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input 
              label="Họ và tên *" 
              placeholder="Nhập họ và tên" 
              required 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <Input 
              label="Số điện thoại *" 
              type="tel" 
              placeholder="Nhập số điện thoại" 
              required 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <Textarea 
            label="Địa chỉ giao hàng *" 
            placeholder="Nhập số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" 
            rows={2} 
            required 
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
          <Textarea 
            label="Ghi chú (Không bắt buộc)" 
            placeholder="Yêu cầu riêng về lắp đặt, thời gian giao hàng..." 
            rows={2} 
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
          />

          <div className="flex flex-col gap-3 mt-2">
            <Checkbox 
              label="Tôi đã kiểm tra kỹ thông số, kích thước và mã sản phẩm phù hợp với nhu cầu." 
              checked={formData.agreedToTerms}
              onChange={() => setFormData({...formData, agreedToTerms: !formData.agreedToTerms})}
            />
          </div>
        </form>

        <div className="border-t border-border/50 pt-5 mt-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-text-primary">Tạm tính:</span>
            <span className="text-2xl font-bold text-accent">
              {totalPrice > 0 ? totalPrice.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
            </span>
          </div>
          <Button 
            type="submit" 
            form="buy-now-form" 
            size="lg" 
            fullWidth 
            disabled={!formData.agreedToTerms || !formData.name || !formData.phone || !formData.address}
          >
            Gửi yêu cầu đặt hàng
          </Button>
          <p className="text-center text-xs text-text-accent italic">Đây là yêu cầu đặt hàng, chưa phải thanh toán thành công.</p>
        </div>
      </div>
    </Modal>
  );
}
