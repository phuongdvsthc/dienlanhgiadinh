import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, adminUser, isAuthLoading, signOut, adminAccessStatus } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/dang-nhap" state={{ from: location }} replace />;
  }

  if (!isAdmin || !adminUser || !adminUser.active || adminUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4">
        <div className="bg-surface-muted/30 p-8 rounded-xl border border-border/50 text-center max-w-md w-full shadow-sm">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Truy cập bị từ chối</h2>
          <div className="text-text-accent mb-6">
            Bạn không có quyền truy cập khu vực quản trị.
            {adminAccessStatus === 'inactive' && <span className="text-sm text-error mt-2 block font-medium">Tài khoản của bạn đã bị vô hiệu hóa.</span>}
            {adminAccessStatus === 'invalid-role' && <span className="text-sm text-error mt-2 block font-medium">Vai trò của bạn không hợp lệ.</span>}
            {adminAccessStatus === 'not-found' && <span className="text-sm text-error mt-2 block font-medium">Không tìm thấy hồ sơ quản trị.</span>}
          </div>
          <div className="space-y-3">
            <Button onClick={() => signOut()} variant="primary" fullWidth>
              Đăng xuất
            </Button>
            <Button href="/" variant="outline" fullWidth>
              Trở về website
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
