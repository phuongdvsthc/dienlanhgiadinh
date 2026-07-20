import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '../ui/Container';
import { siteConfig } from '../../data/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-hover text-primary-foreground">
      <Container className="py-section-md grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <a className="flex items-center gap-3" href="/">
            {siteConfig.logo ? (
              <img src={siteConfig.logo} alt={siteConfig.name} className="h-10 w-auto" />
            ) : (
              <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center p-1">
                <span className="text-primary font-bold text-xl leading-none">{siteConfig.shortName}</span>
              </div>
            )}
            <span className="text-xl font-bold text-primary-foreground tracking-tight">{siteConfig.name}</span>
          </a>
          <p className="text-primary-foreground/80 mt-2 leading-relaxed">
            {siteConfig.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-primary-foreground mb-2 uppercase tracking-wider">Danh mục</h4>
          {siteConfig.footerCategories.map((category) => (
            <a 
              key={category.label}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" 
              href={category.href}
            >
              {category.label}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-primary-foreground mb-2 uppercase tracking-wider">Chính sách</h4>
          {siteConfig.footerLinks.map((link) => (
            <a 
              key={link.label}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" 
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-primary-foreground mb-2 uppercase tracking-wider">Liên hệ</h4>
          <a href={siteConfig.contact.callUrl} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-2">
            <Phone size={18} /> Hotline: {siteConfig.contact.hotline}
          </a>
          <a href={siteConfig.contact.zaloUrl} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-2">
            <MessageCircle size={18} /> Zalo: {siteConfig.contact.zalo}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-2">
            <Mail size={18} /> Email: {siteConfig.contact.email}
          </a>
          <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-start gap-2 mt-2">
            <MapPin size={18} className="mt-1 shrink-0" />
            <span>{siteConfig.contact.address}</span>
          </a>
          <p className="text-primary-foreground/70 flex items-start gap-2 mt-1">
            <Clock size={18} className="mt-1 shrink-0" />
            <span>{siteConfig.contact.workingHours}</span>
          </p>
        </div>
      </Container>
      <div className="border-t border-primary-hover-foreground/10 py-6 text-center text-primary-foreground/60 text-sm">
        © {currentYear} {siteConfig.name}. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}
