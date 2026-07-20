import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormField } from './FormField';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className = '', id, required, disabled, ...props }, ref) => {
    const backupId = React.useId();
    const selectId = id || backupId;
    
    const baseSelectClasses = 'w-full appearance-none bg-surface-muted/50 border rounded-md text-text-primary focus:outline-none transition-colors min-h-[44px] pl-3 pr-10 text-base sm:text-sm cursor-pointer';
    const borderClasses = error ? 'border-error focus:ring-1 focus:ring-error focus:border-error' : 'border-border/50 focus:border-primary focus:ring-1 focus:ring-primary';
    const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed bg-surface-muted' : '';

    const select = (
      <div className="relative w-full">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          className={`${baseSelectClasses} ${borderClasses} ${disabledClasses} ${className}`}
          defaultValue={placeholder ? "" : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-accent pointer-events-none" />
      </div>
    );

    if (!label && !error && !hint) {
      return select;
    }

    return (
      <FormField label={label} error={error} hint={hint} required={required} htmlFor={selectId}>
        {select}
      </FormField>
    );
  }
);
Select.displayName = 'Select';
