import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
}

const variantClasses = {
  display: 'text-4xl md:text-5xl font-extrabold leading-tight tracking-tight',
  h1: 'text-3xl md:text-4xl font-bold tracking-tight',
  h2: 'text-2xl md:text-3xl font-bold tracking-tight',
  h3: 'text-xl md:text-2xl font-bold',
  h4: 'text-lg font-bold',
};

export function Heading({
  level = 2,
  as,
  variant,
  className = '',
  children,
  ...props
}: HeadingProps) {
  const Tag = (as || `h${level}`) as React.ElementType;
  const selectedVariant = variant || (`h${level}` as keyof typeof variantClasses);
  const baseClass = variantClasses[selectedVariant as keyof typeof variantClasses] || variantClasses.h2;

  return (
    <Tag className={`${baseClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
