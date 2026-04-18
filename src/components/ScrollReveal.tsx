/**
 * SCROLL REVEAL ANIMATION COMPONENT
 * Wrapper component for smooth reveal animations on scroll
 * 
 * FEATURES:
 * - Fade in animations
 * - Slide from different directions
 * - Stagger animations for lists
 * - Customizable delays and durations
 * - Uses Intersection Observer for performance
 * 
 * USAGE:
 * <ScrollReveal>
 *   <YourComponent />
 * </ScrollReveal>
 * 
 * Or with options:
 * <ScrollReveal direction="up" delay={0.2} duration={0.6}>
 *   <YourComponent />
 * </ScrollReveal>
 */

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
  threshold = 0.1,
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once]);

  /**
   * ANIMATION STYLES
   * Generate initial and animated states based on direction
   */
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'fade':
        return 'translateY(0)';
      default:
        return `translateY(${distance}px)`;
    }
  };

  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`
  };

  return (
    <div ref={elementRef} style={animationStyles} className={className}>
      {children}
    </div>
  );
}

/**
 * STAGGER CHILDREN ANIMATION
 * Animates children with incremental delays
 * 
 * USAGE:
 * <StaggerChildren staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggerChildren>
 */

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  className = ''
}: StaggerChildrenProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

/**
 * FADE IN ON SCROLL
 * Simple fade in animation component
 */
export function FadeIn({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <ScrollReveal direction="fade" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

/**
 * SLIDE UP ON SCROLL
 * Slide up animation component (most common)
 */
export function SlideUp({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <ScrollReveal direction="up" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

/**
 * SCALE ON SCROLL
 * Scale animation on scroll
 */
export function ScaleIn({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
  };

  return (
    <div ref={elementRef} style={animationStyles} className={className}>
      {children}
    </div>
  );
}
