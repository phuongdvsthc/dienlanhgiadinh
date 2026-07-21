import { collection, getDocs, query, orderBy, doc, getDoc, setDoc, updateDoc, deleteDoc, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId?: string;
  categorySlug?: string;
  categoryName?: string;
  brand?: string;
  productCode?: string;
  size?: string;
  price?: number;
  oldPrice?: number;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  badge?: string;
  featured?: boolean;
  published: boolean;
  shortDescription?: string;
  image?: string;
  imageAlt?: string;
  gallery?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export async function getAllProductsForAdmin(): Promise<AdminProduct[]> {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || '',
        slug: data.slug || docSnap.id,
        category: data.categoryName || data.categorySlug || data.category || '',
        categoryId: data.categoryId,
        categorySlug: data.categorySlug,
        categoryName: data.categoryName,
        brand: data.brand,
        productCode: data.productCode,
        size: data.size,
        price: data.price,
        oldPrice: data.oldPrice,
        stockStatus: data.stockStatus || 'in_stock',
        badge: data.badge,
        featured: data.featured === true,
        published: data.published === true || data.status === 'published',
        shortDescription: data.shortDescription,
        image: data.image,
        imageAlt: data.imageAlt,
        gallery: data.gallery,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
      } as AdminProduct;
    });
  } catch (error: any) {
    console.error('Lỗi khi lấy danh sách sản phẩm (updatedAt):', error);
    
    // Fallback: nếu query bị lỗi do thiếu index (updatedAt DESC)
    try {
      const qFallback = query(collection(db, 'products'), orderBy('name', 'asc'));
      const snapshotFallback = await getDocs(qFallback);
      
      return snapshotFallback.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || '',
            slug: data.slug || docSnap.id,
            category: data.categoryName || data.categorySlug || data.category || '',
            categoryId: data.categoryId,
            categorySlug: data.categorySlug,
            categoryName: data.categoryName,
            brand: data.brand,
            productCode: data.productCode,
            size: data.size,
            price: data.price,
            oldPrice: data.oldPrice,
            stockStatus: data.stockStatus || 'in_stock',
            badge: data.badge,
            featured: data.featured === true,
            published: data.published === true || data.status === 'published',
            shortDescription: data.shortDescription,
            image: data.image,
            imageAlt: data.imageAlt,
            gallery: data.gallery,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
          } as AdminProduct;
      });
    } catch (fallbackError) {
      console.error('Lỗi fallback query:', fallbackError);
      
      // Fallback không dùng orderBy
      try {
        const qNoOrder = query(collection(db, 'products'));
        const snapshotNoOrder = await getDocs(qNoOrder);
        
        return snapshotNoOrder.docs.map(docSnap => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              name: data.name || '',
              slug: data.slug || docSnap.id,
              category: data.categoryName || data.categorySlug || data.category || '',
              categoryId: data.categoryId,
              categorySlug: data.categorySlug,
              categoryName: data.categoryName,
              brand: data.brand,
              productCode: data.productCode,
              size: data.size,
              price: data.price,
              oldPrice: data.oldPrice,
              stockStatus: data.stockStatus || 'in_stock',
              badge: data.badge,
              featured: data.featured === true,
              published: data.published === true || data.status === 'published',
              shortDescription: data.shortDescription,
              image: data.image,
              imageAlt: data.imageAlt,
              gallery: data.gallery,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
              updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
            } as AdminProduct;
        });
      } catch (finalError) {
        throw new Error('Lỗi mạng hoặc không có quyền truy cập');
      }
    }
  }
}



export async function getProductForAdminBySlug(slug: string): Promise<AdminProduct | null> {
  if (!slug) return null;
  try {
    const docRef = doc(db, 'products', slug);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name || '',
      slug: data.slug || docSnap.id,
      category: data.categoryName || data.categorySlug || data.category || '',
      categoryId: data.categoryId,
      categorySlug: data.categorySlug,
      categoryName: data.categoryName,
      brand: data.brand,
      productCode: data.productCode,
      size: data.size,
      price: data.price,
      oldPrice: data.oldPrice,
      stockStatus: data.stockStatus || 'in_stock',
      badge: data.badge,
      featured: data.featured === true,
      published: data.published === true || data.status === 'published',
      shortDescription: data.shortDescription,
      image: data.image,
      imageAlt: data.imageAlt,
      gallery: data.gallery,
      specifications: data.specifications || [],
      faq: data.faq || [],
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
    } as AdminProduct;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    throw new Error('Lỗi mạng hoặc không có quyền truy cập');
  }
}

export async function isProductSlugAvailable(slug: string): Promise<boolean> {
  if (!slug) return false;
  try {
    const docRef = doc(db, 'products', slug);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
  } catch (error) {
    console.error('Lỗi kiểm tra slug:', error);
    throw new Error('Không thể kiểm tra slug sản phẩm');
  }
}

export async function isProductCodeAvailable(productCode: string, excludeSlug?: string): Promise<boolean> {
  if (!productCode) return true;
  try {
    const q = query(
      collection(db, 'products'),
      where('productCode', '==', productCode)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return true;
    
    if (excludeSlug) {
      return snapshot.docs.every(doc => doc.id === excludeSlug);
    }
    
    return false;
  } catch (error) {
    console.error('Lỗi kiểm tra mã sản phẩm:', error);
    throw new Error('Không thể kiểm tra mã sản phẩm');
  }
}

const cleanUndefined = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => (v === undefined ? null : cleanUndefined(v)));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== undefined) {
        acc[key] = cleanUndefined(obj[key]);
      }
      return acc;
    }, {} as any);
  }
  return obj;
};

export async function createProduct(input: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  try {
    if (!input.name) throw new Error('Tên sản phẩm không được để trống');
    if (!input.slug) throw new Error('Slug sản phẩm không hợp lệ');
    if (!input.categorySlug && !input.category) throw new Error('Danh mục không được để trống');
    
    const slugAvailable = await isProductSlugAvailable(input.slug);
    if (!slugAvailable) {
      throw new Error(`Slug "${input.slug}" đã tồn tại`);
    }
    
    if (input.productCode) {
      const codeAvailable = await isProductCodeAvailable(input.productCode);
      if (!codeAvailable) {
        throw new Error(`Mã sản phẩm "${input.productCode}" đã được sử dụng`);
      }
    }
    
    const docRef = doc(db, 'products', input.slug);
    
    const dataToSave = cleanUndefined({
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    await setDoc(docRef, dataToSave);
  } catch (error: any) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    if (error.message.includes('đã tồn tại') || error.message.includes('được sử dụng') || error.message.includes('trống')) {
      throw error;
    }
    throw new Error('Lỗi mạng hoặc không có quyền tạo sản phẩm');
  }
}

export async function updateProduct(slug: string, input: Partial<Omit<AdminProduct, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>): Promise<void> {
  try {
    if (input.productCode) {
      const codeAvailable = await isProductCodeAvailable(input.productCode, slug);
      if (!codeAvailable) {
        throw new Error(`Mã sản phẩm "${input.productCode}" đã được sử dụng bởi sản phẩm khác`);
      }
    }
    
    const docRef = doc(db, 'products', slug);
    
    const dataToSave = cleanUndefined({
      ...input,
      updatedAt: serverTimestamp()
    });
    
    await updateDoc(docRef, dataToSave);
  } catch (error: any) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    if (error.message.includes('được sử dụng')) {
      throw error;
    }
    throw new Error('Lỗi mạng hoặc không có quyền cập nhật sản phẩm');
  }
}

export async function deleteProduct(slug: string): Promise<void> {
  if (!slug) throw new Error('Slug sản phẩm không hợp lệ');
  try {
    const docRef = doc(db, 'products', slug);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    throw new Error('Lỗi mạng hoặc không có quyền xóa sản phẩm');
  }
}
