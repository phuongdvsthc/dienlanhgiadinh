import { Link } from 'react-router-dom';
import { MessageCircle, Image as ImageIcon } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Heading } from './Heading';
import { Text } from './Text';
import { Price } from './Price';
import { siteConfig } from '../../data/site';

export interface Product {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  imageAlt?: string;
  category: string;
  brand?: string;
  productCode?: string;
  size?: string;
  price?: number;
  oldPrice?: number;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  badge?: 'best_seller' | 'new' | 'low_stock' | string;
  featured?: boolean;
  shortDescription?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stockStatus === 'out_of_stock';
  const hasPrice = product.price !== undefined && product.price > 0;
  
  let badgeContent = null;
  let badgeVariant = 'bg-accent text-accent-foreground hover:bg-accent';
  
  if (product.badge === 'best_seller') {
    badgeContent = 'Bán chạy';
    badgeVariant = 'bg-error text-white hover:bg-error/90 border-transparent';
  } else if (product.badge === 'new') {
    badgeContent = 'Mới';
    badgeVariant = 'bg-accent text-accent-foreground hover:bg-accent border-transparent';
  } else if (product.badge === 'low_stock') {
    badgeContent = 'Sắp hết hàng';
    badgeVariant = 'bg-warning text-white hover:bg-warning/90 border-transparent';
  } else if (product.stockStatus === 'in_stock') {
    badgeContent = 'Trong kho';
    badgeVariant = 'bg-success/10 text-success hover:bg-success/20 border-transparent font-bold tracking-wide uppercase text-[10px]';
  } else if (product.badge) {
    badgeContent = product.badge;
  }
  
  return (
    <div className="bg-background rounded-xl shadow-sm border border-border/30 overflow-hidden hover:shadow-card transition-all duration-300 group flex flex-col relative h-full">
      {/* Overlay link to make whole card clickable */}
      <Link 
        to={`/san-pham/${product.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Xem chi tiết ${product.name}`}
      ></Link>
      
      <div className={`relative aspect-square overflow-hidden bg-surface-muted/30 p-4 flex items-center justify-center pointer-events-none ${isOutOfStock ? 'opacity-70 grayscale' : ''}`}>
        {badgeContent && !isOutOfStock && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className={badgeVariant}>{badgeContent}</Badge>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
            <span className="bg-surface-muted/90 backdrop-blur-sm text-text-primary px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-sm border border-border/50">Hết hàng</span>
          </div>
        )}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.imageAlt || product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-accent/50 bg-surface-muted/20">
            <ImageIcon size={48} className="mb-2 opacity-50" />
            <span className="text-xs font-medium">Chưa có ảnh</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow relative z-10 pointer-events-none">
        <Text variant="caption" className="text-text-accent mb-1 uppercase tracking-wider text-[11px]" title={product.category}>{product.category}</Text>
        <Heading level={3} variant="h4" className="text-text-primary mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors" title={product.name}>
          {product.name}
        </Heading>
        
        {(product.productCode || product.size) && (
          <div className="flex flex-col gap-0.5 mb-3">
            {product.productCode && <Text variant="small" className="text-text-accent text-[13px]">Mã: {product.productCode}</Text>}
            {product.size && <Text variant="small" className="text-text-accent text-[13px]">Kích thước: {product.size}</Text>}
          </div>
        )}
        
        <div className="mt-auto flex items-center justify-between pb-4">
          {hasPrice ? (
            <Price price={product.price!} oldPrice={product.oldPrice} className="!text-xl" />
          ) : (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">Liên hệ</span>
            </div>
          )}
          {product.brand && (
            <span className="text-[12px] font-medium text-text-accent border border-border/50 px-2 py-0.5 rounded">
              {product.brand}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-[1fr_auto] gap-2 border-t border-border/30 pt-4 pointer-events-auto">
          <Button 
            variant="outline" 
            className="w-full"
            href={`/san-pham/${product.slug}`}
          >
            Xem chi tiết
          </Button>
          <a 
            href={siteConfig.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-md bg-[#24ad45] hover:bg-[#1f963a] text-white flex items-center justify-center transition-colors shadow-sm"
            aria-label="Chat Zalo tư vấn"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
