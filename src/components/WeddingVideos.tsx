import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Play, Heart, Calendar, MapPin, X, Pause, SkipForward, RotateCcw, Sparkles } from 'lucide-react';

interface WeddingVideo {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}

interface TiltProps {
  style: {
    transformStyle: 'preserve-3d';
    rotateX: any;
    rotateY: any;
    transform: string;
  };
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

const WeddingVideos4D: React.FC = () => {
  // Video data with Indian wedding thumbnails
  const ceremonyParts: WeddingVideo[] = [
    {
      id: 'ceremony-1',
      title: 'Baraat & Welcome',
      description: 'The groom\'s grand arrival with dhol and dancing',
      date: 'December 22, 2024',
      location: 'Taj Palace, Udaipur',
      videoUrl: 'https://drive.google.com/file/d/1xWQp_oLmVOVIrXmGhy7PQ0i5Xaqh2ksg/preview',
      duration: '15:30',
      thumbnail: 'https://drive.google.com/uc?export=view&id=10MaDpDSsMhYaE3YStbCr6vJv44NScens'
    },
    {
      id: 'ceremony-2',
      title: 'Jaimala & Varmala',
      description: 'The beautiful exchange of flower garlands',
      date: 'December 22, 2024',
      location: 'Taj Palace, Udaipur',
      videoUrl: 'https://drive.google.com/file/d/1AahoXAjwgXVvaSMPQjJXnfjp82rJBauM/preview',
      duration: '22:45',
      thumbnail: 'https://drive.google.com/uc?export=view&id=14zWn7dnQaWLAr8uZMntUzet_1xL5orA8'
    },
    {
      id: 'ceremony-3',
      title: 'Phere & Saptapadi',
      description: 'The sacred seven vows around the holy fire',
      date: 'December 22, 2024',
      location: 'Taj Palace, Udaipur',
      videoUrl: 'https://drive.google.com/file/d/1ttjh3o4d5Hf4kppRWPcUW5JYgcFb9Rdk/preview',
      duration: '18:20',
      thumbnail: 'https://drive.google.com/uc?export=view&id=18xJE2kEGNlew5lAQSdbXOPxqDrO05ws2'
    },
    {
      id: 'ceremony-4',
      title: 'Vidaai & Reception',
      description: 'Emotional farewell and grand celebration',
      date: 'December 22, 2024',
      location: 'Taj Palace, Udaipur',
      videoUrl: 'https://drive.google.com/file/d/18n9bxnLzwiqSXWA3zyNDE924rbnQajmF/preview',
      duration: '12:15',
      thumbnail: 'https://drive.google.com/uc?export=view&id=1g90KGgoYjCLubw4pJYyZUXaSaFVymIHp'
    }
  ];

  // State
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [particles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>(
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 5
    }))
  );
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      const nextPart = currentPart + 1;
      if (nextPart < ceremonyParts.length) {
        setCurrentPart(nextPart);
        setActiveVideo(`ceremony-${nextPart + 1}`);
        setVideoLoaded(false);
      } else {
        setIsAutoPlaying(false);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentPart, ceremonyParts.length]);

  // Enhanced 4D Tilt Effect with Depth
  const useTilt = (): TiltProps => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    
    return {
      style: {
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        transform: 'perspective(1000px)'
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave
    };
  };

  // Control functions
  const startAutoPlay = () => {
    setCurrentPart(0);
    setActiveVideo('ceremony-1');
    setIsAutoPlaying(true);
  };

  const stopAutoPlay = () => setIsAutoPlaying(false);
  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setActiveVideo(null);
    setCurrentPart(0);
  };

  const playVideo = (id: string) => {
    const partNumber = parseInt(id.split('-')[1]);
    setCurrentPart(partNumber - 1);
    setActiveVideo(id);
    setVideoLoaded(false);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-rose-900 to-purple-900 text-white overflow-hidden relative font-sans">
      {/* Marigold Flower Particle Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 opacity-30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.4, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative Mandala Elements */}
      <motion.div 
        className="absolute top-10 left-10 w-64 h-64 opacity-5"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1NiA0MGMxMTkuMyAwIDIxNiA5Ni43IDIxNiAyMTZzLTk2LjcgMjE2LTIxNiAyMTZTNDAgMzc1LjMgNDAgMjU2UzEzNi43IDQwIDI1NiA0MHoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1NiAxMjhjNzAuNyAwIDEyOCA1Ny4zIDEyOCAxMjhTMzI2LjcgMzg0IDI1NiAzODRTMTI4IDMyNi43IDEyOCAyNTZzNTcuMy0xMjggMTI4LTEyOHoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1NiAyMTZjMjIuMSAwIDQwLTE3LjkgNDAtNDBzLTE3LjktNDAtNDAtNDAtNDAgMTcuOS00MCA0MCAxNy45IDQwIDQwIDQweiIvPjwvc3ZnPg==')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute bottom-10 right-10 w-72 h-72 opacity-5"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1NiA0MGMxMTkuMyAwIDIxNiA5Ni43IDIxNiAyMTZzLTk2LjcgMjE2LTIxNiAyMTZTNDAgMzc1LjMgNDAgMjU2UzEzNi43IDQwIDI1NiA0MHoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1NiAxMjhjNzAuNyAwIDEyOCA1Ny4zIDEyOCAxMjhTMzI2LjcgMzg0IDI1NiAzODRTMTI4IDMyNi43IDEyOCAyNTZzNTcuMy0xMjggMTI4LTEyOHoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1NiAyMTZjMjIuMSAwIDQwLTE3LjkgNDAtNDBzLTE3LjktNDAtNDAtNDAtNDAgMTcuOS00MCA0MCAxNy45IDQwIDQwIDQweiIvPjwvc3ZnPg==')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 150,
          repeat: Infinity,
          ease: "linear",
          delay: 30
        }}
      />

      {/* Floating Diya Lights */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmY5ZTAwIiBkPSJNMjU2IDQxNmMtODguNCAwLTE2MC03MS42LTE2MC0xNjBTMTY3LjYgOTYgMjU2IDk2czE2MCA3MS42IDE2MCAxNjAtNzEuNiAxNjAtMTYwIDE2MHptMC0yODhjLTcwLjcgMC0xMjggNTcuMy0xMjggMTI4czU3LjMgMTI4IDEyOCAxMjggMTI4LTU3LjMgMTI4LTEyOC01Ny4zLTEyOC0xMjgtMTI4eiIvPjxwYXRoIGZpbGw9IiNmZmMxMDciIGQ9Ik0yNTYgNDE2Yy04OC40IDAtMTYwLTcxLjYtMTYwLTE2MFMxNjcuNiA5NiAyNTYgOTZzMTYwIDcxLjYgMTYwIDE2MC03MS42IDE2MC0xNjAgMTYwek0xMjggMjU2YzAtNzAuNyA1Ny4zLTEyOCAxMjgtMTI4czEyOCA1Ny4zIDEyOCAxMjgtNTcuMyAxMjgtMTI4IDEyOC0xMjgtNTcuMy0xMjgtMTI4eiIvPjxwYXRoIGZpbGw9IiNmZmViM2IiIGQ9Ik0yNTYgNDE2Yy04OC40IDAtMTYwLTcxLjYtMTYwLTE2MFMxNjcuNiA5NiAyNTYgOTZ2MzIwem0wLTM4NGMtNzAuNyAwLTEyOCA1cu3LTEyOCAxMjhzNTcuMyAxMjggMTI4IDEyOCAxMjgtNTcuMyAxMjgtMTI4LTU3LjMtMTI4LTEyOC0xMjh6Ii8+PC9zdmc+')",
          backgroundSize: 'contain',
          filter: 'drop-shadow(0 0 8px rgba(255, 158, 0, 0.7))'
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-20 h-20"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmY5ZTAwIiBkPSJNMjU2IDQxNmMtODguNCAwLTE2MC03MS42LTE2MC0xNjBTMTY3LjYgOTYgMjU2IDk2czE2MCA3MS42IDE2MCAxNjAtNzEuNiAxNjAtMTYwIDE2MHptMC0yODhjLTcwLjcgMC0xMjggNTcuMy0xMjggMTI4czU3LjMgMTI4IDEyOCAxMjggMTI4LTU3LjMgMTI4LTEyOC01Ny4zLTEyOC0xMjgtMTI4eiIvPjxwYXRoIGZpbGw9IiNmZmMxMDciIGQ9Ik0yNTYgNDE2Yy04OC40IDAtMTYwLTcxLjYtMTYwLTE2MFMxNjcuNiA5NiAyNTYgOTZzMTYwIDcxLjYgMTYwIDE2MC03MS42IDE2MC0xNjAgMTYwek0xMjggMjU2YzAtNzAuNyA1Ny43LTEyOCAxMjgtMTI4czEyOCA1Ny4zIDEyOCAxMjgtNTcuMyAxMjgtMTI4IDEyOC0xMjgtNTcuMy0xMjgtMTI4eiIvPjxwYXRoIGZpbGw9IiNmZmViM2IiIGQ9Ik0yNTYgNDE2Yy04OC40IDAtMTYwLTcxLjYtMTYwLTE2MFMxNjcuNiA9NiAyNTYgOTZ2MzIwem0wLTM4NGMtNzAuNyAwLTEyOCA1Ny4zLTEyOCAxMjhzNTcuMyAxMjggMTI4IDEyOCAxMjgtNTcuMyAxMjgtMTI4LTU3LjMtMTI4LTEyOC0xMjh6Ii8+PC9zdmc+')",
          backgroundSize: 'contain',
          filter: 'drop-shadow(0 0 8px rgba(255, 158, 0, 0.7))'
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Indian motifs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-repeat-x" 
               style={{
                 backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmY5ZTAwIiBkPSJNMjU2IDQxNmMtODguNCAwLTE2MC03MS42LTE2MC0xNjBTMTY3LjYgOTYgMjU2IDk2czE2MCA3MS42IDE2MCAxNjAtNzEuNiAxNjAtMTYwIDE2MHptMC0yODhjLTcwLjcgMC0xMjggNTcuMy0xMjggMTI4czU3LjMgMTI4IDEyOCAxMjggMTI4LTU3LjMgMTI4LTEyOC01Ny4zLTEyOC0xMjgtMTI4eiIvPjwvc3ZnPg==')",
                 backgroundSize: '32px 16px',
                 opacity: 0.6
               }}></div>
          
          <motion.div
            className="flex items-center justify-center mb-6"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-16 h-16 text-rose-400 mr-6 fill-current drop-shadow-lg" />
            <h1 className="text-5xl md:text-6xl font-bold font-serif tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300">
              Our <span className="text-rose-300">Wedding</span> Journey
            </h1>
          </motion.div>
          
          <p className="text-xl text-amber-100 max-w-3xl mx-auto font-light">
            Relive every sacred moment of our traditional Indian wedding
          </p>
          
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-repeat-x rotate-180" 
               style={{
                 backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmY5ZTAwIiBkPSJNMjU2IDQxNmMtODguNCAwLTE2MC03MS42LTE2MC0xNjBTMTY3LjYgOTYgMjU2IDk2czE2MCA3MS42IDE2MCAxNjAtNzEuNiAxNjAtMTYwIDE2MHptMC0yODhjLTcwLjcgMC0xMjggNTcuMy0xMjggMTI4czU3LjMgMTI4IDEyOCAxMjggMTI4LTU3LjMgMTI4LTEyOC01Ny4zLTEyOC0xMjgtMTI4eiIvPjwvc3ZnPg==')",
                 backgroundSize: '32px 16px',
                 opacity: 0.6
               }}></div>
        </motion.div>

        {/* Auto-play Controls with Indian design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 bg-white/5 backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto border border-amber-500/20 shadow-lg relative overflow-hidden"
        >
          {/* Decorative border */}
          <div className="absolute inset-0 border-2 border-transparent border-dashed rounded-xl pointer-events-none" 
               style={{
                 backgroundImage: 'linear-gradient(to right, rgba(251, 191, 36, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(251, 191, 36, 0.3) 1px, transparent 1px)',
                 backgroundSize: '20px 20px',
                 maskImage: 'linear-gradient(to bottom, transparent 5%, black 20%, black 80%, transparent 95%)'
               }}></div>
          
          <h2 className="text-2xl font-serif font-medium mb-4 text-amber-200">
            Experience Our Complete Wedding Ceremony
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={startAutoPlay}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg border border-amber-400/50 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
              <Play className="w-5 h-5 mr-2" />
              Play All Rituals
            </motion.button>
            
            {isAutoPlaying && (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(156, 163, 175, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={stopAutoPlay}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg border border-gray-500/50 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(244, 114, 182, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={resetAutoPlay}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg border border-rose-400/50 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </motion.button>
          </div>
          
          {isAutoPlaying && (
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-amber-200 mb-1 font-medium">
                <span>Part {currentPart + 1} of {ceremonyParts.length}</span>
                <span>{ceremonyParts[currentPart]?.duration}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentPart + 1) / ceremonyParts.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Current Video Display with Indian frame */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mb-12 relative"
            >
              {/* Ornamental frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-600 via-rose-600 to-purple-600 rounded-2xl opacity-30 blur-md z-0"></div>
              <div className="absolute -inset-2 border-2 border-amber-400/30 rounded-xl z-0"></div>
              
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl z-10">
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-900 to-rose-900">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                )}
                <iframe
                  ref={videoRef}
                  src={ceremonyParts[currentPart].videoUrl}
                  className={`w-full h-full ${videoLoaded ? 'block' : 'hidden'}`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  onLoad={() => setVideoLoaded(true)}
                />
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-6 bg-gradient-to-br from-amber-900/60 to-rose-900/60 backdrop-blur-md rounded-xl border border-amber-500/20 shadow-lg relative"
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/50"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/50"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/50"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-amber-100 mb-1">
                      {ceremonyParts[currentPart].title}
                    </h3>
                    <p className="text-amber-200">{ceremonyParts[currentPart].description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveVideo(null)}
                    className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-700 rounded-full flex items-center justify-center shadow-md border border-rose-400/50"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap items-center text-amber-200 mt-4 gap-y-2">
                  <div className="flex items-center mr-6">
                    <Calendar className="w-5 h-5 mr-2 text-amber-300" />
                    <span>{ceremonyParts[currentPart].date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-amber-300" />
                    <span>{ceremonyParts[currentPart].location}</span>
                  </div>
                </div>
                
                {isAutoPlaying && currentPart < ceremonyParts.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const nextPart = currentPart + 1;
                      setCurrentPart(nextPart);
                      setActiveVideo(`ceremony-${nextPart + 1}`);
                      setVideoLoaded(false);
                    }}
                    className="mt-4 flex items-center text-amber-300 hover:text-white transition-colors"
                  >
                    Skip to Next Ritual <SkipForward className="w-5 h-5 ml-1" />
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Gallery with Enhanced 4D Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {ceremonyParts.map((part, index) => {
            const tilt = useTilt();
            
            return (
              <motion.div
                key={part.id}
                {...tilt}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl overflow-hidden cursor-pointer shadow-lg ${
                  activeVideo === part.id ? 'ring-4 ring-amber-400' : ''
                }`}
                onClick={() => playVideo(part.id)}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px)'
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-rose-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity z-10" />
                
                {/* Thumbnail image */}
                <div className="relative aspect-video">
                  <img
                    src={part.thumbnail}
                    alt={part.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 5px 15px rgba(251, 191, 36, 0.3)',
                          '0 10px 25px rgba(251, 191, 36, 0.5)',
                          '0 5px 15px rgba(251, 191, 36, 0.3)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs px-2 py-1 rounded shadow-md z-20">
                    Part {index + 1}
                  </div>
                </div>
                
                {/* Video info */}
                <div className="p-4 bg-gradient-to-b from-gray-900/90 to-gray-900 relative z-10">
                  <h3 className="font-medium text-white">{part.title}</h3>
                  <p className="text-sm text-amber-200 mt-1">{part.duration}</p>
                </div>
                
                {/* Floating diya light */}
                <motion.div 
                  className="absolute top-3 right-3 text-amber-300 z-20"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -5, -10],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.5, 1]
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.7))'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115l-.78 2.77h11.782l-.78-2.77c2.367-1.295 3.889-3.558 3.889-6.115 0-3.93-4.03-7.115-9-7.115zm0 2c3.87 0 7 2.14 7 5.115 0 1.67-.96 3.157-2.45 4.15l-.55.35.2.6.6 2.15h-9.6l.6-2.15.2-.6-.55-.35c-1.49-.993-2.45-2.48-2.45-4.15 0-2.975 3.13-5.115 7-5.115zm-5 15h10v2h-10v-2z"/>
                  </svg>
                </motion.div>
                
                {/* Subtle shadow for depth */}
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_5px_rgba(0,0,0,0.3)] pointer-events-none"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default WeddingVideos4D;