import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProjectCard from '../ProjectCard'
import { mockProject } from '../../test/utils.jsx'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      // Filter out framer-motion specific props
      // eslint-disable-next-line no-unused-vars
      const { initial, animate, whileHover, transition, ...domProps } = props
      return <div {...domProps}>{children}</div>
    }
  }
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ProjectCard project={mockProject} onProjectClick={mockOnClick} />
    )
    
    // Use more specific queries to avoid duplicate text issues
    expect(screen.getByRole('button', { name: /view details for test project/i })).toBeInTheDocument()
    expect(screen.getByText(mockProject.description)).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('calls onProjectClick when card is clicked', () => {
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ProjectCard project={mockProject} onProjectClick={mockOnClick} />
    )
    
    const card = screen.getByRole('button', { name: /view details for test project/i })
    fireEvent.click(card)
    
    expect(mockOnClick).toHaveBeenCalledWith(mockProject)
  })

  it('handles missing image gracefully', () => {
    const projectWithoutImage = { ...mockProject, images: [] }
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ProjectCard project={projectWithoutImage} onProjectClick={mockOnClick} />
    )
    
    expect(screen.getByRole('button', { name: /view details for test project/i })).toBeInTheDocument()
  })

  it('shows external links when available', () => {
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ProjectCard project={mockProject} onProjectClick={mockOnClick} />
    )
    
    expect(screen.getByLabelText(/view test project demo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/view test project source code/i)).toBeInTheDocument()
  })
})