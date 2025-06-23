import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, ImageOff } from 'lucide-react';

interface WeddingImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  retryLimit?: number;
  onError?: (src: string) => void;
}

export const WeddingImageLoader = ({ 
  src, 
  alt, 
  className = '', 
  retryLimit = 2,
  onError
}: WeddingImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (retryCount < retryLimit) {
      // Auto-retry after a short delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setError(false);
      }, 1000 * (retryCount + 1));
    } else {
      setError(true);
      onError?.(src);
    }
  };

  const handleRetry = () => {
    setError(false);
    setRetryCount(0);
  };

  return (
    <div className={`relative aspect-square overflow-hidden rounded-lg ${className}`}>
      {/* Loading state */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <Heart className="text-rose-300 animate-pulse" size={24} />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2 p-4">
          <ImageOff className="text-gray-400" size={24} />
          <span className="text-gray-500 text-sm text-center">Image failed to load</span>
          <button 
            onClick={handleRetry}
            className="mt-2 text-sm flex items-center gap-1 text-rose-500 hover:text-rose-600"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      )}

      {/* Image - only render if not in error state */}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          key={`${src}-${retryCount}`} // Force re-render on retry
        />
      )}
    </div>
  );
};