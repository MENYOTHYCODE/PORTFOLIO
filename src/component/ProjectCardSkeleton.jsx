function ProjectCardSkeleton() {
  return (
    <div className="bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-cyan-900/40 overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 skeleton"></div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title and date */}
        <div className="flex items-start justify-between">
          <div className="skeleton h-6 w-3/4 rounded"></div>
          <div className="skeleton h-4 w-16 rounded"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded"></div>
          <div className="skeleton h-4 w-5/6 rounded"></div>
          <div className="skeleton h-4 w-4/6 rounded"></div>
        </div>
        
        {/* Technology tags */}
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full"></div>
          <div className="skeleton h-6 w-20 rounded-full"></div>
          <div className="skeleton h-6 w-14 rounded-full"></div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="skeleton h-8 w-24 rounded-lg"></div>
          <div className="flex gap-2">
            <div className="skeleton h-8 w-8 rounded-lg"></div>
            <div className="skeleton h-8 w-8 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;