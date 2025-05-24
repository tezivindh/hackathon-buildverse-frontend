
import React, { useEffect, useRef } from 'react';

interface StorySectionProps {
  title: string;
  subtitle: string;
  content: string;
  sanskrit?: string;
  image?: string;
  index: number;
}

const StorySection: React.FC<StorySectionProps> = ({ 
  title, 
  subtitle, 
  content, 
  sanskrit, 
  index 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-12 text-center space-y-8 divine-glow">
          {/* Scene Number */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full text-divine-indigo font-bold text-xl">
            {index}
          </div>

          {/* Sanskrit Verse */}
          {sanskrit && (
            <div className="font-devanagari text-2xl text-divine-lavender mb-6 animate-float">
              {sanskrit}
            </div>
          )}

          {/* Title */}
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-divine-ivory mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          <h3 className="text-xl md:text-2xl text-divine-gold font-medium mb-8">
            {subtitle}
          </h3>

          {/* Content */}
          <p className="text-lg md:text-xl text-divine-lavender leading-relaxed max-w-3xl mx-auto">
            {content}
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-8 mt-12">
            <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-divine-lavender rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
