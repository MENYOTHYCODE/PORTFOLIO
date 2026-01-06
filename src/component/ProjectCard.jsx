import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";

function ProjectCard({ project, onProjectClick, className = "" }) {
  const handleCardClick = () => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  // Get the first image or use placeholder
  // Use a single primary image (first one) or fallback to placeholder
  const primaryImage = project.images && project.images.length > 0
    ? project.images[0]
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-cyan-900/40 hover:border-cyan-600/60 hover:shadow-cyan-700/20 cursor-pointer overflow-hidden group ${className}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      data-cursor="card"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt || project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = e.target.parentNode.querySelector('.pc-placeholder');
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Placeholder for missing images */}
        <div 
          className={`pc-placeholder w-full h-full bg-gradient-to-br from-cyan-900/50 to-indigo-900/50 flex items-center justify-center ${primaryImage ? 'hidden' : 'flex'}`}
        >
          <div className="text-center">
            <Tag className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
            <p className="text-cyan-300 font-medium">{project.title}</p>
          </div>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}

        {/* Status badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          project.status === 'completed' ? 'bg-green-600 text-white' :
          project.status === 'in-progress' ? 'bg-yellow-600 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {project.status.replace('-', ' ')}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Date */}
        <div className="flex items-start justify-between mb-3">
          <div className="relative">
            {/* decorative background behind the title using the primary image */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 -z-10 rounded-md bg-center bg-cover opacity-30 filter blur-sm ${primaryImage ? '' : 'hidden'}`}
              style={primaryImage ? { backgroundImage: `url(${primaryImage.url})` } : {}}
            />

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors relative z-10 px-1 py-px rounded-sm">
              {project.title}
            </h3>
          </div>

          {project.completedDate && (
            <div className="flex items-center text-gray-400 text-sm ml-2">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(project.completedDate).getFullYear()}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-cyan-800/30 border border-cyan-700/50 text-cyan-300 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="px-3 py-1 text-xs bg-gray-800/30 border border-gray-700/50 text-gray-400 rounded-full">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCardClick}
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            View Details
          </button>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <button
                onClick={(e) => handleLinkClick(e, project.demoUrl)}
                className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/30 rounded-lg transition-colors"
                aria-label={`View ${project.title} demo`}
                title="View Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            {project.repositoryUrl && (
              <button
                onClick={(e) => handleLinkClick(e, project.repositoryUrl)}
                className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/30 rounded-lg transition-colors"
                aria-label={`View ${project.title} source code`}
                title="View Source Code"
              >
                <Github className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;