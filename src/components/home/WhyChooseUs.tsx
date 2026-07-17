import { CheckCircle2, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { mockFeatures } from '../../data/mock';

const iconMap: Record<string, React.ReactNode> = {
  CheckCircle2: <CheckCircle2 size={32} />,
  ShieldCheck: <ShieldCheck size={32} />,
  Truck: <Truck size={32} />,
  Wrench: <Wrench size={32} />,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Tại sao chọn Điện lạnh Gia Định?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
              <div className="text-secondary mb-4">
                {iconMap[feature.iconName]}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-primary-foreground/80 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
