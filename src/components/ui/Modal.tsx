import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Heading } from './Heading';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-lg' }: ModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-inverse-surface/40 backdrop-blur-sm">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative bg-surface-container-lowest w-full ${maxWidth} max-h-[90vh] sm:rounded-xl rounded-t-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 duration-300 z-10`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container-high shrink-0">
            <Heading level={2} variant="h4" className="text-primary">{title}</Heading>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X size={24} />
            </button>
          </div>
        )}
        
        {!title && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-on-surface-variant bg-surface-container-low hover:text-primary transition-colors focus:outline-none"
          >
            <X size={24} />
          </button>
        )}

        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow bg-surface">
          {children}
        </div>

        {footer && (
          <div className="p-6 border-t border-surface-container-high bg-surface-container-lowest shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
