import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Image as ImageIcon } from 'lucide-react';

function ArticleContent({ content, className = "" }) {
  // Custom renderers for markdown elements
  const components = {
    // Custom heading renderer to add IDs for table of contents
    h1: ({ children, ...props }) => (
      <h1 
        id={generateId(children)} 
        className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0 scroll-mt-20" 
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 
        id={generateId(children)} 
        className="text-2xl font-bold text-white mb-4 mt-8 scroll-mt-20" 
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 
        id={generateId(children)} 
        className="text-xl font-bold text-white mb-3 mt-6 scroll-mt-20" 
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 
        id={generateId(children)} 
        className="text-lg font-semibold text-white mb-2 mt-4 scroll-mt-20" 
        {...props}
      >
        {children}
      </h4>
    ),
    
    // Custom paragraph renderer
    p: ({ children, ...props }) => (
      <p className="text-gray-300 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
    
    // Custom list renderers
    ul: ({ children, ...props }) => (
      <ul className="text-gray-300 mb-4 pl-6 space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="text-gray-300 mb-4 pl-6 space-y-1 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="list-disc" {...props}>
        {children}
      </li>
    ),
    
    // Custom blockquote renderer
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-cyan-600 pl-4 py-2 my-6 bg-cyan-900/20 rounded-r-lg italic text-gray-300" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    
    // Custom code block renderer with syntax highlighting
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (!inline && language) {
        return (
          <div className="my-6">
            <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 rounded-t-lg border-b border-gray-700">
              {language}
            </div>
            <SyntaxHighlighter
              style={oneDark}
              language={language}
              PreTag="div"
              className="rounded-b-lg !mt-0"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      return (
        <code 
          className="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm font-mono" 
          {...props}
        >
          {children}
        </code>
      );
    },
    
    // Custom image renderer with error handling
    img: ({ src, alt, ...props }) => (
      <div className="my-6">
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg shadow-lg"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          {...props}
        />
        <div className="hidden w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400">Image not available</p>
            {alt && <p className="text-gray-500 text-sm mt-1">{alt}</p>}
          </div>
        </div>
        {alt && (
          <p className="text-gray-400 text-sm text-center mt-2 italic">{alt}</p>
        )}
      </div>
    ),
    
    // Custom link renderer
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    
    // Custom table renderers
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-700 rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-gray-700 px-4 py-2 bg-gray-800 text-white font-semibold text-left" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-700 px-4 py-2 text-gray-300" {...props}>
        {children}
      </td>
    ),
    
    // Custom horizontal rule
    hr: ({ ...props }) => (
      <hr className="border-gray-700 my-8" {...props} />
    ),
    
    // Custom strong and emphasis
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-white" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-gray-200" {...props}>
        {children}
      </em>
    )
  };

  // Generate ID from heading text for table of contents
  function generateId(children) {
    if (typeof children === 'string') {
      return children
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    if (Array.isArray(children)) {
      return children
        .map(child => typeof child === 'string' ? child : '')
        .join('')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    return '';
  }

  if (!content) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No content available</p>
      </div>
    );
  }

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default ArticleContent;