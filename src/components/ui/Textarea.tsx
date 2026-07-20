import React, { forwardRef } from 'react';
import { FormField } from './FormField';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, required, disabled, ...props }, ref) => {
    const backupId = React.useId();
    const inputId = id || backupId;
    
    const baseInputClasses = 'w-full bg-surface-muted/50 border rounded-md text-text-primary placeholder:text-text-accent/60 focus:outline-none transition-colors p-3 text-base sm:text-sm min-h-[100px] resize-y';
    const borderClasses = error ? 'border-error focus:ring-1 focus:ring-error focus:border-error' : 'border-border/50 focus:border-primary focus:ring-1 focus:ring-primary';
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed bg-surface-muted' : '';

    const textarea = (
      <textarea
        ref={ref}
        id={inputId}
        disabled={disabled}
        required={required}
        className={`${baseInputClasses} ${borderClasses} ${disabledClasses} ${className}`}
        {...props}
      />
    );

    if (!label && !error && !hint) {
      return textarea;
    }

    return (
      <FormField label={label} error={error} hint={hint} required={required} htmlFor={inputId}>
        {textarea}
      </FormField>
    );
  }
);
Textarea.displayName = 'Textarea';
