import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { siteConfig } from '../../data/site';

export function FinalCTA() {
  return (
    <section className="py-section-md bg-background">
      <Container>
        <div className="bg-primary rounded-lg overflow-hidden relative shadow-modal">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <Heading level={2} variant="h1" className="text-primary-foreground mb-4">
                Không tìm thấy linh kiện bạn cần?
              </Heading>
              <Text variant="large" className="text-primary-foreground/80">
                Đừng lo, hãy gửi ảnh sản phẩm, kích thước hoặc model thiết bị qua Zalo. Đội ngũ kỹ thuật của chúng tôi sẽ tra cứu và phản hồi ngay lập tức.
              </Text>
            </div>
            <div className="shrink-0">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 h-auto shadow-card" iconLeft={<MessageCircle size={24} />} href={siteConfig.contact.zaloUrl} target="_blank" rel="noopener noreferrer">
                Chat Zalo gửi ảnh ngay
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
