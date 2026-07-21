import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, Share2, MessageCircle, Phone, ArrowRight, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { BlogCard } from '../components/home/BlogCard';
import { ProductCard } from '../components/ui/ProductCard';
import { ArticleCallout } from '../components/blog/ArticleCallout';
import { ArticleTableOfContents } from '../components/blog/ArticleTableOfContents';
import { postsData as mockPostsData } from '../data/posts';
import { productsData } from '../data/products';
import { siteConfig } from '../data/site';
import { getPostBySlug, getRelatedPosts } from '../repositories/postRepo';
import { Post } from '../types/post';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const [post, setPost] = useState<Post | any | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    
    async function loadPostData() {
      if (!slug) return;
      setIsLoading(true);
      
      try {
        // Try to fetch from Firestore first
        const fsPost = await getPostBySlug(slug);
        
        let currentPost: any = fsPost;
        
        // Fallback to mock data if not found in Firestore
        if (!currentPost) {
          const mockPost = mockPostsData.find(p => p.slug === slug);
          if (mockPost) {
            currentPost = mockPost;
          }
        }
        
        if (isMounted) {
          setPost(currentPost);
          
          if (currentPost) {
            // Load related articles
            let related: any[] = [];
            // Assuming getRelatedPosts works for both types if cast properly, 
            // but we might need to fallback to mock if the post is from mock
            if (fsPost) {
                related = await getRelatedPosts(fsPost as Post, 3);
            }
            
            if (related.length === 0) {
                // Fallback related logic
                const cat = (currentPost as any).postCategorySlug || currentPost.category;
                related = mockPostsData
                  .filter(p => ((p as any).postCategorySlug || p.category) === cat && p.id !== currentPost.id)
                  .slice(0, 3);
                
                if (related.length === 0) {
                   related = mockPostsData.filter(p => p.id !== currentPost.id).slice(0, 3);
                }
            }
            
            setRelatedArticles(related);
            
            // Load related products based on category or relatedProductSlugs
            let products = [];
            if (currentPost.relatedProductSlugs && currentPost.relatedProductSlugs.length > 0) {
              products = productsData.filter(p => currentPost.relatedProductSlugs.includes(p.slug));
            } else {
              const postCat = currentPost.category || currentPost.postCategorySlug;
              products = productsData.filter(p => p.category.includes(postCat) || postCat.includes(p.category)).slice(0, 3);
            }
            
            if (products.length === 0) {
              products = productsData.slice(0, 3);
            }
            setRelatedProducts(products);
          }
        }
      } catch (error) {
        console.warn("Lỗi khi tải chi tiết bài viết:", error);
        // On error, try mock data
        if (isMounted) {
            const mockPost = mockPostsData.find(p => p.slug === slug);
            if (mockPost) {
                setPost(mockPost);
                
                // Fallback related
                const cat = mockPost.category;
                let related = mockPostsData.filter(p => p.category === cat && p.id !== mockPost.id).slice(0, 3);
                if (related.length === 0) {
                   related = mockPostsData.filter(p => p.id !== mockPost.id).slice(0, 3);
                }
                setRelatedArticles(related);
                
                let products = productsData.filter(p => p.category.includes(cat) || cat.includes(p.category)).slice(0, 3);
                if (products.length === 0) {
                  products = productsData.slice(0, 3);
                }
                setRelatedProducts(products);
            }
        }
      } finally {
        if (isMounted) {
            setIsLoading(false);
        }
      }
    }
    
    loadPostData();
    
    return () => { isMounted = false; };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <Container>
          <Text className="text-text-secondary">Đang tải bài viết...</Text>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <Container>
          <HelpCircle size={64} className="mx-auto text-border mb-6" />
          <Heading level={1} variant="h2" className="text-primary mb-4">Bài viết không tồn tại</Heading>
          <Text className="text-text-secondary mb-8">Xin lỗi, chúng tôi không thể tìm thấy bài viết bạn đang yêu cầu.</Text>
          <Button onClick={() => navigate('/bai-viet')}>
            Quay lại danh sách bài viết
          </Button>
        </Container>
      </div>
    );
  }

  // Get the category string for display
  const categoryDisplay = post.category || post.postCategorySlug || '';

  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-sm font-semibold text-text-accent mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 hide-scrollbar">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Trang chủ</button>
          <ChevronRight size={16} />
          <button onClick={() => navigate('/bai-viet')} className="hover:text-primary transition-colors">Bài viết</button>
          <ChevronRight size={16} />
          <button className="hover:text-primary transition-colors">{categoryDisplay}</button>
          <ChevronRight size={16} />
          <span className="text-text-primary truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </nav>

        {/* Layout: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          
          {/* Left Sidebar: Table of Contents (Sticky) */}
          <aside className="hidden lg:block lg:col-span-3">
            {post.toc && <ArticleTableOfContents items={post.toc} />}
          </aside>

          {/* Center Main Content */}
          <article className="col-span-1 lg:col-span-6 bg-background rounded-xl shadow-sm border border-border/30 p-6 sm:p-8">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {categoryDisplay}
                </span>
                <span className="text-text-secondary text-sm flex items-center gap-1 font-semibold">
                  <Clock size={16} /> {post.readTime || '3 phút đọc'}
                </span>
              </div>
              
              <Heading level={1} variant="display" className="text-primary mb-4 text-3xl md:text-4xl leading-tight">
                {post.title}
              </Heading>
              
              <Text variant="large" className="text-text-secondary mb-6 border-l-4 border-primary pl-4">
                {post.excerpt}
              </Text>
              
              <div className="flex flex-wrap items-center justify-between border-y border-border/50 py-4 mb-8 gap-4">
                {post.author && (
                  <div className="flex items-center gap-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-10 h-10 rounded-full object-cover border border-border/50"
                    />
                    <div>
                      <div className="font-bold text-sm text-primary">{post.author.name}</div>
                      <div className="text-xs font-semibold text-text-accent">Cập nhật: {post.updatedAt || post.date}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-accent mr-2">Chia sẻ:</span>
                  <button className="w-8 h-8 rounded-full bg-surface-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-text-secondary">
                    <Share2 size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-surface-muted hover:bg-[#24ad45] hover:text-white transition-colors flex items-center justify-center text-text-secondary">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <figure className="mb-10 rounded-xl overflow-hidden relative shadow-sm border border-border/30">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-auto md:h-[400px] object-cover"
                />
              </figure>
            </header>

            {/* Content Blocks */}
            <div className="article-content font-medium">
              {post.contentBlocks?.map((block, index) => {
                if (block.type === 'html') {
                  return <div key={index} dangerouslySetInnerHTML={{ __html: block.html }} />;
                }
                
                if (block.type === 'callout') {
                  return <ArticleCallout key={index} variant={block.variant} title={block.title} content={block.content} />;
                }
                
                if (block.type === 'product') {
                  const product = productsData.find(p => p.id === block.productId);
                  if (!product) return null;
                  
                  return (
                    <div key={index} className="my-10 bg-surface-muted/50 rounded-2xl p-1 border border-border/50 shadow-sm hover:shadow-card transition-shadow">
                      <div className="bg-background rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center">
                        <div className="w-full sm:w-1/3 aspect-square rounded-lg bg-surface flex items-center justify-center p-4 border border-border/30 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          {product.badge && (
                            <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded font-bold uppercase mb-2 inline-block">
                              Bán chạy nhất
                            </span>
                          )}
                          <Heading level={3} variant="h4" className="text-primary mt-0 mb-2">
                            {product.name}
                          </Heading>
                          <Text variant="small" className="text-text-secondary mb-4 line-clamp-2">
                            Sản phẩm chất lượng cao, độ bền ổn định.
                          </Text>
                          <div className="text-2xl font-bold text-accent mb-6">
                            {product.price.toLocaleString('vi-VN')}đ
                          </div>
                          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            <Button 
                              onClick={() => navigate(`/san-pham/${product.slug}`)}
                              className="font-bold shadow-sm"
                            >
                              Xem sản phẩm
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (block.type === 'faq') {
                  return (
                    <div key={index} className="mt-12 pt-8 border-t border-border/50">
                      <Heading level={2} variant="h2" id="faq" className="text-primary mb-6 flex items-center gap-2">
                        <HelpCircle className="text-accent" />
                        Câu hỏi thường gặp
                      </Heading>
                      <div className="space-y-4">
                        {block.items.map((item, i) => (
                          <div key={i} className="border border-border/50 rounded-lg overflow-hidden bg-background">
                            <button 
                              className="w-full flex justify-between items-center p-4 text-left font-bold text-lg text-primary hover:bg-surface-muted transition-colors"
                              onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                              <span>{item.question}</span>
                              <ChevronDown 
                                size={20} 
                                className={`transition-transform duration-300 shrink-0 ml-4 ${openFaq === i ? 'rotate-180 text-accent' : 'text-text-accent'}`} 
                              />
                            </button>
                            <div 
                              className={`px-4 text-text-secondary font-medium overflow-hidden transition-all duration-300 ease-in-out ${
                                openFaq === i ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="border-t border-border/30 pt-4 mt-2">
                                {item.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return null;
              })}
            </div>

            {/* Author Bio */}
            {post.author && (
              <div className="mt-12 bg-surface-muted/30 p-6 rounded-xl border border-border/50 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <Heading level={4} variant="h4" className="text-primary mb-2">{post.author.name}</Heading>
                  <Text variant="small" className="text-text-secondary mb-4">{post.author.bio}</Text>
                  <button 
                    className="text-primary font-bold hover:text-accent transition-colors text-sm flex items-center justify-center sm:justify-start gap-1 w-full sm:w-auto"
                    onClick={() => navigate('/bai-viet')}
                  >
                    Xem thêm bài viết <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </article>

          {/* Right Sidebar: Widgets */}
          <aside className="col-span-1 lg:col-span-3 flex flex-col gap-8">
            
            {/* Related Products Widget */}
            {relatedProducts.length > 0 && (
              <div className="bg-background rounded-xl shadow-sm border border-border/30 overflow-hidden">
                <div className="bg-primary/5 border-b border-border/50 p-4">
                  <Heading level={3} variant="h4" className="text-primary m-0 flex items-center gap-2 text-base">
                    <CheckCircle2 size={18} className="text-accent" />
                    Sản phẩm liên quan
                  </Heading>
                </div>
                <div className="p-4 space-y-4">
                  {relatedProducts.map(product => (
                    <Link key={product.id} to={`/san-pham/${product.slug}`} className="flex gap-4 group items-center">
                      <div className="w-16 h-16 rounded bg-surface border border-border/30 flex-shrink-0 group-hover:border-primary transition-colors p-1">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="text-accent font-bold text-sm mt-1">
                          {product.price > 0 ? `${product.price.toLocaleString('vi-VN')}đ` : 'Liên hệ'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Widget */}
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-primary/20 bg-primary/5">
              <div className="p-6 relative z-10 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto text-primary">
                  <Phone size={24} />
                </div>
                <Heading level={3} variant="h4" className="text-primary mb-2">Cần hỗ trợ tư vấn?</Heading>
                <Text variant="small" className="text-text-secondary mb-6">
                  Bạn vẫn chưa chắc chắn loại linh kiện nào vừa với thiết bị của mình? Gửi ảnh cho chúng tôi ngay.
                </Text>
                
                <Button 
                  fullWidth
                  className="bg-[#24ad45] hover:bg-[#1f963a] text-white font-bold mb-3"
                  iconLeft={<MessageCircle size={18} />}
                  href={siteConfig.contact.zaloUrl}
                  target="_blank"
                >
                  Gửi hình qua Zalo
                </Button>
                
                <Button 
                  fullWidth
                  variant="outline"
                  className="font-bold border-primary text-primary hover:bg-primary/10"
                  iconLeft={<Phone size={18} />}
                  href={siteConfig.contact.callUrl}
                >
                  {siteConfig.contact.hotline}
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Grid */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 border-t border-border/50 pt-12">
            <Heading level={2} variant="h2" className="text-primary mb-8 text-center">Bài viết liên quan</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

      </Container>

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-background border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 px-4 py-3 pb-safe flex flex-row gap-3">
        <Button 
          className="flex-1 font-bold shadow-sm h-12"
          iconLeft={<Phone size={20} />}
          href={siteConfig.contact.callUrl}
        >
          Gọi ngay
        </Button>
        <Button 
          className="flex-1 bg-[#24ad45] hover:bg-[#1f963a] text-white font-bold shadow-sm h-12"
          iconLeft={<MessageCircle size={20} />}
          href={siteConfig.contact.zaloUrl}
          target="_blank"
        >
          Chat Zalo
        </Button>
      </div>
    </div>
  );
}
