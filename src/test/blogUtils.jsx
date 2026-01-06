import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Custom render function that includes router context
export const renderWithRouter = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  )
  
  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock article data for testing
export const mockArticle = {
  id: "test-article",
  title: "Test Article",
  excerpt: "This is a test article excerpt for testing purposes",
  author: "Test Author",
  publishedDate: "2024-01-01T10:00:00Z",
  category: "tutorial",
  tags: ["React", "JavaScript", "Testing"],
  readingTime: 5,
  featured: true,
  published: true,
  coverImage: {
    url: "/test-cover.jpg",
    alt: "Test cover image"
  },
  seo: {
    metaDescription: "Test article meta description",
    keywords: ["test", "article", "blog"]
  }
}

// Mock articles array
export const mockArticles = [
  mockArticle,
  {
    ...mockArticle,
    id: "test-article-2",
    title: "Test Article 2",
    category: "insights",
    tags: ["Vue", "TypeScript"],
    featured: false,
    publishedDate: "2024-02-01T10:00:00Z"
  },
  {
    ...mockArticle,
    id: "test-article-3",
    title: "Test Article 3",
    category: "tips",
    tags: ["CSS", "Design"],
    featured: false,
    publishedDate: "2024-03-01T10:00:00Z"
  }
]

// Mock filter options
export const mockFilterOptions = {
  categories: ["tutorial", "insights", "tips"],
  tags: ["React", "JavaScript", "Testing", "Vue", "TypeScript", "CSS", "Design"],
  authors: ["Test Author"]
}

// Mock markdown content
export const mockMarkdownContent = `# Test Article

This is a test article with **bold text** and *italic text*.

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## List Example

- Item 1
- Item 2
- Item 3

That's all for this test article.`