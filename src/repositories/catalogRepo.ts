import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { categoriesData } from '../data/categories';
import { productsData, detailedProductsData, DetailedProduct } from '../data/products';
import { Product } from '../components/ui/ProductCard';

export const getPublishedCategories = async () => {
  try {
    const q = query(
      collection(db, 'categories'),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs
        .map(doc => ({
          id: doc.id, // we might not need this for Categories UI but it's good
          title: doc.data().title,
          description: doc.data().description,
          iconName: doc.data().iconName,
          colSpan: doc.data().colSpan,
          rowSpan: doc.data().rowSpan,
          isLarge: doc.data().isLarge,
          isHorizontal: doc.data().isHorizontal,
          published: doc.data().published,
          order: doc.data().order,
        }))
        .filter(cat => cat.published === true)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (error) {
    console.error("Lỗi khi tải danh mục từ Firestore:", error);
  }
  
  // Fallback
  return categoriesData;
};

export const getProductBySlug = async (slug: string): Promise<DetailedProduct | null> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('slug', '==', slug),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        category: data.categoryName || data.categorySlug,
        brand: data.brand,
        productCode: data.productCode,
        size: data.size,
        price: data.price,
        oldPrice: data.oldPrice,
        stockStatus: data.stockStatus,
        badge: data.badge,
        featured: data.featured,
        shortDescription: data.shortDescription,
        image: data.image,
        imageAlt: data.imageAlt,
        gallery: data.gallery,
        rating: data.rating,
        ratingCount: data.ratingCount,
        specifications: data.specifications,
        description: data.description,
        compatibility: data.compatibility,
      } as DetailedProduct;
    }
  } catch (error) {
    console.error(`Lỗi khi tải sản phẩm (slug: ${slug}) từ Firestore:`, error);
  }
  
  // Fallback
  const fallbackProduct = detailedProductsData.find(p => p.slug === slug || p.id === slug);
  return fallbackProduct || null;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('published', '==', true),
      where('featured', '==', true)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            slug: data.slug,
            category: data.categoryName || data.categorySlug,
            brand: data.brand,
            productCode: data.productCode,
            size: data.size,
            price: data.price,
            oldPrice: data.oldPrice,
            stockStatus: data.stockStatus,
            badge: data.badge,
            featured: data.featured,
            shortDescription: data.shortDescription,
            image: data.image,
            imageAlt: data.imageAlt,
            published: data.published,
            order: data.order,
          };
        })
        .filter(prod => prod.published === true && prod.featured === true)
        .sort((a, b) => (a.order || 0) - (b.order || 0)) as Product[];
    }
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm nổi bật từ Firestore:", error);
  }
  
  // Fallback
  return productsData;
};

export const getPublishedProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            slug: data.slug,
            category: data.categoryName || data.categorySlug,
            brand: data.brand,
            productCode: data.productCode,
            size: data.size,
            price: data.price,
            oldPrice: data.oldPrice,
            stockStatus: data.stockStatus,
            badge: data.badge,
            featured: data.featured,
            shortDescription: data.shortDescription,
            image: data.image,
            imageAlt: data.imageAlt,
            published: data.published,
            order: data.order,
          };
        })
        .filter(prod => prod.published === true)
        .sort((a, b) => (a.order || 0) - (b.order || 0)) as Product[];
    }
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm từ Firestore:", error);
  }
  
  // Fallback
  return productsData;
};
