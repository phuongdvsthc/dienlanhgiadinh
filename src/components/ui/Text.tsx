import React from 'react';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  variant?: 'large' | 'normal' | 'small' | 'caption';
  children: React.ReactNode;
}

const variantClasses = {
  large: 'text-lg leading-relaxed',
  normal: 'text-base leading-relaxed',
  small: 'text-sm leading-relaxed',
  caption: 'text-xs font-semibold uppercase tracking-wider',
};

export function Text({
  as: Tag = 'p',
  variant = 'normal',
  className = '',
  children,
  ...props
}: TextProps) {
  const baseClass = variantClasses[variant] || variantClasses.normal;

  return (
    <Tag className={`${baseClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
