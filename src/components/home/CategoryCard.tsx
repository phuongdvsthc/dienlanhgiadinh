import React from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

interface CategoryCardProps {
  category: {
    title: string;
    description?: string;
    icon: React.ReactNode;
    colSpan?: string;
    rowSpan?: string;
    isLarge?: boolean;
    isHorizontal?: boolean;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  if (category.isLarge) {
    return (
      <Link to="/san-pham" className={`${category.colSpan} ${category.rowSpan} bg-background p-8 rounded-lg shadow-sm hover:shadow-card transition-shadow border border-border/30 flex flex-col justify-between group`}>
        <div>
          <div className="bg-primary/5 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
            {category.icon}
          </div>
          <Heading level={3} variant="h2" className="text-text-primary mb-3">{category.title}</Heading>
          <Text className="text-text-accent hidden sm:block">{category.description}</Text>
        </div>
        <div className="mt-6 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
          Xem tất cả <span aria-hidden="true">&rarr;</span>
        </div>
      </Link>
    );
  }
  
  if (category.isHorizontal) {
    return (
      <Link to="/san-pham" className={`${category.colSpan} bg-background p-6 rounded-lg shadow-sm hover:shadow-card transition-shadow border border-border/30 flex flex-col justify-center group`}>
        <div className="flex items-center gap-5">
          <div className="bg-surface-muted w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors shrink-0">
            {category.icon}
          </div>
          <div>
            <Heading level={3} variant="h4" className="text-text-primary mb-1">{category.title}</Heading>
            <Text variant="small" className="text-text-accent hidden sm:block">{category.description}</Text>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/san-pham" className="bg-background p-6 rounded-lg shadow-sm hover:shadow-card transition-shadow border border-border/30 flex flex-col gap-4 group">
      <div className="bg-surface-muted w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        {category.icon}
      </div>
      <Heading level={3} variant="h4" className="text-text-primary leading-tight">{category.title}</Heading>
    </Link>
  );
}
