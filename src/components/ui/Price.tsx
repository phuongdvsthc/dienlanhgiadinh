import React from 'react';

interface PriceProps {
  price: number;
  oldPrice?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'row' | 'column';
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
};

export function Price({ price, oldPrice, className = '', size = 'md', layout = 'row' }: PriceProps) {
  const priceClass = sizeClasses[size];
  const layoutClass = layout === 'row' ? 'flex-row items-end gap-2' : 'flex-col';

  return (
    <div className={`flex ${layoutClass} ${className}`}>
      <span className={`${priceClass} font-bold text-primary`}>
        {price.toLocaleString('vi-VN')}đ
      </span>
      {oldPrice && (
        <span className="text-sm text-text-accent line-through mb-0.5">
          {oldPrice.toLocaleString('vi-VN')}đ
        </span>
      )}
    </div>
  );
}
