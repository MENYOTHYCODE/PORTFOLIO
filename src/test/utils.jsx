import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Custom render function that includes router context
export const renderWithRouter = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  )
  
  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock project data for testing
export const mockProject = {
  id: "test-project",
  title: "Test Project",
  description: "A test project for unit testing",
  longDescription: "This is a longer description for testing purposes",
  technologies: ["React", "JavaScript", "CSS"],
  category: "web-app",
  images: [
    {
      url: "/test-image.jpg",
      alt: "Test image",
      caption: "Test caption"
    }
  ],
  demoUrl: "https://test-demo.com",
  repositoryUrl: "https://github.com/test/repo",
  featured: true,
  completedDate: "2024-01-01",
  status: "completed"
}

// Mock projects array
export const mockProjects = [
  mockProject,
  {
    ...mockProject,
    id: "test-project-2",
    title: "Test Project 2",
    technologies: ["Vue", "TypeScript"],
    category: "mobile-app",
    featured: false
  }
]

// Mock filter options
export const mockFilterOptions = {
  technologies: ["React", "JavaScript", "CSS", "Vue", "TypeScript"],
  categories: ["web-app", "mobile-app", "api", "library"],
  statuses: ["completed", "in-progress", "archived"]
}