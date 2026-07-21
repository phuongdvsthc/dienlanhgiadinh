import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, MessageCircle, Phone, CheckCircle, Search, Settings, AlertTriangle, Image as ImageIcon, Database } from 'lucide-react';
import { detailedProductsData, DetailedProduct } from '../data/products';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Badge } from '../components/ui/Badge';
import { Price } from '../components/ui/Price';
import { ProductGallery } from '../components/product/ProductGallery';
import { BuyNowModal } from '../components/product/BuyNowModal';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { siteConfig } from '../data/site';
import { ProductCard, Product } from '../components/ui/ProductCard';
import { getProductBySlug, getPublishedProducts } from '../repositories/catalogRepo';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'guide'>('specs');
  const [isFromFirestore, setIsFromFirestore] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      
      window.scrollTo(0, 0);
      setLoading(true);
      
      try {
        const fetchedProduct = await getProductBySlug(slug);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setIsFromFirestore(fetchedProduct !== detailedProductsData.find(p => p.slug === slug || p.id === slug));
          
          const allProducts = await getPublishedProducts();
          const related = allProducts
            .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id && p.slug !== fetchedProduct.slug)
            .slice(0, 4);
            
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Lỗi tải chi tiết sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <Container className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-surface-muted/30 rounded-full flex items-center justify-center text-text-accent mb-6">
          <Search size={40} />
        </div>
        <Heading level={2} variant="h2" className="mb-4">Không tìm thấy sản phẩm</Heading>
        <Text variant="large" className="text-text-accent mb-8 max-w-md">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn.
        </Text>
        <Button onClick={() => navigate('/san-pham')}>Quay lại danh sách sản phẩm</Button>
      </Container>
    );
  }

  const isOutOfStock = product.stockStatus === 'out_of_stock';
  const hasPrice = product.price !== undefined && product.price > 0;
  
  return (
    <div className="pt-24 pb-16 relative">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-sm font-semibold text-text-accent mb-8 flex flex-wrap items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Trang chủ</button>
          <ChevronRight size={16} />
          <button onClick={() => navigate('/san-pham')} className="hover:text-primary transition-colors">Sản phẩm</button>
          <ChevronRight size={16} />
          <span className="text-primary truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          {isFromFirestore && (
            <span className="ml-auto flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              <Database size={10} /> Live Data
            </span>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <ProductGallery images={product.gallery || (product.image ? [product.image] : [])} altPrefix={product.name} />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-6 flex flex-col">
            <Text variant="caption" className="text-text-accent mb-2 uppercase tracking-wider">{product.category}</Text>
            <Heading level={1} variant="display" className="text-primary mb-4 text-3xl md:text-4xl">{product.name}</Heading>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {product.rating && (
                <div className="flex items-center gap-1 text-[#facc15]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'fill-transparent stroke-current'}`} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                  ))}
                  <span className="text-sm font-semibold text-text-accent ml-1">({product.rating}/5)</span>
                </div>
              )}
              {product.productCode && (
                <>
                  <div className="w-1 h-1 rounded-full bg-border"></div>
                  <span className="text-sm font-semibold text-text-accent">Mã SP: <span className="text-text-primary">{product.productCode}</span></span>
                </>
              )}
              {product.brand && (
                <>
                  <div className="w-1 h-1 rounded-full bg-border"></div>
                  <span className="text-sm font-semibold text-text-accent">Thương hiệu: <span className="text-primary">{product.brand}</span></span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              {hasPrice ? (
                <Price price={product.price!} oldPrice={product.oldPrice} className="text-3xl" />
              ) : (
                <span className="text-3xl font-bold text-accent">Liên hệ</span>
              )}
              
              {!isOutOfStock ? (
                <Badge className="bg-success/10 text-success border-transparent hover:bg-success/20 py-1 px-3">
                  <CheckCircle size={14} className="mr-1 inline-block" /> Còn hàng
                </Badge>
              ) : (
                <Badge className="bg-surface-muted/90 text-text-primary border-border/50 py-1 px-3">Hết hàng</Badge>
              )}
            </div>

            {product.shortDescription && (
              <Text className="text-text-secondary mb-8 border-b border-border/50 pb-8">
                {product.shortDescription}
              </Text>
            )}

            {/* Compatibility Alert */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-primary mb-1">Vui lòng kiểm tra độ tương thích</p>
                  <p className="text-sm text-text-secondary">Hãy chắc chắn linh kiện này phù hợp với thiết bị của bạn trước khi đặt hàng.</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap bg-white"
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Gửi ảnh Zalo kiểm tra
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="w-32 hidden sm:block">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
              <Button 
                size="lg" 
                className="flex-1 font-bold shadow-md h-[52px]" 
                disabled={isOutOfStock}
                onClick={() => setIsBuyModalOpen(true)}
              >
                MUA NGAY
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 font-bold h-[52px] bg-[#24ad45] text-white hover:bg-[#1f963a] border-transparent hover:border-transparent hover:text-white"
                iconLeft={<MessageCircle size={20} />}
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                CHAT ZALO
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 border border-border/50 rounded-lg bg-surface">
                <Settings className="text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-text-primary text-sm">Hỗ trợ kỹ thuật</p>
                  <p className="text-xs text-text-accent mt-1">Tư vấn lắp đặt và tương thích 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 border border-border/50 rounded-lg bg-surface">
                <CheckCircle className="text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-text-primary text-sm">Kiểm tra khi nhận</p>
                  <p className="text-xs text-text-accent mt-1">Nhận hàng kiểm tra đúng mẫu mới thanh toán</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section for details */}
        <div className="mb-16 border-t border-border/50 pt-12">
          <div className="flex flex-wrap gap-2 border-b border-border/50 mb-8">
            <button 
              className={`px-6 py-3 font-bold text-sm md:text-base border-b-2 transition-colors ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-text-accent hover:text-primary'}`}
              onClick={() => setActiveTab('specs')}
            >
              Thông số kỹ thuật
            </button>
            <button 
              className={`px-6 py-3 font-bold text-sm md:text-base border-b-2 transition-colors ${activeTab === 'desc' ? 'border-primary text-primary' : 'border-transparent text-text-accent hover:text-primary'}`}
              onClick={() => setActiveTab('desc')}
            >
              Mô tả chi tiết
            </button>
            <button 
              className={`px-6 py-3 font-bold text-sm md:text-base border-b-2 transition-colors ${activeTab === 'guide' ? 'border-primary text-primary' : 'border-transparent text-text-accent hover:text-primary'}`}
              onClick={() => setActiveTab('guide')}
            >
              Hướng dẫn đo
            </button>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'specs' && (
              <div>
                {product.specifications ? (
                  <div className="border border-border/50 rounded-lg overflow-hidden">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={key} className={`flex flex-col sm:flex-row py-3 px-4 ${index % 2 === 0 ? 'bg-surface-muted/30' : 'bg-surface'}`}>
                        <span className="w-full sm:w-1/3 font-semibold text-text-secondary mb-1 sm:mb-0">{key}</span>
                        <span className="w-full sm:w-2/3 text-text-primary">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Text className="text-text-accent italic">Chưa có thông số kỹ thuật chi tiết.</Text>
                )}
              </div>
            )}

            {activeTab === 'desc' && (
              <div 
                className="prose prose-sm md:prose-base max-w-none text-text-secondary"
                dangerouslySetInnerHTML={{ __html: product.description || '<p>Đang cập nhật mô tả.</p>' }}
              />
            )}

            {activeTab === 'guide' && (
              <div className="bg-surface-muted/30 p-6 rounded-lg flex flex-col sm:flex-row gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
                  <Settings className="text-primary" size={32} />
                </div>
                <div>
                  <Heading level={3} variant="h4" className="mb-2 text-primary">Làm sao để biết linh kiện vừa với máy?</Heading>
                  <Text className="text-text-secondary mb-4">
                    Sử dụng thước dây hoặc thước thẳng đo kích thước của linh kiện cũ. Ví dụ với đĩa lò vi sóng, đo qua tâm đĩa từ mép bên này sang mép bên kia. Nếu đĩa cũ bị vỡ, bạn có thể đo khoảng cách từ tâm trục quay ra đến vạch giới hạn bánh xe lăn, sau đó nhân đôi.
                  </Text>
                  <Button variant="outline" href={siteConfig.contact.zaloUrl} target="_blank">Nhờ kỹ thuật viên hỗ trợ</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-border/50">
            <Heading level={2} variant="h2" className="mb-8 text-primary">Sản phẩm liên quan</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 px-4 py-3 pb-safe flex gap-3">
        <button 
          className="flex flex-col items-center justify-center w-12 text-text-accent hover:text-primary"
          aria-label="Gọi điện"
          onClick={() => window.open(siteConfig.contact.callUrl)}
        >
          <Phone size={24} className="mb-1" />
          <span className="text-[10px] font-bold">Gọi ngay</span>
        </button>
        <Button 
          className="flex-1 font-bold shadow-sm" 
          disabled={isOutOfStock}
          onClick={() => setIsBuyModalOpen(true)}
        >
          MUA NGAY
        </Button>
      </div>

      <BuyNowModal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)} 
        product={product} 
        initialQuantity={quantity}
      />
    </div>
  );
}
