import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AdminUser, AdminAccessStatus, AdminAccessResult } from '../types/admin';

/**
 * Lấy thông tin admin bằng UID
 */
export async function getAdminByUid(uid: string): Promise<AdminUser | null> {
  if (!uid || uid.trim() === '') {
    return null;
  }

  try {
    const adminRef = doc(db, 'admins', uid);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      return null;
    }

    const data = adminSnap.data();
    
    // Xử lý an toàn Timestamp sang Date
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date();

    return {
      uid: adminSnap.id,
      email: data.email || '',
      displayName: data.displayName || '',
      role: data.role as 'admin',
      // Firebase rules dùng isActive hoặc active, xử lý tương thích 2 trường hợp
      active: data.active === true || data.isActive === true,
      createdAt,
      updatedAt,
    };
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      // User is likely not an admin and doesn't have read access due to old rules
      return null;
    }
    console.error('Lỗi khi lấy thông tin admin:', error);
    return null;
  }
}

/**
 * Kiểm tra quyền truy cập của admin
 */
export async function validateAdminAccess(uid: string): Promise<AdminAccessResult> {
  if (!uid || uid.trim() === '') {
    return { status: 'error' };
  }

  try {
    const admin = await getAdminByUid(uid);

    if (!admin) {
      return { status: 'not-found' };
    }

    if (!admin.active) {
      return { status: 'inactive', admin };
    }

    // Role hiện tại chỉ hỗ trợ admin (thêm editor/super_admin nếu cần trong tương lai)
    if (admin.role !== 'admin' && admin.role !== 'editor' && admin.role !== 'super_admin') {
      return { status: 'invalid-role', admin };
    }

    return { status: 'authorized', admin };
  } catch (error) {
    console.error('Lỗi khi kiểm tra quyền admin:', error);
    return { status: 'error' };
  }
}
