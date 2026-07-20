import React from 'react';
import { Heading } from './Heading';
import { Text } from './Text';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className = '', centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
      <Heading level={2} className="text-primary">{title}</Heading>
      {subtitle && <Text variant="normal" className="text-text-accent mt-2 max-w-2xl mx-auto">{subtitle}</Text>}
    </div>
  );
}
