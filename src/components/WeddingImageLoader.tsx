import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, ImageOff } from 'lucide-react';

interface WeddingImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  retryLimit?: number;
}

// Simple cache to prevent re-fetching known bad images
const errorCache = new Set<string>();

export const WeddingImageLoader = ({ 
  src, 
  alt, 
  className = '', 
  retryLimit = 2
}: WeddingImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(errorCache.has(src));
  const [retryCount, setRetryCount] = useState(0);

  // Reset state when src changes
  useEffect(() => {
    setLoaded(false);
    setError(errorCache.has(src));
    setRetryCount(0);
  }, [src]);

  const handleError = () => {
    if (retryCount < retryLimit) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setError(false);
      }, 1000 * (retryCount + 1));
    } else {
      errorCache.add(src); // Add to cache
      setError(true);
    }
  };

  const handleRetry = () => {
    errorCache.delete(src); // Remove from cache
    setError(false);
    setRetryCount(0);
  };

  // Convert Google Drive URL if needed
  const getCorrectedUrl = (url: string) => {
    if (url.includes('lh3.googleusercontent.com')) {
      const fileId = url.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url;
  };

  const imageUrl = getCorrectedUrl(src);

  return (
    <div className={`relative aspect-square overflow-hidden rounded-lg ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <Heart className="text-rose-300 animate-pulse" size={24} />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2 p-4">
          <ImageOff className="text-gray-400" size={24} />
          <span className="text-gray-500 text-sm text-center">Image unavailable</span>
          <button 
            onClick={handleRetry}
            className="mt-2 text-sm flex items-center gap-1 text-rose-500 hover:text-rose-600"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      )}

      {!error && (
        <motion.img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
          key={`${imageUrl}-${retryCount}`}
        />
      )}
    </div>
  );
};