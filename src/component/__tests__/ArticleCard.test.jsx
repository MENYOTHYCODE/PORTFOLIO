import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ArticleCard from '../ArticleCard'
import { mockArticle } from '../../test/blogUtils.jsx'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }) => {
      // Filter out framer-motion specific props
      // eslint-disable-next-line no-unused-vars
      const { initial, animate, whileHover, transition, ...domProps } = props
      return <article {...domProps}>{children}</article>
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

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ArticleCard article={mockArticle} onArticleClick={mockOnClick} />
    )
    
    expect(screen.getByRole('button', { name: /read article: test article/i })).toBeInTheDocument()
    expect(screen.getByText(mockArticle.excerpt)).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('calls onArticleClick when card is clicked', () => {
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ArticleCard article={mockArticle} onArticleClick={mockOnClick} />
    )
    
    const card = screen.getByRole('button', { name: /read article: test article/i })
    fireEvent.click(card)
    
    expect(mockOnClick).toHaveBeenCalledWith(mockArticle)
  })

  it('handles missing cover image gracefully', () => {
    const articleWithoutImage = { ...mockArticle, coverImage: null }
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ArticleCard article={articleWithoutImage} onArticleClick={mockOnClick} />
    )
    
    expect(screen.getByRole('button', { name: /read article: test article/i })).toBeInTheDocument()
  })

  it('shows featured badge when article is featured', () => {
    const mockOnClick = vi.fn()
    
    renderWithRouter(
      <ArticleCard article={mockArticle} onArticleClick={mockOnClick} />
    )
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })
})