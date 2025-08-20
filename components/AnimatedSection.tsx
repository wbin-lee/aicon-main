import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6 
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: 50 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ 
        once: true, 
        amount: 0.1 
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </motion.div>
  );
}