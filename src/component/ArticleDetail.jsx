import { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { X, ArrowLeft, Calendar, Clock, User, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import ArticleContent from "./ArticleContent";
import TableOfContents from "./TableOfContents";
import SocialShare from "./SocialShare";

function ArticleDetail({ article, onClose, onNavigate, prevArticle, nextArticle }) {
  const [content, setContent] = useState('');

  // Load markdown content for the article
  const loadArticleContent = useCallback(async () => {
    if (!article) return '';
    
    try {
      const response = await fetch(`/src/data/articles/${article.id}.md`);
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.error('Error loading article content:', error);
    }
    
    // Fallback to basic content
    return `# ${article.title}\n\n${article.excerpt}\n\nFull content coming soon...`;
  }, [article]);

  useEffect(() => {
    if (article) {
      loadArticleContent().then(setContent);
    }
  }, [article, loadArticleContent]);

  if (!article) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto bg-[#0F172A] rounded-2xl shadow-2xl border border-cyan-900/40 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 p-6 border-b border-cyan-900/40">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-4">
              <span>Blog</span>
              <span className="mx-2">/</span>
              <span className="text-cyan-400">{formatCategory(article.category)}</span>
              <span className="mx-2">/</span>
              <span className="text-white">{article.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
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

                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    article.category === 'tutorial' ? 'bg-green-600 text-white' :
                    article.category === 'insights' ? 'bg-blue-600 text-white' :
                    article.category === 'tips' ? 'bg-purple-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {formatCategory(article.category)}
                  </div>

                  {article.featured && (
                    <div className="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-cyan-800/30 border border-cyan-700/50 text-cyan-300 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Share */}
              <div className="lg:w-64">
                <SocialShare article={article} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8">
              <ArticleContent content={content} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-700">
              <TableOfContents content={content} />
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-gray-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Previous Article */}
              {prevArticle ? (
                <button
                  onClick={() => onNavigate && onNavigate(prevArticle)}
                  className="flex items-center gap-3 p-4 bg-[#1E293B]/60 hover:bg-[#1E293B] rounded-lg transition-colors group w-full md:w-auto"
                >
                  <ChevronLeft className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-gray-400 mb-1">Previous Article</p>
                    <p className="text-white font-medium line-clamp-1">{prevArticle.title}</p>
                  </div>
                </button>
              ) : (
                <div className="w-full md:w-auto" />
              )}

              {/* Next Article */}
              {nextArticle ? (
                <button
                  onClick={() => onNavigate && onNavigate(nextArticle)}
                  className="flex items-center gap-3 p-4 bg-[#1E293B]/60 hover:bg-[#1E293B] rounded-lg transition-colors group w-full md:w-auto"
                >
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Next Article</p>
                    <p className="text-white font-medium line-clamp-1">{nextArticle.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="w-full md:w-auto" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ArticleDetail;