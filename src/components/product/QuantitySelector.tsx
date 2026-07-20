import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      if (val >= min && val <= max) {
        onChange(val);
      }
    }
  };

  return (
    <div className="flex items-center border border-border/50 rounded-md bg-surface-muted/30">
      <button 
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center text-text-secondary hover:bg-surface-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-label="Giảm số lượng"
      >
        <Minus size={18} />
      </button>
      <input 
        type="number" 
        value={quantity}
        onChange={handleChange}
        className="w-12 h-10 text-center border-none bg-transparent focus:ring-0 text-text-primary font-medium p-0"
        min={min}
        max={max}
      />
      <button 
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center text-text-secondary hover:bg-surface-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-label="Tăng số lượng"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
