import React from 'react';
import { CheckCircle2, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { featuresData } from '../../data/features';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

const iconMap: Record<string, React.ReactNode> = {
  CheckCircle2: <CheckCircle2 size={32} />,
  ShieldCheck: <ShieldCheck size={32} />,
  Truck: <Truck size={32} />,
  Wrench: <Wrench size={32} />,
};

export function BenefitsSection() {
  return (
    <section className="py-section-md bg-primary text-primary-foreground">
      <Container>
        <SectionHeading title="Tại sao chọn Điện lạnh Gia Định?" centered className="[&>h2]:text-primary-foreground" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
              <div className="text-accent mb-4">
                {iconMap[feature.iconName]}
              </div>
              <Heading level={3} variant="h3" className="mb-3">{feature.title}</Heading>
              <Text variant="small" className="text-primary-foreground/80">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
