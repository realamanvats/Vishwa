import React, { useState, useEffect } from 'react';
import PhotoGallery from '../components/PhotoGallery';
import VideoGallery from '../components/VideoGallery';
import WeddingVideos from '../components/WeddingVideos';
import { photoAlbums, videos } from '../utils/data';
import { Camera, Video, Grid, Upload, AlertCircle, Heart, Play, Pause, Trash2, Check } from 'lucide-react';

interface UploadedMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploadedMemories, setUploadedMemories] = useState<UploadedMedia[]>([]);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load uploaded memories from localStorage
  useEffect(() => {
    const loadMemories = () => {
      const savedMemories = localStorage.getItem('weddingMemories');
      if (savedMemories) {
        try {
          const parsedMemories = JSON.parse(savedMemories);
          setUploadedMemories(parsedMemories);
        } catch (error) {
          console.error('Error loading memories:', error);
        }
      }
    };

    loadMemories();

    // Listen for memory updates
    const handleMemoriesUpdate = (event: CustomEvent) => {
      setUploadedMemories(event.detail.memories);
    };

    window.addEventListener('memoriesUpdated', handleMemoriesUpdate as EventListener);

    return () => {
      window.removeEventListener('memoriesUpdated', handleMemoriesUpdate as EventListener);
    };
  }, []);

  // Separate uploaded memories by type
  const uploadedPhotos = uploadedMemories.filter(memory => memory.type === 'image');
  const uploadedVideos = uploadedMemories.filter(memory => memory.type === 'video');

  // Delete memory function
  const deleteMemory = (memoryId: string) => {
    if (deleteConfirm === memoryId) {
      const updatedMemories = uploadedMemories.filter(memory => memory.id !== memoryId);
      setUploadedMemories(updatedMemories);
      
      // Update localStorage
      if (updatedMemories.length === 0) {
        localStorage.removeItem('weddingMemories');
      } else {
        localStorage.setItem('weddingMemories', JSON.stringify(updatedMemories));
      }
      
      // Dispatch update event
      window.dispatchEvent(new CustomEvent('memoriesUpdated', { 
        detail: { memories: updatedMemories } 
      }));
      
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(memoryId);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  // Delete photo from album
  const deletePhotoFromAlbum = (albumId: string, imageIndex: number) => {
    if (albumId.startsWith('uploaded-')) {
      const category = albumId.replace('uploaded-', '');
      const photosInCategory = uploadedPhotos.filter(photo => photo.category === category);
      if (photosInCategory[imageIndex]) {
        deleteMemory(photosInCategory[imageIndex].id);
      }
    }
  };

  // Create dynamic photo albums from uploaded photos
  const createDynamicAlbums = () => {
    const albumsByCategory: { [key: string]: UploadedMedia[] } = {};
    
    uploadedPhotos.forEach(photo => {
      if (!albumsByCategory[photo.category]) {
        albumsByCategory[photo.category] = [];
      }
      albumsByCategory[photo.category].push(photo);
    });

    return Object.entries(albumsByCategory).map(([category, photos]) => ({
      id: `uploaded-${category}`,
      title: `Uploaded ${getCategoryLabel(category)}`,
      category,
      description: `Beautiful moments shared by our guests - ${getCategoryLabel(category)}`,
      thumbnail: photos[0]?.url || '',
      images: photos.map(photo => photo.url)
    }));
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'ceremony': 'Wedding Ceremony',
      'engagement': 'Engagement',
      'reception': 'Reception',
      'pre-wedding': 'Pre-Wedding',
      'family': 'Family Moments',
      'friends': 'Friends & Fun',
      'candid': 'Candid Shots'
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Combine default albums with uploaded albums
  const dynamicAlbums = createDynamicAlbums();
  const allAlbums = [...photoAlbums, ...dynamicAlbums];

  const categories = ['all', ...Array.from(new Set(allAlbums.map(album => album.category)))];
  const filteredAlbums = selectedCategory === 'all' 
    ? allAlbums 
    : allAlbums.filter(album => album.category === selectedCategory);

  // Convert uploaded videos to Video format for VideoGallery
  const convertedUploadedVideos = uploadedVideos.map(video => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.url.includes('youtube.com') || video.url.includes('youtu.be') 
      ? `https://img.youtube.com/vi/${video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]}/mqdefault.jpg`
      : 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    embedUrl: video.url,
    duration: '0:00',
    platform: video.url.includes('drive.google.com') ? 'google-drive' as const : 'youtube' as const
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-rose-500 mr-4 fill-current" />
            <h1 className="text-5xl font-bold text-gray-800">Wedding Gallery</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Relive the beautiful moments of our wedding journey through our curated collection 
            of photographs and videos capturing every smile, tear of joy, and celebration.
          </p>
        </div>

        {/* Share Memories CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 mb-12 text-white text-center">
          <Upload className="w-8 h-8 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Have photos or videos from our wedding?</h3>
          <p className="text-rose-100 mb-4">Help us complete our memory collection by sharing your captures!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/upload"
              className="inline-flex items-center px-6 py-3 bg-white text-rose-600 font-semibold rounded-full hover:bg-rose-50 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Share Your Memories
            </a>
            {uploadedMemories.length > 0 && (
              <span className="text-rose-100 text-sm">
                {uploadedMemories.length} memories shared so far!
              </span>
            )}
          </div>
        </div>

        {/* Wedding Videos Section - Always visible */}
        <WeddingVideos uploadedVideos={convertedUploadedVideos.filter(video => 
          video.embedUrl.includes('drive.google.com') || 
          ['engagement', 'ceremony'].includes(uploadedMemories.find(m => m.id === video.id)?.category || '')
        )} />

        {/* Global Auto-play Control */}
        <div className="flex justify-center mb-8 mt-20">
          <button
            onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
              autoPlayEnabled 
                ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
            }`}
          >
            {autoPlayEnabled ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Disable Auto-play for All Albums
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Enable Auto-play for All Albums
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 flex shadow-lg">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'photos'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Camera className="w-5 h-5 mr-2" />
              Photos ({allAlbums.reduce((total, album) => total + album.images.length, 0)})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'videos'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Video className="w-5 h-5 mr-2" />
              Videos ({videos.length + uploadedVideos.length})
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        {activeTab === 'photos' && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {category === 'all' ? 'All Photos' : getCategoryLabel(category)}
                </button>
              ))}
            </div>

            {/* Photo Albums */}
            <div className="space-y-16">
              {filteredAlbums.length > 0 ? (
                filteredAlbums.map((album) => (
                  <div key={album.id} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="mb-8 flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{album.title}</h2>
                        <p className="text-gray-600 text-lg">{album.description}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">
                          {getCategoryLabel(album.category)}
                        </span>
                      </div>
                      
                      {/* Delete album button for uploaded albums */}
                      {album.id.startsWith('uploaded-') && (
                        <button
                          onClick={() => {
                            const category = album.id.replace('uploaded-', '');
                            const photosInCategory = uploadedPhotos.filter(photo => photo.category === category);
                            photosInCategory.forEach(photo => deleteMemory(photo.id));
                          }}
                          className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Album
                        </button>
                      )}
                    </div>
                    <PhotoGallery 
                      images={album.images} 
                      title={album.title} 
                      autoPlay={autoPlayEnabled}
                      onDelete={album.id.startsWith('uploaded-') ? (imageIndex) => deletePhotoFromAlbum(album.id, imageIndex) : undefined}
                      showDeleteButton={album.id.startsWith('uploaded-')}
                    />
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No photos in this category yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share photos from this category!</p>
                  <a
                    href="/upload"
                    className="inline-flex items-center px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photos
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Gallery */}
        {activeTab === 'videos' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">All Wedding Videos</h2>
              <p className="text-gray-600 text-lg">
                Experience the emotions and joy of our wedding through these beautiful video memories, 
                from our love story to the celebration highlights and guest-shared moments.
              </p>
            </div>
            
            {/* Combined Videos */}
            <div className="space-y-12">
              {/* Default Videos */}
              {videos.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Official Wedding Videos</h3>
                  <VideoGallery videos={videos} />
                </div>
              )}

              {/* Uploaded Videos */}
              {uploadedVideos.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Guest Shared Videos ({uploadedVideos.length})</h3>
                    <button
                      onClick={() => {
                        uploadedVideos.forEach(video => deleteMemory(video.id));
                      }}
                      className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All Videos
                    </button>
                  </div>
                  
                  {/* Individual video delete buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {uploadedVideos.map((video) => (
                      <div key={video.id} className="relative">
                        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                          <div className="relative">
                            <img
                              src={video.url.includes('youtube.com') || video.url.includes('youtu.be') 
                                ? `https://img.youtube.com/vi/${video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]}/mqdefault.jpg`
                                : 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'}
                              alt={video.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-8 h-8 text-white ml-1" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                              {video.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {video.description}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-gray-500">Shared by {video.uploadedBy}</span>
                              <span className="text-xs text-gray-500">{video.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Delete button */}
                        <button
                          onClick={() => deleteMemory(video.id)}
                          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            deleteConfirm === video.id
                              ? 'bg-red-600 text-white scale-110'
                              : 'bg-red-500 hover:bg-red-600 text-white opacity-80 hover:opacity-100'
                          }`}
                        >
                          {deleteConfirm === video.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                        
                        {deleteConfirm === video.id && (
                          <div className="absolute top-14 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Click again to confirm
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No videos message */}
              {videos.length === 0 && uploadedVideos.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No videos shared yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share a video memory!</p>
                  <a
                    href="/upload"
                    className="inline-flex items-center px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Videos
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;