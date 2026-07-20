import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/site';
import { useLocation } from 'react-router-dom';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        className="md:hidden text-text-primary p-2 focus:outline-none" 
        aria-label="Menu"
        onClick={toggleMenu}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-border/30">
          <span className="font-bold text-primary">{siteConfig.name}</span>
          <button 
            className="p-2 text-text-primary focus:outline-none" 
            onClick={closeMenu}
            aria-label="Đóng menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
          {siteConfig.menu.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`py-3 px-4 rounded-md font-semibold transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-primary hover:bg-surface-muted'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="p-4 border-t border-border/30 flex flex-col gap-3">
          <Button 
            variant="outline" 
            fullWidth 
            iconLeft={<Phone size={18} />} 
            href={siteConfig.contact.callUrl}
            onClick={closeMenu}
          >
            Gọi ngay
          </Button>
          <Button 
            variant="secondary" 
            fullWidth 
            iconLeft={<MessageCircle size={18} />} 
            href={siteConfig.contact.zaloUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Chat Zalo
          </Button>
        </div>
      </div>
    </>
  );
}
