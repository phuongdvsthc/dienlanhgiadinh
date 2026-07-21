export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AdminAccessStatus = 
  | 'authorized'
  | 'not-found'
  | 'inactive'
  | 'invalid-role'
  | 'error';

export interface AdminAccessResult {
  status: AdminAccessStatus;
  admin?: AdminUser;
}
