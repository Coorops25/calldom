import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import React, { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger, GSAPSplitText);

interface SplitTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  animationDelay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  children,
  className = '',
  delay = 100,
  animationDelay = 0,
  duration = 1,
  ease = 'power2.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete,
  showCallback = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible || !ref.current) return;

    const split = new GSAPSplitText(ref.current, { 
      type: splitType === 'chars' ? 'words,chars' : splitType,
      reduceWhiteSpace: false,
      specialChars: (char) => char === ' ' ? '&nbsp;' : char
    });
    const elements =
      splitType === 'chars'
        ? split.chars
        : splitType === 'words'
        ? split.words
        : split.lines;

    gsap.fromTo(
      elements,
      from,
      {
        ...to,
        duration,
        ease,
        delay: animationDelay / 1000,
        stagger: {
          each: delay / 1000,
          onComplete: () => {
            if (showCallback && onLetterAnimationComplete) {
              animatedCount.current++;
              if (animatedCount.current === elements.length) {
                onLetterAnimationComplete();
              }
            }
          },
        },
      }
    );

    return () => {
      split.revert();
    };
  }, [
    isVisible,
    text,
    children,
    delay,
    animationDelay,
    duration,
    ease,
    splitType,
    from,
    to,
    showCallback,
    onLetterAnimationComplete,
  ]);

  return (
    <div
      ref={ref}
      className={`split-text ${className}`}
      style={{ textAlign, whiteSpace: 'normal', display: 'inline-block' }}
    >
      {children || text}
    </div>
  );
};

export default SplitText;
