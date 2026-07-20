import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { MobileMenu } from './MobileMenu';
import { siteConfig } from '../../data/site';
import { useLocation, Link } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-background fixed top-0 w-full z-50 shadow-sm border-b border-border/30">
      <Container className="py-4 flex justify-between items-center">
        <Link className="flex items-center gap-3" to="/">
          {siteConfig.logo ? (
            <img src={siteConfig.logo} alt={siteConfig.name} className="h-10 w-auto" />
          ) : (
            <div className="h-10 w-10 bg-white rounded-md border border-border flex items-center justify-center p-1">
              <span className="text-primary font-bold text-xl leading-none">{siteConfig.shortName}</span>
            </div>
          )}
          <span className="text-2xl font-extrabold text-primary hidden sm:block tracking-tight">{siteConfig.name}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.menu.map((item) => {
            const isActive = location.pathname === item.href && item.href !== '#';
            return (
              <Link 
                key={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive 
                    ? 'text-accent font-bold border-b-2 border-secondary pb-1' 
                    : 'text-text-accent hover:text-accent font-semibold'
                }`} 
                to={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="hidden lg:flex" 
            iconLeft={<Phone size={18} />} 
            href={siteConfig.contact.callUrl}
          >
            Gọi ngay
          </Button>
          <Button 
            variant="secondary" 
            className="shadow-sm hidden sm:flex" 
            iconLeft={<MessageCircle size={18} />} 
            href={siteConfig.contact.zaloUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chat Zalo
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
