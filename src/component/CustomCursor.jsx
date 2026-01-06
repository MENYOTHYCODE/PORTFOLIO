import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

/**
 * Custom cursor component with interactive effects and particle trail
 * @returns {JSX.Element} CustomCursor component
 */
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const mouseMove = (e) => {
      const newPosition = {
        x: e.clientX,
        y: e.clientY
      };
      
      setMousePosition(newPosition);

      // Add to trail
      trailRef.current = [
        newPosition,
        ...trailRef.current.slice(0, 8)
      ];
      setTrail([...trailRef.current]);
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      // Buttons, links, and interactive elements
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, [role="button"], .cursor-pointer'
      );

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('hover'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Text elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('text'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Project cards and blog cards
      const cardElements = document.querySelectorAll('[data-cursor="card"]');
      cardElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('card'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      // Form inputs
      const inputElements = document.querySelectorAll('input, textarea');
      inputElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorVariant('input'));
        el.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Initial setup
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);
    
    // Add listeners after a short delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Re-add listeners when content changes (for dynamic content)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      observer.disconnect();
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(6, 182, 212, 0.8)',
      border: '2px solid rgba(6, 182, 212, 0.4)',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.15
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(99, 102, 241, 0.9)',
      border: '2px solid rgba(99, 102, 241, 0.6)',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.15
      }
    },
    text: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.2,
      backgroundColor: 'rgba(6, 182, 212, 0.6)',
      border: '2px solid rgba(6, 182, 212, 0.3)',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.15
      }
    },
    card: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      backgroundColor: 'rgba(168, 85, 247, 0.8)',
      border: '2px solid rgba(168, 85, 247, 0.6)',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.2
      }
    },
    input: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 12,
      scale: 1,
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      border: '1px solid rgba(34, 197, 94, 0.6)',
      borderRadius: '2px',
      width: '2px',
      height: '24px',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.15
      }
    }
  };

  // Don't render on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) return null;

  return (
    <>
      {/* Cursor trail */}
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 w-2 h-2 bg-cyan-400/30 rounded-full pointer-events-none z-[9997]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: position.x - 4,
            y: position.y - 4,
            opacity: (trail.length - index) / trail.length * 0.6,
            scale: (trail.length - index) / trail.length * 0.8
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.02
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Cursor center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0.02
        }}
        style={{
          opacity: isVisible && cursorVariant !== 'input' ? 1 : 0,
        }}
      />
    </>
  );
}

export default CustomCursor;