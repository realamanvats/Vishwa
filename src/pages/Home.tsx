import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import WeddingVideos from '../components/WeddingVideos';
import AnimatedSection from '../components/AnimatedSection';
import { events, videos } from '../utils/data';
import { Play, ArrowRight, Calendar, Camera, Heart, Upload } from 'lucide-react';

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

const Home: React.FC = () => {
  const [uploadedMemories, setUploadedMemories] = useState<UploadedMedia[]>([]);
  const upcomingEvents = events.slice(0, 3);
  const featuredVideo = videos[0];

  // Load uploaded memories
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  // Convert uploaded videos for WeddingVideos component
  const uploadedVideos = uploadedMemories
    .filter(memory => memory.type === 'video')
    .map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      date: video.uploadDate,
      location: 'Shared by ' + video.uploadedBy,
      driveUrl: video.url.includes('drive.google.com') ? video.url : undefined,
      embedUrl: !video.url.includes('drive.google.com') ? video.url : undefined,
      thumbnail: video.url.includes('youtube.com') || video.url.includes('youtu.be') 
        ? `https://img.youtube.com/vi/${video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]}/mqdefault.jpg`
        : undefined,
      category: video.category as 'engagement' | 'ceremony' | 'reception' | 'pre-wedding'
    }));

  return (
    <div>
      <Hero />
      
      {/* Wedding Videos Section */}
      <WeddingVideos uploadedVideos={uploadedVideos} />
      
      {/* Wedding Journey Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Wedding Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow our beautiful journey from engagement to the big day, filled with love, 
              laughter, and unforgettable memories with family and friends.
            </p>
          </AnimatedSection>

          {/* Memory Sharing Stats */}
          {uploadedMemories.length > 0 && (
            <AnimatedSection delay={0.1} className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-rose-500 mb-2">
                      {uploadedMemories.length}
                    </div>
                    <div className="text-gray-600">Memories Shared</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-rose-500 mb-2">
                      {uploadedMemories.filter(m => m.type === 'image').length}
                    </div>
                    <div className="text-gray-600">Photos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-rose-500 mb-2">
                      {uploadedMemories.filter(m => m.type === 'video').length}
                    </div>
                    <div className="text-gray-600">Videos</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors"
                  >
                    View All Memories
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Featured Video */}
          <AnimatedSection delay={0.2} className="mb-16">
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:flex">
                <div className="md:w-1/2 relative group">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(244, 63, 94, 0.4)",
                          "0 0 0 20px rgba(244, 63, 94, 0)",
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <Play className="w-10 h-10 text-white ml-1" />
                    </motion.div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{featuredVideo.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredVideo.description}</p>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      to="/gallery"
                      className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors"
                    >
                      Watch More Videos
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Upcoming Events */}
          <AnimatedSection delay={0.4}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-800">Wedding Events</h3>
              <motion.div whileHover={{ x: 5 }}>
                <Link
                  to="/events"
                  className="inline-flex items-center text-rose-500 hover:text-rose-600 font-semibold transition-colors"
                >
                  View All Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  custom={index}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Share Memories CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-12 text-white">
              <Upload className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Share Your Memories</h2>
              <p className="text-rose-100 mb-8 text-xl max-w-2xl mx-auto">
                Help us capture every beautiful moment! Upload your photos and videos from our 
                special celebrations to create a complete memory collection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/upload"
                  className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-bold text-lg rounded-full hover:bg-rose-50 transition-colors shadow-lg"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  Upload Memories
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-rose-600 font-bold text-lg rounded-full transition-all"
                >
                  <Camera className="w-6 h-6 mr-3" />
                  View Gallery
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Wedding</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover every beautiful moment of our wedding journey through photos, videos, and memories.
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants}>
              <Link
                to="/events"
                className="group block"
              >
                <motion.div
                  className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl p-8 text-center shadow-xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Calendar className="w-16 h-16 text-white mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Wedding Events</h3>
                  <p className="text-rose-100">Explore all our wedding ceremonies and celebrations</p>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Link
                to="/gallery"
                className="group block"
              >
                <motion.div
                  className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-8 text-center shadow-xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Camera className="w-16 h-16 text-white mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Photo Gallery</h3>
                  <p className="text-purple-100">Browse beautiful photos and videos from our journey</p>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Link
                to="/film"
                className="group block"
              >
                <motion.div
                  className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 text-center shadow-xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 text-white mx-auto mb-4 fill-current" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Our Love Story</h3>
                  <p className="text-orange-100">Watch the complete story of our love and journey</p>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;