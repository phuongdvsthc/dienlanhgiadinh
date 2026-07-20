import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function Badge({ children, href, className = '' }: BadgeProps) {
  const baseClasses = 'bg-surface-muted hover:bg-border text-text-primary px-3 py-1 rounded-full transition-colors text-[13px] font-medium inline-block';
  
  if (href) {
    return <a href={href} className={`${baseClasses} ${className}`}>{children}</a>;
  }
  return <span className={`${baseClasses} ${className}`}>{children}</span>;
}
