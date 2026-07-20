import React from 'react';
import { Text } from './Text';

export function FormHint({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <Text variant="small" className={`text-text-accent mt-1 ${className}`}>
      {children}
    </Text>
  );
}
