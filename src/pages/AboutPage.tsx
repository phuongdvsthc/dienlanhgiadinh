import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, History, Layers, Truck, Headset, Phone, MessageCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../data/site';
import { aboutData } from '../data/about';

export function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'history': return <History size={48} className="text-secondary mb-4 mx-auto" />;
      case 'category': return <Layers size={48} className="text-secondary mb-4 mx-auto" />;
      case 'local_shipping': return <Truck size={48} className="text-secondary mb-4 mx-auto" />;
      case 'support_agent': return <Headset size={48} className="text-secondary mb-4 mx-auto" />;
      default: return <History size={48} className="text-secondary mb-4 mx-auto" />;
    }
  };

  return (
    <div className="flex-grow">
      {/* Breadcrumb */}
      <Container className="py-6">
        <nav className="flex text-sm font-semibold text-text-accent">
          <ol className="flex items-center space-x-2">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
                Trang chủ
              </button>
            </li>
            <li><ChevronRight size={16} /></li>
            <li className="text-primary">Giới thiệu</li>
          </ol>
        </nav>
      </Container>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Heading level={1} variant="display" className="text-primary mb-6">
                {aboutData.hero.title}
              </Heading>
              <Text variant="large" className="text-text-secondary mb-8 max-w-2xl">
                {aboutData.hero.description}
              </Text>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('/san-pham')} className="font-bold shadow-sm">
                  Xem Sản Phẩm
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/lien-he')}
                  className="font-bold border-2 border-primary text-primary hover:bg-surface-muted transition-colors"
                >
                  Tư Vấn Kỹ Thuật
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden shadow-md">
              <img 
                src={aboutData.hero.image} 
                alt="Về Điện lạnh Gia Định" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="bg-surface-muted/50 py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-sm relative group h-[400px] sm:h-[500px]">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: `url('${aboutData.story.image}')` }}
              ></div>
            </div>
            <div>
              <Heading level={2} variant="h2" className="text-primary mb-6">
                {aboutData.story.title}
              </Heading>
              <div className="space-y-6 text-text-secondary font-medium">
                {aboutData.story.paragraphs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
                <p className="font-bold text-primary border-l-4 border-accent pl-4 mt-6">
                  {aboutData.story.highlight}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="bg-background p-8 rounded-lg border border-border/50 text-center shadow-sm hover:shadow-card transition-shadow">
                {getIcon(stat.icon)}
                <Heading level={3} variant="h2" className="text-primary mb-2">
                  {stat.value}
                </Heading>
                <Text variant="small" className="text-text-secondary font-bold">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 mt-8">
        <Container className="text-center">
          <Heading level={2} variant="h2" className="mb-4 text-white">
            {aboutData.cta.title}
          </Heading>
          <Text variant="large" className="mb-8 max-w-2xl mx-auto opacity-90 text-white">
            {aboutData.cta.description}
          </Text>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-white text-primary hover:bg-surface-muted font-bold shadow-sm"
              onClick={() => navigate('/san-pham')}
            >
              Xem Sản Phẩm
            </Button>
            <Button 
              className="bg-[#24ad45] hover:bg-[#1f963a] text-white font-bold shadow-sm border border-[#24ad45]"
              iconLeft={<MessageCircle size={20} />}
              href={siteConfig.contact.zaloUrl}
              target="_blank"
            >
              Chat Zalo
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
