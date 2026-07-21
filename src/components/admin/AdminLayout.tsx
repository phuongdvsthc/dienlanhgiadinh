import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Package, FileText, ShoppingCart, MessageSquare, LogOut, Home, Menu, X } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/dang-nhap');
  };

  const navItems = [
    { name: 'Tổng quan', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Danh mục', path: '/admin/danh-muc', icon: <LayoutDashboard size={20} /> },
    { name: 'Sản phẩm', path: '/admin/san-pham', icon: <Package size={20} /> },
    { name: 'Bài viết', path: '/admin/posts', icon: <FileText size={20} /> },
    { name: 'Đơn hàng', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Liên hệ', path: '/admin/contacts', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-surface border-b border-border/50 p-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-bold text-primary">Gia Định Admin</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-text-primary p-2 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        fixed md:sticky top-[73px] md:top-0 left-0 z-10
        w-full md:w-64 h-[calc(100vh-73px)] md:h-screen
        bg-surface-muted/30 border-r border-border/50 flex flex-col
        transition-transform duration-300 ease-in-out
      `}>
        <div className="hidden md:block p-6 border-b border-border/50">
          <h1 className="text-xl font-bold text-primary">Gia Định Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-text-primary hover:bg-surface-muted'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-md text-text-primary hover:bg-surface-muted transition-colors"
          >
            <Home size={20} />
            <span className="font-medium">Về Website</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-error hover:bg-error/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
