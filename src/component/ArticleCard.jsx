import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Calendar, Clock, Tag, User, BookOpen } from "lucide-react";

function ArticleCard({ article, onArticleClick, className = "" }) {
  const handleCardClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get the cover image or use placeholder
  const coverImage = article.coverImage?.url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-cyan-900/40 hover:border-cyan-600/60 hover:shadow-cyan-700/20 cursor-pointer overflow-hidden group ${className}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${article.title}`}
      data-cursor="card"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={article.coverImage?.alt || article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Placeholder for missing images */}
        <div 
          className={`w-full h-full bg-gradient-to-br from-cyan-900/50 to-indigo-900/50 flex items-center justify-center ${coverImage ? 'hidden' : 'flex'}`}
        >
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
            <p className="text-cyan-300 font-medium">{article.title}</p>
          </div>
        </div>

        {/* Featured badge */}
        {article.featured && (
          <div className="absolute top-3 right-3 bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          article.category === 'tutorial' ? 'bg-green-600 text-white' :
          article.category === 'insights' ? 'bg-blue-600 text-white' :
          article.category === 'tips' ? 'bg-purple-600 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {formatCategory(article.category)}
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6">
        {/* Title and Metadata */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
            {article.title}
          </h2>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </div>
            )}
            
            {article.publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedDate)}
              </div>
            )}
            
            {article.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-cyan-800/30 border border-cyan-700/50 text-cyan-300 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-800/30 border border-gray-700/50 text-gray-400 rounded-full">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <button
          onClick={handleCardClick}
          className="w-full px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm font-medium group-hover:bg-cyan-600"
          aria-label={`Read full article: ${article.title}`}
        >
          Read Article
        </button>
      </div>
    </motion.article>
  );
}

export default ArticleCard;