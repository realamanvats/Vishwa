import React, { useState } from 'react';
import { Play, ExternalLink, AlertTriangle } from 'lucide-react';
import { convertDriveUrlToEmbed, getDriveThumbnail, extractFileId } from '../utils/googleDriveHelper';

interface GoogleDriveVideoProps {
  driveUrl: string;
  title: string;
  description?: string;
  thumbnail?: string;
  className?: string;
}

const GoogleDriveVideo: React.FC<GoogleDriveVideoProps> = ({
  driveUrl,
  title,
  description,
  thumbnail,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fileId = extractFileId(driveUrl);
  const embedUrl = fileId ? convertDriveUrlToEmbed(driveUrl) : null;
  const autoThumbnail = fileId ? getDriveThumbnail(fileId) : null;
  const displayThumbnail = thumbnail || autoThumbnail;

  const handlePlay = () => {
    if (!embedUrl) {
      setHasError(true);
      return;
    }
    setIsPlaying(true);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-800 rounded-xl overflow-hidden ${className}`}>
        <div className="aspect-video bg-gray-700 flex items-center justify-center">
          <div className="text-center p-8">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Video Unavailable</h3>
            <p className="text-gray-400 text-sm mb-4">
              This Google Drive video may be private or the link is invalid.
            </p>
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Google Drive
            </a>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold">{title}</h3>
          {description && (
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ${className}`}>
      <div className="relative">
        {isPlaying && embedUrl ? (
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video relative cursor-pointer" onClick={handlePlay}>
            {displayThumbnail ? (
              <img
                src={displayThumbnail}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setHasError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Google Drive Video</p>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="mt-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
          >
            Close Video
          </button>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Google Drive</span>
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleDriveVideo;