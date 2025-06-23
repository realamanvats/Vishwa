import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize, Trash2, Check } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
  title: string;
  autoPlay?: boolean;
  onDelete?: (imageIndex: number) => void;
  showDeleteButton?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  images, 
  title, 
  autoPlay = false, 
  onDelete,
  showDeleteButton = false 
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || selectedImage !== null) return;

    const interval = setInterval(() => {
      setCurrentAutoIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedImage, images.length]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsAutoPlaying(false); // Stop auto-play when lightbox opens
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setIsAutoPlaying(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleDelete = (imageIndex: number) => {
    if (deleteConfirm === imageIndex) {
      onDelete?.(imageIndex);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(imageIndex);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <>
      {/* Auto-play controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title} ({images.length} photos)
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAutoPlay}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isAutoPlaying 
                ? 'bg-rose-500 text-white hover:bg-rose-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Auto Play
              </>
            )}
          </button>
          
          <button
            onClick={openFullscreen}
            className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            <Maximize className="w-4 h-4 mr-2" />
            Fullscreen
          </button>
        </div>
      </div>

      {/* Auto-play preview */}
      {isAutoPlaying && selectedImage === null && (
        <div className="mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            <img
              src={images[currentAutoIndex]}
              alt={`${title} ${currentAutoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentAutoIndex + 1} / {images.length}
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => openLightbox(currentAutoIndex)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-4 h-4 rotate-45" />
              </button>
            </div>
            
            {/* Delete button for auto-play preview */}
            {showDeleteButton && onDelete && (
              <button
                onClick={() => handleDelete(currentAutoIndex)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  deleteConfirm === currentAutoIndex
                    ? 'bg-red-600 text-white scale-110'
                    : 'bg-red-500 hover:bg-red-600 text-white opacity-80 hover:opacity-100'
                }`}
              >
                {deleteConfirm === currentAutoIndex ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-gray-300">
            <div 
              className="h-full bg-rose-500 transition-all duration-300"
              style={{ width: `${((currentAutoIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Grid view */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg cursor-pointer group transition-all duration-300 ${
              isAutoPlaying && index === currentAutoIndex ? 'ring-4 ring-rose-500 scale-105' : ''
            }`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkM5Ljc5IDEzLjc5IDkuNzkgMTAuMjEgMTIgOEMxNC4yMSAxMC4yMSAxNC4yMSAxMy43OSAxMiAxNloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </div>
            
            {/* Delete button */}
            {showDeleteButton && onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${
                  deleteConfirm === index
                    ? 'bg-red-600 text-white scale-110 opacity-100'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {deleteConfirm === index ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}
              </button>
            )}
            
            {deleteConfirm === index && (
              <div className="absolute top-8 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Click again
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Regular Lightbox */}
      {selectedImage !== null && !isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <img
            src={images[selectedImage]}
            alt={`${title} ${selectedImage + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Fullscreen Slideshow */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            {isAutoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>

          <div className="w-full h-full flex items-center justify-center p-8">
            <img
              src={images[currentAutoIndex]}
              alt={`${title} ${currentAutoIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black/70 px-6 py-3 rounded-full">
            {currentAutoIndex + 1} / {images.length}
          </div>
          
          {/* Progress bar for fullscreen */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div 
              className="h-full bg-rose-500 transition-all duration-300"
              style={{ width: `${((currentAutoIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;