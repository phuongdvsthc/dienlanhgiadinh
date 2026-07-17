import { Star } from 'lucide-react';
import { mockTestimonials } from '../../data/mock';

export function Testimonials() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-4 tracking-tight">Khách hàng nói gì về chúng tôi</h2>
        <p className="text-muted text-center mb-12 max-w-2xl mx-auto">Hơn 5000+ khách hàng và thợ điện lạnh đã tin tưởng mua sắm linh kiện tại Điện lạnh Gia Định.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-surface-lowest p-8 rounded-xl shadow-sm border border-border/30">
              <div className="flex gap-1 text-secondary mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-surface-foreground leading-relaxed italic mb-6">"{testimonial.content}"</p>
              <div>
                <h4 className="font-bold text-primary">{testimonial.name}</h4>
                <p className="text-sm text-muted">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
