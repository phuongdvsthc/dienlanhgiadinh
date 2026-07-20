import React, { useState, useMemo } from 'react';
import { ChevronRight, Search, ChevronLeft, Calendar, ArrowRight, MessageCircle, Phone, HeadphonesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BlogCard } from '../components/home/BlogCard';
import { ProductCard } from '../components/ui/ProductCard';
import { postsData, blogCategories } from '../data/posts';
import { productsData } from '../data/products';
import { siteConfig } from '../data/site';

export function BlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredPosts = useMemo(() => {
    return postsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const featuredPost = postsData.find(post => post.featured);
  
  // Popular posts based on views
  const popularPosts = [...postsData].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  
  // Related products (mock)
  const relatedProducts = productsData.slice(0, 4);

  return (
    <div className="pt-24 pb-16 relative">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-sm font-semibold text-text-accent mb-8 flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Trang chủ</button>
          <ChevronRight size={16} />
          <span className="text-text-primary">Bài viết</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-12 text-center md:text-left max-w-3xl">
          <Heading level={1} variant="display" className="text-primary mb-4 text-3xl md:text-5xl">
            Hướng dẫn và kinh nghiệm điện lạnh
          </Heading>
          <Text variant="large" className="text-text-secondary mb-8">
            Thông tin giúp bạn kiểm tra thiết bị, tìm đúng linh kiện và xử lý các lỗi thường gặp.
          </Text>
          
          <div className="relative max-w-2xl">
            <Input 
              iconLeft={<Search size={20} />}
              placeholder="Tìm hướng dẫn, lỗi thiết bị hoặc sản phẩm..."
              className="h-14 bg-surface shadow-sm text-base"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12 flex flex-wrap gap-3">
          <button 
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors shadow-sm ${!selectedCategory ? 'bg-accent text-accent-foreground' : 'bg-surface-muted border border-border/50 text-text-primary hover:bg-surface-muted/80'}`}
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(1);
            }}
          >
            Tất cả
          </button>
          {blogCategories.map(cat => (
            <button 
              key={cat}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors ${selectedCategory === cat ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-surface-muted border border-border/50 text-text-primary hover:bg-surface-muted/80'}`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </section>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          {/* Main Content Area */}
          <div className="lg:w-2/3 flex flex-col gap-12">
            
            {/* Featured Article (only show on page 1 and if no search/filter) */}
            {currentPage === 1 && !searchTerm && !selectedCategory && featuredPost && (
              <article className="bg-background rounded-xl overflow-hidden shadow-sm border border-border/30 hover:shadow-card transition-shadow flex flex-col md:flex-row group">
                <div className="md:w-1/2 h-64 md:h-auto relative bg-surface-muted flex items-center justify-center p-6">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    Nổi bật
                  </div>
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm font-semibold text-text-accent">
                    <span className="flex items-center gap-1"><Calendar size={16} /> {featuredPost.date}</span>
                    <span className="text-primary">{featuredPost.category}</span>
                  </div>
                  <Heading level={2} variant="h3" className="text-primary mb-4 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </Heading>
                  <Text className="text-text-secondary mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </Text>
                  <a href="#" className="inline-flex items-center text-accent font-bold hover:underline w-max">
                    Đọc bài viết <ArrowRight size={18} className="ml-1" />
                  </a>
                </div>
              </article>
            )}

            {/* Article Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-surface-muted/30 rounded-xl border border-border/50">
                <Search size={48} className="mx-auto text-text-accent mb-4 opacity-50" />
                <Heading level={3} variant="h4" className="mb-2">Không tìm thấy bài viết nào</Heading>
                <Text className="text-text-secondary">Vui lòng thử lại với từ khóa hoặc danh mục khác.</Text>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button 
                  className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-secondary hover:bg-surface-muted transition-colors disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    className={`w-10 h-10 rounded-md flex items-center justify-center font-bold transition-colors ${currentPage === i + 1 ? 'bg-primary text-white border border-primary' : 'border border-border/50 text-text-primary hover:bg-surface-muted'}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  className="w-10 h-10 rounded-md border border-border/50 flex items-center justify-center text-text-secondary hover:bg-surface-muted transition-colors disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 flex flex-col gap-8">
            
            {/* Widget: Popular Posts */}
            <div className="bg-background rounded-xl shadow-sm p-6 border border-border/30">
              <Heading level={3} variant="h4" className="text-primary mb-6 border-b border-border/50 pb-4">Bài viết xem nhiều</Heading>
              <ul className="space-y-4">
                {popularPosts.map((post, index) => (
                  <li key={post.id}>
                    <a href="#" className="group flex gap-4 items-start">
                      <span className="text-3xl font-extrabold text-border group-hover:text-accent/50 transition-colors leading-none">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2 text-sm leading-snug">
                          {post.title}
                        </h4>
                        <span className="text-xs font-semibold text-text-accent mt-1 block">
                          {post.views?.toLocaleString('vi-VN')} lượt xem
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget: Categories */}
            <div className="bg-background rounded-xl shadow-sm p-6 border border-border/30">
              <Heading level={3} variant="h4" className="text-primary mb-4 border-b border-border/50 pb-4">Danh mục</Heading>
              <ul className="space-y-2">
                {blogCategories.slice(0, 5).map(cat => {
                  const count = postsData.filter(p => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button 
                        className="w-full flex justify-between items-center py-2 text-sm font-semibold text-text-primary hover:text-accent transition-colors"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCurrentPage(1);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <span>{cat}</span>
                        <span className="bg-surface-muted px-2 py-0.5 rounded text-xs text-text-secondary">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Widget: Chat Zalo */}
            <div className="bg-primary/5 rounded-xl p-6 text-center border border-primary/10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <HeadphonesIcon size={32} />
              </div>
              <Heading level={3} variant="h4" className="text-primary mb-2">Cần hỗ trợ kỹ thuật?</Heading>
              <Text variant="small" className="text-text-secondary mb-6">
                Gửi hình ảnh linh kiện hỏng qua Zalo để chúng tôi kiểm tra giúp bạn.
              </Text>
              <Button 
                fullWidth 
                className="bg-[#24ad45] text-white hover:bg-[#1f963a] font-bold"
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Mở Zalo Chat
              </Button>
            </div>
          </aside>
        </div>
      </Container>

      {/* Related Products */}
      <section className="bg-surface-muted/30 py-16 border-t border-border/50">
        <Container>
          <Heading level={2} variant="h2" className="text-primary mb-8 text-center md:text-left">Sản phẩm được tìm nhiều</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Footer */}
      <section className="bg-primary text-white py-16 text-center">
        <Container className="max-w-3xl">
          <Heading level={2} variant="display" className="mb-4 text-3xl md:text-4xl">Không tìm thấy câu trả lời bạn cần?</Heading>
          <Text variant="large" className="text-primary-light/80 mb-8">
            Hãy gửi hình ảnh hoặc thông tin thiết bị để được hỗ trợ kiểm tra.
          </Text>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-[#0068ff] hover:bg-[#0052cc] border-transparent font-bold"
              iconLeft={<MessageCircle size={20} />}
              href={siteConfig.contact.zaloUrl}
              target="_blank"
            >
              Chat Zalo
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto font-bold"
              iconLeft={<Phone size={20} />}
              href={siteConfig.contact.callUrl}
            >
              Gọi tư vấn
            </Button>
          </div>
        </Container>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-background border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 px-4 py-3 pb-safe flex flex-col gap-3">
        <Button 
          fullWidth 
          className="bg-[#0068FF] hover:bg-[#0052cc] font-bold shadow-sm h-12"
          iconLeft={<MessageCircle size={20} />}
          href={siteConfig.contact.zaloUrl}
          target="_blank"
        >
          Chat Zalo Nhận Tư Vấn
        </Button>
        <Button 
          fullWidth 
          className="font-bold shadow-sm h-12"
          iconLeft={<Phone size={20} />}
          href={siteConfig.contact.callUrl}
        >
          Gọi Ngay: 1900 6868
        </Button>
      </div>
    </div>
  );
}
