import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import ProjectsGrid from "./ProjectsGrid";
import ProjectFilters from "./ProjectFilters";
import ProjectDetail from "./ProjectDetail";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import projectsData from "../data/projects.json";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    technologies: [],
    categories: [],
    status: []
  });

  // Load project data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Validate project data
        const validProjects = projectsData.filter(project => {
          return project.id && project.title && project.description;
        });

        setProjects(validProjects);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Generate available filter options from project data
  const availableFilters = useMemo(() => {
    const technologies = new Set();
    const categories = new Set();
    const statuses = new Set();

    projects.forEach(project => {
      // Collect technologies
      if (project.technologies) {
        project.technologies.forEach(tech => technologies.add(tech));
      }
      
      // Collect categories
      if (project.category) {
        categories.add(project.category);
      }
      
      // Collect statuses
      if (project.status) {
        statuses.add(project.status);
      }
    });

    return {
      technologies: Array.from(technologies).sort(),
      categories: Array.from(categories).sort(),
      statuses: Array.from(statuses).sort()
    };
  }, [projects]);

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Technology filter
      if (activeFilters.technologies.length > 0) {
        const hasMatchingTech = activeFilters.technologies.some(tech =>
          project.technologies && project.technologies.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      // Category filter
      if (activeFilters.categories.length > 0) {
        if (!activeFilters.categories.includes(project.category)) {
          return false;
        }
      }

      // Status filter
      if (activeFilters.status.length > 0) {
        if (!activeFilters.status.includes(project.status)) {
          return false;
        }
      }

      return true;
    });
  }, [projects, activeFilters]);

  // Handle project selection
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Handle closing project detail
  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="skeleton h-12 w-64 mx-auto mb-4 rounded"></div>
            <div className="skeleton h-1.5 w-20 mx-auto mb-6 rounded-full"></div>
            <div className="skeleton h-6 w-96 mx-auto mb-2 rounded"></div>
            <div className="skeleton h-6 w-80 mx-auto rounded"></div>
          </div>
          
          {/* Filter skeleton */}
          <div className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-6 mb-8">
            <div className="skeleton h-6 w-32 mb-4 rounded"></div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="skeleton h-8 w-16 rounded-full"></div>
                <div className="skeleton h-8 w-20 rounded-full"></div>
                <div className="skeleton h-8 w-18 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Projects grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
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
              <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Projects</h2>
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
            My Projects
          </h1>
          <div className="w-20 h-1.5 bg-cyan-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my development work, featuring web applications, mobile apps, 
            APIs, and tools built with modern technologies and best practices.
          </p>
          
          {/* Project Stats */}
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{projects.length}</div>
              <div className="text-gray-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
              <div className="text-gray-400">In Progress</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <ProjectFilters
          availableFilters={availableFilters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-400 text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
            {(activeFilters.technologies.length > 0 || 
              activeFilters.categories.length > 0 || 
              activeFilters.status.length > 0) && (
              <span className="ml-2 text-cyan-400">
                (filtered)
              </span>
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <ProjectsGrid
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
        />

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;