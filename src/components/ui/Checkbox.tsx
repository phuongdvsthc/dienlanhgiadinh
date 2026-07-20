import React, { forwardRef } from 'react';
import { FormError } from './FormError';
import { FormHint } from './FormHint';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, className = '', id, disabled, required, ...props }, ref) => {
    const backupId = React.useId();
    const inputId = id || backupId;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="flex items-center h-5 mt-0.5">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              disabled={disabled}
              required={required}
              className={`w-4 h-4 rounded border-border/50 text-primary focus:ring-primary accent-primary cursor-pointer ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              {...props}
            />
          </div>
          {label && (
            <label
              htmlFor={inputId}
              className={`text-sm text-text-primary cursor-pointer select-none ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </label>
          )}
        </div>
        {(error || hint) && (
          <div className="pl-7">
            {error ? <FormError>{error}</FormError> : <FormHint>{hint}</FormHint>}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
