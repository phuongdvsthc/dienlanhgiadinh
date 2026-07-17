import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export function CTASection() {
  return (
    <section className="py-20 bg-surface-lowest">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-primary rounded-2xl overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 tracking-tight">Không tìm thấy linh kiện bạn cần?</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Đừng lo, hãy gửi ảnh sản phẩm, kích thước hoặc model thiết bị qua Zalo. Đội ngũ kỹ thuật của chúng tôi sẽ tra cứu và phản hồi ngay lập tức.
              </p>
            </div>
            <div className="shrink-0">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 h-auto shadow-md" icon={<MessageCircle size={24} />}>
                Chat Zalo gửi ảnh ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
