import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Package, FileText, ShoppingCart, MessageSquare } from 'lucide-react';

export function AdminDashboardPage() {
  const { user } = useAuth();

  const cards = [
    { title: 'Sản phẩm', icon: <Package size={24} className="text-primary" /> },
    { title: 'Bài viết', icon: <FileText size={24} className="text-primary" /> },
    { title: 'Đơn hàng', icon: <ShoppingCart size={24} className="text-primary" /> },
    { title: 'Liên hệ', icon: <MessageSquare size={24} className="text-primary" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Tổng quan quản trị</h1>
        <p className="text-text-accent mt-2">
          Xin chào, <span className="font-medium text-text-primary">{user?.email}</span>!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-surface-muted/30 border border-border/50 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-primary">{card.title}</h3>
              <p className="text-sm text-text-accent mt-1">Sẽ triển khai ở bước tiếp theo</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
