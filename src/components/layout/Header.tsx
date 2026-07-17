import { Menu, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="bg-surface-lowest fixed top-0 w-full z-50 shadow-sm border-b border-border/30">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
        <a className="flex items-center gap-3" href="/">
          <div className="h-10 w-10 bg-white rounded-md border border-border flex items-center justify-center p-1">
            <span className="text-primary font-bold text-xl leading-none">GĐ</span>
          </div>
          <span className="text-2xl font-extrabold text-primary hidden sm:block tracking-tight">Điện lạnh Gia Định</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-secondary font-bold border-b-2 border-secondary pb-1 text-sm tracking-wide" href="/">Trang chủ</a>
          <a className="text-muted hover:text-secondary transition-colors text-sm font-semibold tracking-wide" href="/san-pham">Sản phẩm</a>
          <a className="text-muted hover:text-secondary transition-colors text-sm font-semibold tracking-wide" href="/dich-vu">Dịch vụ</a>
          <a className="text-muted hover:text-secondary transition-colors text-sm font-semibold tracking-wide" href="/bai-viet">Bài viết</a>
          <a className="text-muted hover:text-secondary transition-colors text-sm font-semibold tracking-wide" href="/gioi-thieu">Giới thiệu</a>
          <a className="text-muted hover:text-secondary transition-colors text-sm font-semibold tracking-wide" href="/lien-he">Liên hệ</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden lg:flex" icon={<Phone size={18} />}>
            Gọi ngay
          </Button>
          <Button variant="secondary" className="shadow-sm" icon={<MessageCircle size={18} />}>
            Chat Zalo
          </Button>
          <button className="md:hidden text-surface-foreground p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
