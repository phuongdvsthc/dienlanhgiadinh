import { Calendar, ArrowRight } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <a href="#" className="group flex flex-col bg-background rounded-lg overflow-hidden shadow-sm border border-border/30 hover:shadow-card transition-all">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-text-accent mb-3">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>
        <Heading level={3} variant="h4" className="text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </Heading>
        <Text variant="small" className="text-text-accent line-clamp-3 mb-5 flex-grow">
          {post.excerpt}
        </Text>
        <div className="flex items-center text-primary font-semibold text-sm mt-auto group-hover:gap-2 gap-1 transition-all">
          Đọc tiếp <ArrowRight size={16} />
        </div>
      </div>
    </a>
  );
}
