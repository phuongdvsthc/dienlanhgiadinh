import { Timestamp } from 'firebase/firestore';

export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface TOCItem {
  id: string;
  title: string;
}

export type ContentBlock = 
  | { type: 'html'; html: string }
  | { type: 'callout'; variant: 'warning' | 'info' | 'quick_answer'; title: string; content: string }
  | { type: 'product'; productId: string }
  | { type: 'faq'; items: { question: string; answer: string }[] };

export interface PostCategory {
  id: string; // Document ID (slug)
  slug: string;
  title: string;
  published: boolean;
  order?: number;
  createdAt?: string; // ISO string for UI
  updatedAt?: string; // ISO string for UI
}

export interface Post {
  id: string; // Document ID (slug)
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  
  // Kept from original data
  date?: string; 
  category?: string; 
  
  postCategorySlug: string;
  published: boolean;
  
  readTime?: string;
  views?: number;
  featured?: boolean;
  
  author?: Author;
  toc?: TOCItem[];
  contentBlocks?: ContentBlock[];
  
  relatedPostSlugs?: string[];
  relatedProductSlugs?: string[];
  
  publishedAt?: string; // ISO string for UI
  createdAt?: string; // ISO string for UI
  updatedAt?: string; // ISO string for UI
}
