import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { useState, useCallback, useRef } from "react";

function ArticleFilters({ 
  availableFilters, 
  activeFilters, 
  searchQuery, 
  onFilterChange, 
  onSearchChange 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  // Debounced search handler
  const debounceTimeoutRef = useRef(null);
  
  const handleSearchChange = useCallback((value) => {
    setLocalSearchQuery(value);
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  }, [onSearchChange]);

  const handleCategoryToggle = (category) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    
    onFilterChange({
      ...activeFilters,
      categories: newCategories
    });
  };

  const handleTagToggle = (tag) => {
    const newTags = activeFilters.tags.includes(tag)
      ? activeFilters.tags.filter(t => t !== tag)
      : [...activeFilters.tags, tag];
    
    onFilterChange({
      ...activeFilters,
      tags: newTags
    });
  };

  const handleFeaturedToggle = () => {
    onFilterChange({
      ...activeFilters,
      featured: !activeFilters.featured
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      tags: [],
      featured: false
    });
    setLocalSearchQuery('');
    onSearchChange('');
  };

  const hasActiveFilters = 
    activeFilters.categories.length > 0 ||
    activeFilters.tags.length > 0 ||
    activeFilters.featured ||
    (searchQuery && searchQuery.length > 0);

  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const totalActiveFilters = 
    activeFilters.categories.length + 
    activeFilters.tags.length + 
    (activeFilters.featured ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-6 mb-8"
    >
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Search & Filter Articles</h3>
          {totalActiveFilters > 0 && (
            <span className="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs">
              {totalActiveFilters}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-1 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/30 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden flex items-center gap-1 px-3 py-1 text-sm text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? 'Hide' : 'Show'} Filters
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles by title, content, or tags..."
          value={localSearchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-cyan-900/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-colors"
        />
      </div>

      {/* Filter Content */}
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Categories Filter */}
        {availableFilters.categories && availableFilters.categories.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {availableFilters.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    activeFilters.categories.includes(category)
                      ? 'bg-cyan-600 border-cyan-600 text-white'
                      : 'bg-transparent border-cyan-700/50 text-cyan-300 hover:border-cyan-600 hover:bg-cyan-900/30'
                  }`}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags Filter */}
        {availableFilters.tags && availableFilters.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {availableFilters.tags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    activeFilters.tags.includes(tag)
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-transparent border-indigo-700/50 text-indigo-300 hover:border-indigo-600 hover:bg-indigo-900/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {availableFilters.tags.length > 8 && (
                <span className="px-3 py-1 text-sm text-gray-400 border border-gray-700/50 rounded-full">
                  +{availableFilters.tags.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Featured Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Special</h4>
          <button
            onClick={handleFeaturedToggle}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              activeFilters.featured
                ? 'bg-yellow-600 border-yellow-600 text-white'
                : 'bg-transparent border-yellow-700/50 text-yellow-300 hover:border-yellow-600 hover:bg-yellow-900/30'
            }`}
          >
            Featured Articles
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ArticleFilters;