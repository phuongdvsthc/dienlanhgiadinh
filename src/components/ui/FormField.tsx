import React from 'react';
import { FormError } from './FormError';
import { FormHint } from './FormHint';

interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  hint,
  required,
  htmlFor,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="font-semibold text-text-primary text-sm flex items-center">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error ? <FormError>{error}</FormError> : <FormHint>{hint}</FormHint>}
    </div>
  );
}
