import { postsData } from '../../data/posts';
import { BlogCard } from './BlogCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function LatestPosts() {
  return (
    <section className="py-section-md bg-surface">
      <Container>
        <div className="flex justify-between items-end mb-10">
          <SectionHeading title="Kiến thức & Kinh nghiệm" subtitle="Những bài viết mới nhất từ chuyên gia điện lạnh" className="!mb-0" />
          <a href="#" className="text-primary font-semibold hover:text-accent transition-colors hidden sm:block mb-2">
            Xem tất cả bài viết &rarr;
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
