export interface CategoryImage {
  url: string;
  alt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: CategoryImage;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Tương thích website hiện tại
  title?: string;
  iconName?: string;
  colSpan?: string;
  rowSpan?: string;
  isLarge?: boolean;
  isHorizontal?: boolean;
}

export type CategoryInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;
