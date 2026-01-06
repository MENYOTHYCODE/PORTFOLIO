function ArticleCardSkeleton() {
  return (
    <div className="bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-cyan-900/40 overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 skeleton"></div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title and metadata */}
        <div className="space-y-3">
          <div className="skeleton h-6 w-5/6 rounded"></div>
          <div className="flex gap-4">
            <div className="skeleton h-4 w-20 rounded"></div>
            <div className="skeleton h-4 w-24 rounded"></div>
            <div className="skeleton h-4 w-16 rounded"></div>
          </div>
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded"></div>
          <div className="skeleton h-4 w-4/5 rounded"></div>
          <div className="skeleton h-4 w-3/5 rounded"></div>
        </div>
        
        {/* Tags */}
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full"></div>
          <div className="skeleton h-6 w-20 rounded-full"></div>
          <div className="skeleton h-6 w-14 rounded-full"></div>
        </div>
        
        {/* Button */}
        <div className="skeleton h-10 w-full rounded-lg"></div>
      </div>
    </div>
  );
}

export default ArticleCardSkeleton;