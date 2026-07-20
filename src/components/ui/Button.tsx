import React from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  iconLeft,
  iconRight,
  loading = false,
  fullWidth = false,
  disabled,
  className = '', 
  href,
  target,
  rel,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-accent text-accent-foreground hover:bg-accent/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
    danger: 'bg-error text-white hover:bg-error/90'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[40px]', // Increased height for mobile touch target
    md: 'px-4 py-2.5 text-sm min-h-[44px]', // Mobile friendly
    lg: 'px-6 py-3 text-base min-h-[48px]' // Mobile friendly
  };

  const widthClass = fullWidth ? 'w-full' : '';
  
  const actualIconLeft = iconLeft || icon; // Backward compatibility with `icon` prop

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && actualIconLeft && <span className="mr-2 flex items-center">{actualIconLeft}</span>}
      {children}
      {!loading && iconRight && <span className="ml-2 flex items-center">{iconRight}</span>}
    </>
  );

  const finalClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')) {
      return (
        <a 
          href={href}
          className={finalClassName}
          target={target}
          rel={rel}
          // @ts-ignore
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    } else {
      return (
        <Link 
          to={href}
          className={finalClassName}
          target={target}
          rel={rel}
          // @ts-ignore
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }
  }

  return (
    <button 
      className={finalClassName} 
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
