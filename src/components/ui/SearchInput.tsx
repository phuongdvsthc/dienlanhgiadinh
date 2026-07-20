import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input, InputProps } from './Input';
import { Button } from './Button';

export interface SearchInputProps extends Omit<InputProps, 'iconLeft' | 'iconRight'> {
  onSearch?: (value: string) => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, buttonText = 'Tìm kiếm', buttonIcon, className = '', id, ...props }, ref) => {
    const backupId = React.useId();
    const inputId = id || backupId;
    
    const handleSearch = () => {
      if (onSearch) {
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) {
          onSearch(input.value);
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <div className={`relative flex w-full ${className}`}>
        <div className="relative flex-grow">
          <Input
            ref={ref}
            id={inputId}
            iconLeft={<Search size={20} />}
            className="rounded-r-none h-14 bg-surface-muted/50 border-border/50"
            onKeyDown={handleKeyDown}
            {...props}
          />
        </div>
        <Button 
          type="button" 
          onClick={handleSearch} 
          size="lg" 
          className="rounded-l-none h-14 px-8 shrink-0"
          iconLeft={buttonIcon}
        >
          {buttonText}
        </Button>
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
