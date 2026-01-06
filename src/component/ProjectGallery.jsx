import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ChevronLeft, ChevronRight, X, ZoomIn, Image as ImageIcon } from "lucide-react";

function ProjectGallery({ images, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Handle case where no images are provided
  if (!images || images.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] ${className}`}>
        <ImageIcon className="w-16 h-16 text-cyan-400 mb-4" />
        <p className="text-gray-400 text-center">No images available for this project</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const placeholder = e.target.nextSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Image Display */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden group">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="w-full h-64 md:h-80 object-cover cursor-zoom-in"
              onClick={() => openLightbox(currentIndex)}
              onError={handleImageError}
              loading="lazy"
            />
            
            {/* Placeholder for failed images */}
            <div className="hidden w-full h-64 md:h-80 bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                <p className="text-cyan-300">Image not available</p>
              </div>
            </div>

            {/* Zoom overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Navigation arrows (only show if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Image Caption */}
        {images[currentIndex].caption && (
          <p className="text-gray-400 text-sm mt-2 text-center">
            {images[currentIndex].caption}
          </p>
        )}

        {/* Thumbnail Navigation (only show if multiple images) */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex
                    ? 'border-cyan-500'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                <img
                  src={image.thumbnail || image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-700 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Lightbox image */}
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />

              {/* Placeholder for failed lightbox images */}
              <div className="hidden w-96 h-96 bg-gray-800 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Image not available</p>
                </div>
              </div>

              {/* Lightbox navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Lightbox counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
                    {lightboxIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Lightbox caption */}
              {images[lightboxIndex].caption && (
                <div className="absolute -bottom-12 left-0 right-0 text-white text-center">
                  {images[lightboxIndex].caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectGallery;