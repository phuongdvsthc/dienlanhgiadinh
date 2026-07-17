import { Headset } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-balance leading-tight tracking-tight">
            Linh kiện điện lạnh phù hợp, dễ tìm, tư vấn nhanh
          </h1>
          <p className="text-lg text-muted max-w-lg leading-relaxed">
            Chuyên cung cấp đĩa xoay lò vi sóng, linh kiện điện lạnh, thiết bị và phụ kiện thay thế. Hỗ trợ kiểm tra kích thước, model và tư vấn sản phẩm phù hợp.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Button size="lg" className="shadow-sm hover:shadow-md transition-shadow">
              Xem sản phẩm
            </Button>
            <Button variant="secondary" size="lg" className="shadow-sm hover:shadow-md transition-shadow" icon={<Headset size={20} />}>
              Chat Zalo tư vấn
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-xl overflow-hidden shadow-lg relative aspect-[4/3] lg:aspect-auto h-full min-h-[400px] bg-surface-variant">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop" 
            alt="Linh kiện điện lạnh" 
            className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
