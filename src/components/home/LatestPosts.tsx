import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postsData as mockPostsData } from '../../data/posts';
import { BlogCard } from './BlogCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { getPublishedPosts, getFeaturedPosts } from '../../repositories/postRepo';

export function LatestPosts() {
  const [posts, setPosts] = useState<any[]>(mockPostsData.filter(p => p.featured).slice(0, 3));
  
  useEffect(() => {
    // If no featured mock posts, use latest mock posts
    if (posts.length === 0) {
      setPosts(mockPostsData.slice(0, 3));
    }
  }, []);
  
  useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      try {
        let fsPosts = await getFeaturedPosts();
        
        if (fsPosts.length === 0) {
          fsPosts = await getPublishedPosts();
        }
        
        if (isMounted && fsPosts.length > 0) {
          setPosts(fsPosts.slice(0, 3));
        }
      } catch (error) {
        console.warn("Lỗi khi tải bài viết mới nhất:", error);
      }
    }
    loadPosts();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-section-md bg-surface">
      <Container>
        <div className="flex justify-between items-end mb-10">
          <SectionHeading title="Kiến thức & Kinh nghiệm" subtitle="Những bài viết mới nhất từ chuyên gia điện lạnh" className="!mb-0" />
          <Link to="/bai-viet" className="text-primary font-semibold hover:text-accent transition-colors hidden sm:block mb-2">
            Xem tất cả bài viết &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
