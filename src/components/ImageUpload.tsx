import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Check, AlertCircle, Link as LinkIcon, Video, Save, Trash2, Loader } from 'lucide-react';

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

const ImageUpload: React.FC = () => {
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ceremony');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'ceremony', label: 'Wedding Ceremony' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'reception', label: 'Reception' },
    { value: 'pre-wedding', label: 'Pre-Wedding' },
    { value: 'family', label: 'Family Moments' },
    { value: 'friends', label: 'Friends & Fun' },
    { value: 'candid', label: 'Candid Shots' }
  ];

  // Load saved media from localStorage on component mount
  useEffect(() => {
    const savedMedia = localStorage.getItem('weddingMemories');
    if (savedMedia) {
      try {
        const parsedMedia = JSON.parse(savedMedia);
        setUploadedMedia(parsedMedia);
      } catch (error) {
        console.error('Error loading saved memories:', error);
      }
    }
  }, []);

  // Save media to localStorage whenever uploadedMedia changes
  useEffect(() => {
    if (uploadedMedia.length >= 0) {
      localStorage.setItem('weddingMemories', JSON.stringify(uploadedMedia));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('memoriesUpdated', { 
        detail: { memories: uploadedMedia } 
      }));
    }
  }, [uploadedMedia]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setUploadStatus('uploading');
    setIsProcessing(true);
    
    try {
      const fileArray = Array.from(files);
      
      // Process files one by one to avoid memory issues
      for (const file of fileArray) {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          // Check file size (limit to 50MB)
          if (file.size > 50 * 1024 * 1024) {
            console.warn(`File ${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Skipping.`);
            continue;
          }

          await new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
              try {
                const newMedia: UploadedMedia = {
                  id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                  type: file.type.startsWith('image/') ? 'image' : 'video',
                  url: e.target?.result as string,
                  title: file.name.split('.')[0],
                  description: '',
                  category: selectedCategory,
                  uploadedBy: uploaderName || 'Anonymous',
                  uploadDate: new Date().toLocaleDateString()
                };
                
                setUploadedMedia(prev => [...prev, newMedia]);
                resolve();
              } catch (error) {
                console.error('Error processing file:', error);
                reject(error);
              }
            };
            
            reader.onerror = () => {
              console.error('Error reading file:', file.name);
              reject(new Error('File read error'));
            };
            
            reader.readAsDataURL(file);
          });
          
          // Add small delay between files to prevent UI blocking
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      setUploadStatus('success');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('error');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setUploadStatus('idle'), 2000);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    
    setUploadStatus('uploading');
    setIsProcessing(true);
    
    try {
      const isVideo = urlInput.includes('youtube.com') || urlInput.includes('youtu.be') || 
                     urlInput.includes('vimeo.com') || urlInput.includes('drive.google.com') ||
                     urlInput.match(/\.(mp4|webm|ogg|mov|avi)$/i);
      
      const newMedia: UploadedMedia = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: isVideo ? 'video' : 'image',
        url: urlInput,
        title: titleInput || 'Shared Memory',
        description: descriptionInput,
        category: selectedCategory,
        uploadedBy: uploaderName || 'Anonymous',
        uploadDate: new Date().toLocaleDateString()
      };
      
      setUploadedMedia(prev => [...prev, newMedia]);
      setUploadStatus('success');
      
      // Reset form
      setUrlInput('');
      setTitleInput('');
      setDescriptionInput('');
      setShowUrlInput(false);
    } catch (error) {
      console.error('Error adding URL:', error);
      setUploadStatus('error');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setUploadStatus('idle'), 2000);
    }
  };

  const removeMedia = (id: string) => {
    if (deleteConfirm === id) {
      const updatedMedia = uploadedMedia.filter(media => media.id !== id);
      setUploadedMedia(updatedMedia);
      
      // Update localStorage
      if (updatedMedia.length === 0) {
        localStorage.removeItem('weddingMemories');
      } else {
        localStorage.setItem('weddingMemories', JSON.stringify(updatedMedia));
      }
      
      // Dispatch update event
      window.dispatchEvent(new CustomEvent('memoriesUpdated', { 
        detail: { memories: updatedMedia } 
      }));
      
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const updateMediaDetails = (id: string, field: 'title' | 'description' | 'category', value: string) => {
    setUploadedMedia(prev => 
      prev.map(media => 
        media.id === id ? { ...media, [field]: value } : media
      )
    );
  };

  const saveAllMemories = () => {
    localStorage.setItem('weddingMemories', JSON.stringify(uploadedMedia));
    
    // Dispatch update event
    window.dispatchEvent(new CustomEvent('memoriesUpdated', { 
      detail: { memories: uploadedMedia } 
    }));
    
    setUploadStatus('success');
    setTimeout(() => setUploadStatus('idle'), 2000);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const renderMediaPreview = (media: UploadedMedia) => {
    if (media.type === 'video') {
      if (media.url.includes('youtube.com') || media.url.includes('youtu.be')) {
        const videoId = media.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        return (
          <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            {videoId ? (
              <img 
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                alt={media.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="w-8 h-8 text-gray-400"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>';
                }}
              />
            ) : (
              <Video className="w-8 h-8 text-gray-400" />
            )}
          </div>
        );
      } else if (media.url.includes('drive.google.com')) {
        return (
          <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
            <Video className="w-8 h-8 text-rose-400" />
          </div>
        );
      } else if (media.url.startsWith('data:video/')) {
        return (
          <video 
            src={media.url} 
            className="w-24 h-24 object-cover rounded-lg"
            muted
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<div class="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center"><div class="w-8 h-8 text-gray-400"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>';
            }}
          />
        );
      } else {
        return (
          <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
        );
      }
    } else {
      return (
        <img
          src={media.url}
          alt={media.title}
          className="w-24 h-24 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkM5Ljc5IDEzLjc5IDkuNzkgMTAuMjEgMTIgOEMxNC4yMSAxMC4yMSAxNC4yMSAxMy43OSAxMiAxNloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
          }}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Upload className="w-12 h-12 text-rose-500 mr-4" />
            <h1 className="text-5xl font-bold text-gray-800">Share Your Memories</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us capture every beautiful moment! Upload your photos and videos from our 
            special celebrations to create a complete memory collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Memories</h2>
              
              {/* Uploader Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Options */}
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors"
                >
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Share via URL/Link
                </button>
              </div>

              {/* URL Input Form */}
              <AnimatePresence>
                {showUrlInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 space-y-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Paste image/video URL here (Google Drive, YouTube, etc.)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400"
                    />
                    <input
                      type="text"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="Title (optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400"
                    />
                    <textarea
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                      placeholder="Description (optional)"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400 resize-none"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUrlSubmit}
                        disabled={isProcessing}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {isProcessing ? (
                          <Loader className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Add Memory
                      </button>
                      <button
                        onClick={() => setShowUrlInput(false)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* File Upload Area */}
              <motion.div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isProcessing}
                />
                
                <AnimatePresence mode="wait">
                  {uploadStatus === 'uploading' && (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-rose-600 font-semibold">
                        {isProcessing ? 'Processing large files...' : 'Uploading...'}
                      </p>
                    </motion.div>
                  )}
                  
                  {uploadStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <Check className="w-12 h-12 text-green-500 mb-4" />
                      <p className="text-green-600 font-semibold">Memory Added!</p>
                    </motion.div>
                  )}
                  
                  {uploadStatus === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                      <p className="text-red-600 font-semibold">Upload Failed</p>
                      <p className="text-red-500 text-sm mt-1">Please try smaller files</p>
                    </motion.div>
                  )}
                  
                  {uploadStatus === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-700 font-semibold mb-2">
                        Drag & drop files here
                      </p>
                      <p className="text-gray-500 text-sm mb-4">or</p>
                      <button
                        onClick={onButtonClick}
                        disabled={isProcessing}
                        className="px-6 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                      >
                        Browse Files
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <p className="text-gray-500 text-sm mt-4 text-center">
                Supported: JPG, PNG, GIF, MP4, WebM, Google Drive, YouTube (Max 50MB each)
              </p>
            </div>
          </motion.div>

          {/* Uploaded Media Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Shared Memories ({uploadedMedia.length})
            </h2>
            
            {uploadedMedia.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-lg"
              >
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No memories shared yet</p>
                <p className="text-gray-500 text-sm">Be the first to share a beautiful moment!</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {uploadedMedia.map((media, index) => (
                    <motion.div
                      key={media.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative group">
                          {renderMediaPreview(media)}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeMedia(media.id)}
                            className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              deleteConfirm === media.id
                                ? 'bg-red-600 text-white scale-110'
                                : 'bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            {deleteConfirm === media.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </motion.button>
                          {deleteConfirm === media.id && (
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Click again to confirm
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={media.title}
                              onChange={(e) => updateMediaDetails(media.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-rose-400"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={media.description}
                              onChange={(e) => updateMediaDetails(media.id, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-rose-400 resize-none"
                              placeholder="Add a description..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category
                            </label>
                            <select
                              value={media.category}
                              onChange={(e) => updateMediaDetails(media.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-rose-400"
                            >
                              {categories.map((category) => (
                                <option key={category.value} value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                              {categories.find(cat => cat.value === media.category)?.label}
                            </span>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Shared by {media.uploadedBy}</p>
                              <p className="text-xs text-gray-500">{media.uploadDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>

        {/* Save Button */}
        {uploadedMedia.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveAllMemories}
              className="inline-flex items-center px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg rounded-full transition-colors shadow-lg hover:shadow-xl"
            >
              <Save className="w-6 h-6 mr-3" />
              Save All Memories ({uploadedMedia.length} items)
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;