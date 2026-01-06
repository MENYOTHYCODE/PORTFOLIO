import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Filter, X, ChevronDown } from "lucide-react";
import { useState } from "react";

function ProjectFilters({ availableFilters, activeFilters, onFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTechnologyToggle = (tech) => {
    const newTechnologies = activeFilters.technologies.includes(tech)
      ? activeFilters.technologies.filter(t => t !== tech)
      : [...activeFilters.technologies, tech];
    
    onFilterChange({
      ...activeFilters,
      technologies: newTechnologies
    });
  };

  const handleCategoryToggle = (category) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    
    onFilterChange({
      ...activeFilters,
      categories: newCategories
    });
  };

  const handleStatusToggle = (status) => {
    const newStatuses = activeFilters.status.includes(status)
      ? activeFilters.status.filter(s => s !== status)
      : [...activeFilters.status, status];
    
    onFilterChange({
      ...activeFilters,
      status: newStatuses
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      technologies: [],
      categories: [],
      status: []
    });
  };

  const hasActiveFilters = 
    activeFilters.technologies.length > 0 ||
    activeFilters.categories.length > 0 ||
    activeFilters.status.length > 0;

  const formatCategoryName = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatStatusName = (status) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-6 mb-8"
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Filter Projects</h3>
          {hasActiveFilters && (
            <span className="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs">
              {activeFilters.technologies.length + activeFilters.categories.length + activeFilters.status.length}
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

      {/* Filter Content */}
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Technologies Filter */}
        {availableFilters.technologies && availableFilters.technologies.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {availableFilters.technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechnologyToggle(tech)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    activeFilters.technologies.includes(tech)
                      ? 'bg-cyan-600 border-cyan-600 text-white'
                      : 'bg-transparent border-cyan-700/50 text-cyan-300 hover:border-cyan-600 hover:bg-cyan-900/30'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

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
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-transparent border-indigo-700/50 text-indigo-300 hover:border-indigo-600 hover:bg-indigo-900/30'
                  }`}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Filter */}
        {availableFilters.statuses && availableFilters.statuses.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {availableFilters.statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    activeFilters.status.includes(status)
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'bg-transparent border-green-700/50 text-green-300 hover:border-green-600 hover:bg-green-900/30'
                  }`}
                >
                  {formatStatusName(status)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectFilters;