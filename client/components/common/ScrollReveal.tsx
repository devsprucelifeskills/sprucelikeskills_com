"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseStyles: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    };

    switch (animation) {
      case 'fade-up':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        };
      case 'scale-up':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        };
      case 'slide-left':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
        };
      case 'slide-right':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
        };
      case 'fade-in':
      default:
        return baseStyles;
    }
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
}
