import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Video } from '../utils/types';
import GoogleDriveVideo from './GoogleDriveVideo';

interface VideoGalleryProps {
  videos: Video[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  const renderVideo = (video: Video) => {
    // If it's a Google Drive video, use the specialized component
    if (video.platform === 'google-drive' || video.embedUrl.includes('drive.google.com')) {
      return (
        <GoogleDriveVideo
          key={video.id}
          driveUrl={video.embedUrl}
          title={video.title}
          description={video.description}
          thumbnail={video.thumbnail}
        />
      );
    }

    // Standard YouTube/Vimeo video handling
    return (
      <div key={video.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
        <div className="relative">
          {playingVideo === video.id ? (
            <div className="aspect-video">
              <iframe
                src={`${video.embedUrl}?autoplay=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div 
                className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                <Clock className="w-3 h-3 inline mr-1" />
                {video.duration}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm">
            {video.description}
          </p>
          {playingVideo === video.id && (
            <button
              onClick={() => setPlayingVideo(null)}
              className="mt-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
            >
              Close Video
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map(renderVideo)}
    </div>
  );
};

export default VideoGallery;