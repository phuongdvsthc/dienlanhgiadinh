import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-tertiary text-tertiary-foreground">
      <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <a className="flex items-center gap-3" href="/">
            <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center p-1">
              <span className="text-primary font-bold text-xl leading-none">GĐ</span>
            </div>
            <span className="text-xl font-bold text-tertiary-foreground tracking-tight">Điện lạnh Gia Định</span>
          </a>
          <p className="text-tertiary-foreground/80 mt-2 leading-relaxed">
            Đơn vị chuyên cung cấp linh kiện điện lạnh, phụ kiện lò vi sóng và thiết bị sửa chữa uy tín.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-tertiary-foreground mb-2 uppercase tracking-wider">Danh mục</h4>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Đĩa xoay lò vi sóng</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Linh kiện lò vi sóng</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Linh kiện máy lạnh</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Dịch vụ sửa chữa</a>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-tertiary-foreground mb-2 uppercase tracking-wider">Chính sách</h4>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Chính sách bảo mật</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Điều khoản dịch vụ</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Hướng dẫn mua hàng</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Chính sách đổi trả</a>
          <a className="text-tertiary-foreground/70 hover:text-tertiary-foreground transition-colors" href="#">Chính sách vận chuyển</a>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-tertiary-foreground mb-2 uppercase tracking-wider">Liên hệ</h4>
          <p className="text-tertiary-foreground/70 flex items-center gap-2">
            <Phone size={18} /> Hotline: 090 123 4567
          </p>
          <p className="text-tertiary-foreground/70 flex items-center gap-2">
            <MessageCircle size={18} /> Zalo: 090 123 4567
          </p>
          <p className="text-tertiary-foreground/70 flex items-center gap-2">
            <Mail size={18} /> Email: lienhe@dienlanhgiadinh.com
          </p>
          <p className="text-tertiary-foreground/70 flex items-start gap-2 mt-2">
            <MapPin size={18} className="mt-1 shrink-0" />
            <span>123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</span>
          </p>
        </div>
      </div>
      <div className="border-t border-tertiary-foreground/10 py-6 text-center text-tertiary-foreground/60 text-sm">
        © 2024 Điện lạnh Gia Định. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}
