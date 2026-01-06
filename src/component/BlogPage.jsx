import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import ArticleGrid from "./ArticleGrid";
import ArticleFilters from "./ArticleFilters";
import ArticleDetail from "./ArticleDetail";
import ArticleCardSkeleton from "./ArticleCardSkeleton";
import articlesData from "../data/articles.json";

function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    tags: [],
    featured: false
  });

  // Load article data
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter only published articles and validate data
        const validArticles = articlesData.filter(article => {
          return article.published && article.id && article.title && article.excerpt;
        });

        setArticles(validArticles);
        setError(null);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Generate available filter options from article data
  const availableFilters = useMemo(() => {
    const categories = new Set();
    const tags = new Set();
    const authors = new Set();

    articles.forEach(article => {
      // Collect categories
      if (article.category) {
        categories.add(article.category);
      }
      
      // Collect tags
      if (article.tags) {
        article.tags.forEach(tag => tags.add(tag));
      }
      
      // Collect authors
      if (article.author) {
        authors.add(article.author);
      }
    });

    return {
      categories: Array.from(categories).sort(),
      tags: Array.from(tags).sort(),
      authors: Array.from(authors).sort()
    };
  }, [articles]);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(article => {
        const searchableText = [
          article.title,
          article.excerpt,
          article.author,
          ...(article.tags || [])
        ].join(' ').toLowerCase();
        
        return searchableText.includes(query);
      });
    }

    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(article =>
        activeFilters.categories.includes(article.category)
      );
    }

    // Apply tag filter
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(article =>
        article.tags && activeFilters.tags.some(tag => article.tags.includes(tag))
      );
    }

    // Apply featured filter
    if (activeFilters.featured) {
      filtered = filtered.filter(article => article.featured);
    }

    return filtered;
  }, [articles, searchQuery, activeFilters]);

  // Handle article selection
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    // Update page title and meta tags
    document.title = `${article.title} | MENYO Blog`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.seo?.metaDescription || article.excerpt);
    }
  };

  // Handle closing article detail
  const handleCloseDetail = () => {
    setSelectedArticle(null);
    // Reset page title
    document.title = 'Blog | MENYO Portfolio';
    
    // Reset meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Development articles, tutorials, and insights from MENYO.');
    }
  };

  // Handle article navigation (prev/next)
  const handleArticleNavigate = (article) => {
    setSelectedArticle(article);
    handleArticleClick(article);
  };

  // Get previous and next articles for navigation
  const getAdjacentArticles = (currentArticle) => {
    const sortedArticles = [...articles].sort((a, b) => 
      new Date(b.publishedDate) - new Date(a.publishedDate)
    );
    
    const currentIndex = sortedArticles.findIndex(article => article.id === currentArticle.id);
    
    return {
      prevArticle: currentIndex > 0 ? sortedArticles[currentIndex - 1] : null,
      nextArticle: currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null
    };
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  // Handle search changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Set page meta tags on mount
  useEffect(() => {
    document.title = 'Blog | MENYO Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Development articles, tutorials, and insights from MENYO.');
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="skeleton h-12 w-80 mx-auto mb-4 rounded"></div>
            <div className="skeleton h-1.5 w-20 mx-auto mb-6 rounded-full"></div>
            <div className="skeleton h-6 w-96 mx-auto mb-2 rounded"></div>
            <div className="skeleton h-6 w-80 mx-auto rounded"></div>
          </div>
          
          {/* Filter skeleton */}
          <div className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-6 mb-8">
            <div className="skeleton h-6 w-48 mb-4 rounded"></div>
            <div className="skeleton h-12 w-full mb-6 rounded-lg"></div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="skeleton h-8 w-20 rounded-full"></div>
                <div className="skeleton h-8 w-24 rounded-full"></div>
                <div className="skeleton h-8 w-18 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Articles grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 max-w-md">
              <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Articles</h2>
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { prevArticle, nextArticle } = selectedArticle ? getAdjacentArticles(selectedArticle) : {};

  return (
    <div className="min-h-screen bg-[#0F172A] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Development Blog
          </h1>
          <div className="w-20 h-1.5 bg-cyan-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on modern web development, 
            React, JavaScript, and building great user experiences.
          </p>
          
          {/* Blog Stats */}
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{articles.length}</div>
              <div className="text-gray-400">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {articles.filter(a => a.featured).length}
              </div>
              <div className="text-gray-400">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {availableFilters.categories.length}
              </div>
              <div className="text-gray-400">Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <ArticleFilters
          availableFilters={availableFilters}
          activeFilters={activeFilters}
          searchQuery={searchQuery}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-400 text-sm">
            Showing {filteredArticles.length} of {articles.length} articles
            {(searchQuery || 
              activeFilters.categories.length > 0 || 
              activeFilters.tags.length > 0 || 
              activeFilters.featured) && (
              <span className="ml-2 text-cyan-400">
                (filtered)
              </span>
            )}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <ArticleGrid
          articles={filteredArticles}
          onArticleClick={handleArticleClick}
        />

        {/* Article Detail Modal */}
        {selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onClose={handleCloseDetail}
            onNavigate={handleArticleNavigate}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
          />
        )}
      </div>
    </div>
  );
}

export default BlogPage;