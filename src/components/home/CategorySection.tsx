import { Microwave, RotateCw, Wrench, Snowflake, WashingMachine, Sun } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { categoriesData } from '../../data/categories';

const icons = {
  Microwave: <Microwave size={32} className="text-primary" />,
  RotateCw: <RotateCw size={24} className="text-text-accent group-hover:text-primary transition-colors" />,
  Wrench: <Wrench size={24} className="text-text-accent group-hover:text-primary transition-colors" />,
  Snowflake: <Snowflake size={24} className="text-text-accent group-hover:text-primary transition-colors" />,
  WashingMachine: <WashingMachine size={24} className="text-text-accent group-hover:text-primary transition-colors" />,
  Sun: <Sun size={28} className="text-text-accent group-hover:text-accent transition-colors" />
};

export function CategorySection() {
  return (
    <section className="bg-surface py-section-md">
      <Container>
        <SectionHeading title="Danh mục sản phẩm" centered />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {categoriesData.map((cat, index) => {
            const catWithIcon = { ...cat, icon: icons[cat.iconName as keyof typeof icons] };
            return <CategoryCard key={index} category={catWithIcon} />;
          })}
          
        </div>
      </Container>
    </section>
  );
}
