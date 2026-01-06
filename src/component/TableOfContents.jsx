import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { List, ChevronRight } from 'lucide-react';

function TableOfContents({ content, className = "" }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Extract headings from markdown content
  const extractedData = useMemo(() => {
    if (!content) {
      return { headings: [], visible: false };
    }

    const headingRegex = /^(#{1,4})\s+(.+)$/gm;
    const extractedHeadings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      extractedHeadings.push({
        id,
        text,
        level
      });
    }

    return {
      headings: extractedHeadings,
      visible: extractedHeadings.length >= 3
    };
  }, [content]);

  useEffect(() => {
    setHeadings(extractedData.headings);
    setIsVisible(extractedData.visible);
  }, [extractedData]);

  // Track active section based on scroll position
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean);

      if (headingElements.length === 0) return;

      // Find the heading that's currently in view
      let currentActiveId = '';
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element.offsetTop <= scrollPosition) {
          currentActiveId = element.id;
          break;
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active heading

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible || headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`sticky top-24 ${className}`}
    >
      <div className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-4">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Table of Contents</h3>
        </div>

        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <motion.button
              key={heading.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => scrollToHeading(heading.id)}
              className={`w-full text-left px-2 py-1 rounded text-sm transition-colors group flex items-center gap-2 ${
                activeId === heading.id
                  ? 'bg-cyan-900/40 text-cyan-300 border-l-2 border-cyan-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
              }`}
              style={{
                paddingLeft: `${(heading.level - 1) * 12 + 8}px`
              }}
            >
              <ChevronRight 
                className={`w-3 h-3 transition-transform ${
                  activeId === heading.id ? 'rotate-90' : 'group-hover:translate-x-1'
                }`} 
              />
              <span className="line-clamp-2">{heading.text}</span>
            </motion.button>
          ))}
        </nav>

        {/* Reading Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Reading Progress</span>
            <span>{Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <motion.div
              className="bg-cyan-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0}%` 
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TableOfContents;