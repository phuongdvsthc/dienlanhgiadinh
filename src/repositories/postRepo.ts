import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp,
  documentId
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PostCategory, Post } from '../types/post';

// Helper to convert Firestore document to Typed Object with ID and formatted dates
function mapDocToType<T>(docSnap: any): T {
  const data = docSnap.data();
  
  const mapped: any = {
    ...data,
    id: docSnap.id,
  };

  // Convert Firestore Timestamps to ISO strings for UI
  if (data.createdAt && typeof data.createdAt.toDate === 'function') {
    mapped.createdAt = data.createdAt.toDate().toISOString();
  } else if (data.createdAt && data.createdAt._methodName) {
    mapped.createdAt = new Date().toISOString();
  }

  if (data.updatedAt && typeof data.updatedAt.toDate === 'function') {
    mapped.updatedAt = data.updatedAt.toDate().toISOString();
  } else if (data.updatedAt && data.updatedAt._methodName) {
    mapped.updatedAt = new Date().toISOString();
  }

  if (data.publishedAt && typeof data.publishedAt.toDate === 'function') {
    mapped.publishedAt = data.publishedAt.toDate().toISOString();
  } else if (data.publishedAt && data.publishedAt._methodName) {
    mapped.publishedAt = new Date().toISOString();
  }

  return mapped as T;
}

export const getPublishedPostCategories = async (): Promise<PostCategory[]> => {
  try {
    const q = query(
      collection(db, 'postCategories'),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => mapDocToType<PostCategory>(doc));
  } catch (error) {
    console.warn('Error fetching published post categories:', error);
    return [];
  }
};

export const getPostCategoryBySlug = async (slug: string): Promise<PostCategory | null> => {
  if (!slug) return null;
  try {
    const docRef = doc(db, 'postCategories', slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().published === true) {
      return mapDocToType<PostCategory>(docSnap);
    }
    return null;
  } catch (error) {
    console.warn(`Error fetching post category with slug ${slug}:`, error);
    return null;
  }
};

export const getPublishedPosts = async (): Promise<Post[]> => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => mapDocToType<Post>(doc));
    
    return posts.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt || a.date || '';
      const dateB = b.publishedAt || b.createdAt || b.date || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  } catch (error) {
    console.warn('Error fetching published posts:', error);
    return [];
  }
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      where('featured', '==', true)
    );
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => mapDocToType<Post>(doc));
    
    return posts.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt || a.date || '';
      const dateB = b.publishedAt || b.createdAt || b.date || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  } catch (error) {
    console.warn('Error fetching featured posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  if (!slug) return null;
  try {
    const docRef = doc(db, 'posts', slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().published === true) {
      return mapDocToType<Post>(docSnap);
    }
    return null;
  } catch (error) {
    console.warn(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
};

export const getPostsByCategorySlug = async (postCategorySlug: string): Promise<Post[]> => {
  if (!postCategorySlug) return [];
  try {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      where('postCategorySlug', '==', postCategorySlug)
    );
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => mapDocToType<Post>(doc));
    
    return posts.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt || a.date || '';
      const dateB = b.publishedAt || b.createdAt || b.date || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  } catch (error) {
    console.warn(`Error fetching posts for category ${postCategorySlug}:`, error);
    return [];
  }
};

export const getRelatedPosts = async (post: Post, limitCount: number = 3): Promise<Post[]> => {
  if (!post) return [];
  
  try {
    // 1. Try to fetch by relatedPostSlugs if they exist
    if (post.relatedPostSlugs && post.relatedPostSlugs.length > 0) {
      const slugsToFetch = post.relatedPostSlugs.slice(0, limitCount);
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        where(documentId(), 'in', slugsToFetch)
      );
      const snapshot = await getDocs(q);
      const related = snapshot.docs.map(doc => mapDocToType<Post>(doc));
      return related.filter(p => p.id !== post.id).slice(0, limitCount);
    }
    
    // 2. Fallback to same category
    if (post.postCategorySlug) {
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        where('postCategorySlug', '==', post.postCategorySlug)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map(doc => mapDocToType<Post>(doc));
      
      posts.sort((a, b) => {
        const dateA = a.publishedAt || a.createdAt || a.date || '';
        const dateB = b.publishedAt || b.createdAt || b.date || '';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
      
      return posts.filter(p => p.id !== post.id).slice(0, limitCount);
    }
    
    return [];
  } catch (error) {
    console.warn(`Error fetching related posts for post ${post.id}:`, error);
    return [];
  }
};
