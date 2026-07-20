import React from 'react';
import { Text } from './Text';

export function FormError({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <Text variant="small" className={`text-error mt-1 ${className}`}>
      {children}
    </Text>
  );
}
