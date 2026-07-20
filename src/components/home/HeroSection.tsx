import { Headset } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { siteConfig } from '../../data/site';

export function HeroSection() {
  return (
    <section className="py-section-md">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Heading level={1} variant="display" className="text-primary text-balance">
            Linh kiện điện lạnh phù hợp, dễ tìm, tư vấn nhanh
          </Heading>
          <Text variant="large" className="text-text-accent max-w-lg">
            Chuyên cung cấp đĩa xoay lò vi sóng, linh kiện điện lạnh, thiết bị và phụ kiện thay thế. Hỗ trợ kiểm tra kích thước, model và tư vấn sản phẩm phù hợp.
          </Text>
          <div className="flex flex-wrap gap-4 mt-2">
            <Button size="lg" className="shadow-sm hover:shadow-card transition-shadow" href="/san-pham">
              Xem sản phẩm
            </Button>
            <Button variant="secondary" size="lg" className="shadow-sm hover:shadow-card transition-shadow" iconLeft={<Headset size={20} />} href={siteConfig.contact.zaloUrl} target="_blank" rel="noopener noreferrer">
              Chat Zalo tư vấn
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-lg overflow-hidden shadow-modal relative aspect-[4/3] lg:aspect-auto h-full min-h-[400px] bg-surface-muted">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop" 
            alt="Linh kiện điện lạnh" 
            className="w-full h-full object-cover absolute inset-0 mix-blend-multiply opacity-90"
          />
        </div>
        </div>
      </Container>
    </section>
  );
}
