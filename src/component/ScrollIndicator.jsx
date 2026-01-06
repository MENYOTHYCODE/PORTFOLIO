import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

/**
 * Scroll progress indicator component
 * @returns {JSX.Element} ScrollIndicator component
 */
function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-indigo-600 z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress }}
      transition={{ duration: 0.1 }}
    />
  );
}

export default ScrollIndicator;