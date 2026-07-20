import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { TOCItem } from '../../data/posts';

interface ArticleTableOfContentsProps {
  items: TOCItem[];
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Adjusted offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="sticky top-[104px] bg-background p-6 rounded-xl shadow-sm border border-border/30">
      <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
        <List size={20} />
        Mục lục
      </h3>
      <nav className="flex flex-col space-y-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`text-sm font-medium transition-colors border-l-2 pl-3 py-1 ${
              activeId === item.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-primary hover:border-border'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
