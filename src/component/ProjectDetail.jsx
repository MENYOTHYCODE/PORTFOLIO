import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { X, ExternalLink, Github, Calendar, Tag, ArrowLeft } from "lucide-react";
import ProjectGallery from "./ProjectGallery";

function ProjectDetail({ project, onClose }) {
  if (!project) return null;

  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
          className="max-w-4xl mx-auto bg-[#0F172A] rounded-2xl shadow-2xl border border-cyan-900/40 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 p-6 border-b border-cyan-900/40">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label="Close project details"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </button>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {project.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  {project.category && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {formatCategoryName(project.category)}
                    </div>
                  )}
                  
                  {project.completedDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(project.completedDate)}
                    </div>
                  )}

                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-600 text-white' :
                    project.status === 'in-progress' ? 'bg-yellow-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {formatStatusName(project.status)}
                  </div>

                  {project.featured && (
                    <div className="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <button
                    onClick={() => handleLinkClick(project.demoUrl)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
                    aria-label={`View ${project.title} demo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Demo
                  </button>
                )}

                {project.repositoryUrl && (
                  <button
                    onClick={() => handleLinkClick(project.repositoryUrl)}
                    className="flex items-center gap-2 px-4 py-2 border border-cyan-600 text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 rounded-lg transition-colors font-medium"
                    aria-label={`View ${project.title} source code`}
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Project Gallery */}
            <ProjectGallery 
              images={project.images}
            />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">About This Project</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
                {project.longDescription && project.longDescription !== project.description && (
                  <p className="text-gray-300 leading-relaxed">
                    {project.longDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-cyan-800/30 border border-cyan-700/50 text-cyan-300 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links (if not shown in header) */}
            {(!project.demoUrl && !project.repositoryUrl) && (
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <p className="text-yellow-300 text-sm">
                  Demo and source code links are not available for this project.
                </p>
              </div>
            )}

            {/* Additional Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-700">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Project Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Category:</dt>
                    <dd className="text-white">{formatCategoryName(project.category)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Status:</dt>
                    <dd className="text-white">{formatStatusName(project.status)}</dd>
                  </div>
                  {project.completedDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Completed:</dt>
                      <dd className="text-white">{formatDate(project.completedDate)}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Quick Links</h3>
                <div className="space-y-2">
                  {project.demoUrl ? (
                    <button
                      onClick={() => handleLinkClick(project.demoUrl)}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">No demo available</span>
                  )}

                  {project.repositoryUrl ? (
                    <button
                      onClick={() => handleLinkClick(project.repositoryUrl)}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">Source code not available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectDetail;