import { useReducedMotion } from 'motion/react';

export const useRespectfulMotion = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return {
    // Returns instant transition if user prefers reduced motion
    transition: shouldReduceMotion ? { duration: 0 } : ({ type: 'spring', stiffness: 300, damping: 25 } as const),
    // Returns rest state for hover if reduced motion
    hover: shouldReduceMotion ? {} : { y: -4, shadowOpacity: 1 },
  };
};
