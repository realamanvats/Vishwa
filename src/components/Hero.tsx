import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Camera, Heart, Sparkles, Star, Flower2, Lamp } from 'lucide-react';
import BackgroundImage from '../file/DSC_4243.JPG';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickEffects, setClickEffects] = useState<Array<{id: number, x: number, y: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  let clickId = 0;

  // Enhanced particles with Indian wedding elements
  const [particles] = useState(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      type: Math.floor(Math.random() * 4) // 0: heart, 1: sparkle, 2: flower, 3: diya
    }))
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // More subtle 3D tilt effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      mouseX.set(x * 0.7); // Reduced sensitivity
      mouseY.set(y * 0.7);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle click effects
  const handleClick = (e: React.MouseEvent) => {
    // Only trigger if clicking on background (not buttons or other elements)
    if (e.target === containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setClickEffects(prev => [
        ...prev,
        { id: clickId++, x, y }
      ]);
      
      // Remove after animation completes
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== clickId-1));
      }, 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.96
    }
  };

  // Click effect variants
  const clickEffectVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: { 
      scale: [0, 1, 1.5], 
      opacity: [1, 0.8, 0],
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-default"
      ref={containerRef}
      onClick={handleClick}
    >
      {/* Background with subtle 3D effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </motion.div>
      </motion.div>

      {/* Sari fabric-like animated elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-gradient-to-r from-rose-500/20 to-pink-600/20"
            style={{
              width: `${Math.random() * 30 + 70}%`,
              left: `${Math.random() * 30}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Enhanced particles with Indian elements */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(particle.id) * 40], // More subtle movement
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, particle.type === 3 ? 360 : 180] // Diya lamps rotate fully
            }}
            transition={{
              duration: particle.speed * 8, // Slower movement
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {particle.type === 0 ? (
              <Heart className={`w-${Math.floor(particle.size)} h-${Math.floor(particle.size)} text-rose-300 fill-current`} />
            ) : particle.type === 1 ? (
              <Sparkles className={`w-${Math.floor(particle.size)} h-${Math.floor(particle.size)} text-yellow-300`} />
            ) : particle.type === 2 ? (
              <Flower2 className={`w-${Math.floor(particle.size)} h-${Math.floor(particle.size)} text-yellow-400 fill-current`} />
            ) : (
              <Lamp className={`w-${Math.floor(particle.size)} h-${Math.floor(particle.size)} text-amber-300`} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Click effects - flower showers */}
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="absolute pointer-events-none z-20"
            style={{
              left: effect.x,
              top: effect.y,
              originX: 0.5,
              originY: 0.5
            }}
            variants={clickEffectVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: 0,
                  top: 0
                }}
                animate={{
                  x: Math.sin(i * 0.4) * 200,
                  y: Math.cos(i * 0.4) * 200 + 100,
                  rotate: [0, 360],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: Math.random() * 0.3
                }}
              >
                <Flower2 className={`w-6 h-6 ${i % 2 === 0 ? 'text-yellow-400' : 'text-rose-400'} fill-current`} />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Elegant cursor with mehndi-inspired design */}
      <motion.div
        className="absolute pointer-events-none z-10 w-16 h-16"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <path
              d="M32 12C20 12 12 20 12 32s8 20 20 20 20-8 20-20S44 12 32 12zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"
              fill="none"
              stroke="rgba(244, 63, 94, 0.8)"
              strokeWidth="2"
            />
            <path
              d="M32 16c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 28c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z"
              fill="none"
              stroke="rgba(244, 63, 94, 0.6)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col min-h-screen pt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mehndi-inspired decorative element */}
        <motion.div className="mb-6" variants={itemVariants}>
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotateZ: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-block"
          >
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              className="text-rose-400 fill-current mx-auto drop-shadow-2xl"
            >
              <path d="M60 20C40 20 20 40 20 60s20 40 40 40 40-20 40-40S80 20 60 20zm0 70c-16.6 0-30-13.4-30-30S43.4 30 60 30s30 13.4 30 30-13.4 30-30 30z"/>
              <path d="M60 35c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 45c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/>
              <path d="M60 45c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Title with elegant typography */}
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight"
          variants={itemVariants}
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 30px rgba(244, 63, 94, 0.4)',
            fontFamily: "'Playfair Display', serif"
          }}
        >
          <span className="block">Vishwa & Sneha</span>
        </motion.h1>

        {/* Subtitle with fade-in effect */}
        <motion.p 
          className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Together Forever • 15th November 2023
        </motion.p>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow" />

        {/* Enhanced 3D buttons with Indian motifs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          variants={containerVariants}
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/film"
              className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-rose-500/30 overflow-hidden"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {/* 3D effect layer */}
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Our Love Story
              </span>
              
              {/* Decorative border */}
              <span className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></span>
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/events"
              className="group relative inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 font-bold text-lg rounded-2xl transition-all duration-300 overflow-hidden"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {/* 3D effect layer */}
              <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <Calendar className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Wedding Events
              </span>
              
              {/* Decorative pattern */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <svg width="100%" height="100%" className="text-white">
                  <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor"></circle>
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
                </svg>
              </span>
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/gallery"
              className="group relative inline-flex items-center px-10 py-5 bg-rose-500/10 backdrop-blur-md border-2 border-rose-400/50 text-rose-300 hover:bg-rose-400 hover:text-white font-bold text-lg rounded-2xl transition-all duration-300 overflow-hidden"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {/* 3D effect layer */}
              <span className="absolute inset-0 bg-gradient-to-b from-rose-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <Camera className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Photo Gallery
              </span>
              
              {/* Animated floral pattern */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <svg width="100%" height="100%" className="text-rose-300">
                  <pattern id="floral" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M20 10 Q25 5 30 10 T40 20 T30 30 T20 40 T10 30 T0 20 T10 10 T20 10" fill="none" stroke="currentColor" strokeWidth="1"></path>
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#floral)"></rect>
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;