import { Star } from 'lucide-react';
import { reviewsData } from '../../data/reviews';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export function ReviewsSection() {
  return (
    <section className="py-section-md bg-surface">
      <Container>
        <SectionHeading title="Khách hàng nói gì về chúng tôi" subtitle="Hơn 5000+ khách hàng và thợ điện lạnh đã tin tưởng mua sắm linh kiện tại Điện lạnh Gia Định." centered />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((testimonial, index) => (
            <div key={index} className="bg-background p-8 rounded-lg shadow-sm border border-border/30">
              <div className="flex gap-1 text-accent mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <Text className="text-text-primary italic mb-6">"{testimonial.content}"</Text>
              <div>
                <Heading level={4} variant="h4" className="text-primary">{testimonial.name}</Heading>
                <Text variant="small" className="text-text-accent">{testimonial.role}</Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
