import React, { forwardRef } from 'react';
import { FormField } from './FormField';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, iconLeft, iconRight, className = '', id, required, disabled, ...props }, ref) => {
    const backupId = React.useId();
    const inputId = id || backupId;
    
    const baseInputClasses = 'w-full bg-surface-muted/50 border rounded-md text-text-primary placeholder:text-text-accent/60 focus:outline-none transition-colors min-h-[44px] text-base sm:text-sm';
    const borderClasses = error ? 'border-error focus:ring-1 focus:ring-error focus:border-error' : 'border-border/50 focus:border-primary focus:ring-1 focus:ring-primary';
    const paddingClasses = `${iconLeft ? 'pl-10' : 'pl-3'} ${iconRight ? 'pr-10' : 'pr-3'}`;
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed bg-surface-muted' : '';

    const input = (
      <div className="relative flex items-center w-full">
        {iconLeft && (
          <div className="absolute left-3 text-text-accent pointer-events-none flex items-center justify-center">
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          className={`${baseInputClasses} ${borderClasses} ${paddingClasses} ${disabledClasses} ${className}`}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 text-text-accent pointer-events-none flex items-center justify-center">
            {iconRight}
          </div>
        )}
      </div>
    );

    if (!label && !error && !hint) {
      return input;
    }

    return (
      <FormField label={label} error={error} hint={hint} required={required} htmlFor={inputId}>
        {input}
      </FormField>
    );
  }
);
Input.displayName = 'Input';
