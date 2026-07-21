import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  getCountFromServer
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Category, CategoryInput } from '../types/category';

export async function getAllCategoriesForAdmin(): Promise<Category[]> {
  try {
    const q = query(
      collection(db, 'categories'),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || data.title || '',
        slug: docSnap.id, // Dùng ID làm slug theo thiết kế
        description: data.description || '',
        image: data.image,
        order: data.order || 0,
        published: data.published === true || data.status === 'published',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        title: data.title,
        iconName: data.iconName,
        colSpan: data.colSpan,
        rowSpan: data.rowSpan,
        isLarge: data.isLarge,
        isHorizontal: data.isHorizontal,
      } as Category;
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục:', error);
    throw new Error('Lỗi mạng hoặc không có quyền truy cập');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!slug) return null;
  try {
    const docRef = doc(db, 'categories', slug);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name || data.title || '',
      slug: snapshot.id,
      description: data.description || '',
      image: data.image,
      order: data.order || 0,
      published: data.published === true || data.status === 'published',
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
      title: data.title,
      iconName: data.iconName,
      colSpan: data.colSpan,
      rowSpan: data.rowSpan,
      isLarge: data.isLarge,
      isHorizontal: data.isHorizontal,
    } as Category;
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    throw new Error('Lỗi mạng hoặc không có quyền truy cập');
  }
}

export async function isCategorySlugAvailable(slug: string): Promise<boolean> {
  if (!slug) return false;
  try {
    const docRef = doc(db, 'categories', slug);
    const snapshot = await getDoc(docRef);
    return !snapshot.exists();
  } catch (error) {
    console.error('Lỗi khi kiểm tra slug:', error);
    throw new Error('Lỗi mạng hoặc không có quyền truy cập');
  }
}

export async function countProductsByCategorySlug(slug: string): Promise<number> {
  if (!slug) return 0;
  
  try {
    const q = query(
      collection(db, 'products'),
      where('categoryId', '==', slug)
    );
    // Use getCountFromServer where available, it's efficient
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error('Lỗi khi đếm sản phẩm trong danh mục:', error);
    throw new Error('Lỗi mạng hoặc không có quyền truy cập');
  }
}

export async function createCategory(input: CategoryInput): Promise<void> {
  if (!input.name) throw new Error('Tên danh mục là bắt buộc');
  if (!input.slug) throw new Error('Đường dẫn (slug) là bắt buộc');
  if (!/^[a-z0-9-]+$/.test(input.slug)) throw new Error('Slug chỉ gồm chữ thường không dấu, số và gạch ngang');
  
  const isAvailable = await isCategorySlugAvailable(input.slug);
  if (!isAvailable) throw new Error('Đường dẫn (slug) đã tồn tại');

  try {
    const docRef = doc(db, 'categories', input.slug);
    
    const dataToSave: any = {
      name: input.name,
      slug: input.slug,
      description: input.description || '',
      order: input.order !== undefined ? input.order : 0,
      published: input.published === true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    // Maintain backward compatibility with title field
    dataToSave.title = input.title !== undefined ? input.title : input.name;
    
    if (input.image && input.image.url) {
       dataToSave.image = {
         url: input.image.url,
         alt: input.image.alt || ''
       };
    }
    
    if (input.iconName !== undefined) dataToSave.iconName = input.iconName;
    if (input.colSpan !== undefined) dataToSave.colSpan = input.colSpan;
    if (input.rowSpan !== undefined) dataToSave.rowSpan = input.rowSpan;
    if (input.isLarge !== undefined) dataToSave.isLarge = input.isLarge;
    if (input.isHorizontal !== undefined) dataToSave.isHorizontal = input.isHorizontal;

    // Filter out any accidentally injected undefined
    const cleanData = Object.fromEntries(Object.entries(dataToSave).filter(([_, v]) => v !== undefined));

    await setDoc(docRef, cleanData);
  } catch (error) {
    console.error('Lỗi khi tạo danh mục:', error);
    throw new Error('Đã có lỗi xảy ra khi tạo danh mục');
  }
}

export async function updateCategory(slug: string, input: Partial<CategoryInput>): Promise<void> {
  if (!slug) throw new Error('Không tìm thấy danh mục để cập nhật');
  
  try {
    const docRef = doc(db, 'categories', slug);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      throw new Error('Danh mục không tồn tại');
    }

    const dataToUpdate: any = {
      updatedAt: serverTimestamp(),
    };

    if (input.name !== undefined) dataToUpdate.name = input.name;
    if (input.description !== undefined) dataToUpdate.description = input.description;
    if (input.order !== undefined) dataToUpdate.order = input.order;
    if (input.published !== undefined) dataToUpdate.published = input.published;
    if (input.title !== undefined) dataToUpdate.title = input.title;
    if (input.iconName !== undefined) dataToUpdate.iconName = input.iconName;
    if (input.colSpan !== undefined) dataToUpdate.colSpan = input.colSpan;
    if (input.rowSpan !== undefined) dataToUpdate.rowSpan = input.rowSpan;
    if (input.isLarge !== undefined) dataToUpdate.isLarge = input.isLarge;
    if (input.isHorizontal !== undefined) dataToUpdate.isHorizontal = input.isHorizontal;
    
    if (input.image && input.image.url) {
       dataToUpdate.image = {
         url: input.image.url,
         alt: input.image.alt || ''
       };
    }

    // Filter out any accidentally injected undefined
    const cleanData = Object.fromEntries(Object.entries(dataToUpdate).filter(([_, v]) => v !== undefined));

    await updateDoc(docRef, cleanData);
  } catch (error: any) {
    console.error('Lỗi khi cập nhật danh mục:', error);
    if (error.message === 'Danh mục không tồn tại') {
      throw error;
    }
    throw new Error('Đã có lỗi xảy ra khi cập nhật danh mục');
  }
}

export async function deleteCategory(slug: string): Promise<void> {
  if (!slug) throw new Error('Không tìm thấy danh mục để xóa');

  try {
    const docRef = doc(db, 'categories', slug);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error('Danh mục không tồn tại');
    }

    const productCount = await countProductsByCategorySlug(slug);
    if (productCount > 0) {
      throw new Error(`Không thể xóa danh mục đang có ${productCount} sản phẩm.`);
    }

    await deleteDoc(docRef);
  } catch (error: any) {
    console.error('Lỗi khi xóa danh mục:', error);
    if (error.message.includes('Không thể xóa') || error.message === 'Danh mục không tồn tại') {
      throw error;
    }
    throw new Error('Đã có lỗi xảy ra khi xóa danh mục');
  }
}
