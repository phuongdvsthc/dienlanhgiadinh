import { ShoppingCart } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-surface-lowest rounded-xl shadow-sm border border-border/30 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-surface-variant/30">
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Mới</Badge>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-muted mb-2 font-semibold uppercase tracking-wider">{product.category}</div>
        <h3 className="font-bold text-surface-foreground leading-snug mb-3 flex-grow line-clamp-2">{product.name}</h3>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-lg font-bold text-primary">{product.price.toLocaleString('vi-VN')}đ</span>
          {product.oldPrice && (
            <span className="text-sm text-muted line-through mb-0.5">{product.oldPrice.toLocaleString('vi-VN')}đ</span>
          )}
        </div>
        <Button variant="outline" className="w-full" icon={<ShoppingCart size={16} />}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
