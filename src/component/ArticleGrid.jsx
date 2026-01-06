import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import ArticleCard from "./ArticleCard";
import { BookOpen } from "lucide-react";

function ArticleGrid({ articles, onArticleClick, className = "" }) {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Sort articles chronologically (newest first)
  const sortedArticles = articles ? [...articles].sort((a, b) => {
    return new Date(b.publishedDate) - new Date(a.publishedDate);
  }) : [];

  // Handle empty state
  if (!articles || articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <BookOpen className="w-16 h-16 text-cyan-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">No Articles Found</h3>
        <p className="text-gray-400 max-w-md">
          No articles match your current search or filter criteria. Try adjusting your filters or clearing them to see all articles.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
    >
      {sortedArticles.map((article) => (
        <motion.div
          key={article.id}
          variants={itemVariants}
        >
          <ArticleCard
            article={article}
            onArticleClick={onArticleClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ArticleGrid;