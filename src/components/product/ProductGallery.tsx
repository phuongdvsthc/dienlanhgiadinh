import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  altPrefix: string;
}

export function ProductGallery({ images, altPrefix }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-surface-muted/30 rounded-lg border border-border/50 aspect-square flex items-center justify-center">
        <span className="text-text-accent">Chưa có ảnh</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-surface-muted/20 rounded-xl border border-border/50 aspect-square flex items-center justify-center relative shadow-sm overflow-hidden p-4">
        <img 
          src={images[activeIndex]} 
          alt={`${altPrefix} - Ảnh ${activeIndex + 1}`}
          className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`bg-surface-muted/20 rounded-lg border aspect-square flex items-center justify-center p-2 focus:outline-none transition-all duration-200 ${
                activeIndex === index 
                  ? 'border-primary ring-1 ring-primary shadow-sm' 
                  : 'border-border/50 hover:border-primary/50'
              }`}
              aria-label={`Xem ảnh ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
