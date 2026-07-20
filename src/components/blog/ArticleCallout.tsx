import React from 'react';
import { AlertTriangle, Lightbulb, Info } from 'lucide-react';

interface ArticleCalloutProps {
  variant: 'warning' | 'info' | 'quick_answer';
  title: string;
  content: string;
}

export function ArticleCallout({ variant, title, content }: ArticleCalloutProps) {
  if (variant === 'warning') {
    return (
      <div className="bg-[#ba1a1a]/10 border-l-4 border-[#ba1a1a] p-4 rounded-r-lg my-8 flex gap-4">
        <AlertTriangle className="text-[#ba1a1a] shrink-0 mt-0.5" />
        <div>
          <strong className="block text-[#93000a] font-bold mb-1">{title}</strong>
          <p className="text-sm m-0 text-text-secondary">{content}</p>
        </div>
      </div>
    );
  }

  if (variant === 'quick_answer') {
    const steps = content.split('\n').filter(line => line.trim().length > 0);
    
    return (
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
        <h3 className="font-bold text-lg text-primary mt-0 mb-4 flex items-center gap-2 relative z-10">
          <Lightbulb className="text-accent" />
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {steps.map((step, index) => {
            const stepParts = step.replace(/^\d+\.\s*/, '').split(':');
            const stepTitle = stepParts[0].trim();
            const stepDesc = stepParts.length > 1 ? stepParts.slice(1).join(':').trim() : '';
            
            return (
              <div key={index} className="bg-background p-4 rounded-lg shadow-sm border border-border/50 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-2">
                  {index + 1}
                </div>
                <div className="font-bold text-sm text-primary mb-1">{stepTitle}</div>
                {stepDesc && <div className="text-xs text-text-secondary">{stepDesc}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg my-8 flex gap-4">
      <Info className="text-primary shrink-0 mt-0.5" />
      <div>
        <strong className="block text-primary font-bold mb-1">{title}</strong>
        <p className="text-sm m-0 text-text-secondary">{content}</p>
      </div>
    </div>
  );
}
