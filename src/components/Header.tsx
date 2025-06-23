import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Upload } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMonkey, setActiveMonkey] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/film', label: 'Our Story' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/upload', label: 'Share Memories', icon: Upload }
  ];

  // Find current nav index for initial monkey position
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    setActiveMonkey(currentIndex >= 0 ? currentIndex : null);
  }, [location.pathname]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-amber-50/80 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="w-8 h-8 text-rose-600 group-hover:text-rose-700 transition-colors fill-current" />
              </motion.div>
              <div className="text-center">
                <span className="text-2xl font-bold text-rose-800 group-hover:text-rose-700 transition-colors block leading-tight font-serif">
                  Vishwa & Sneha
                </span>
                <span className="text-xs text-amber-600 group-hover:text-amber-500 transition-colors tracking-widest">
                  FOREVER TOGETHER
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation with Jumping Monkey */}
          <div className="hidden md:flex items-center">
            <nav className="flex relative h-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  className="relative h-full px-2"
                  onHoverStart={() => setActiveMonkey(index)}
                  onHoverEnd={() => {
                    const currentIndex = navItems.findIndex(i => i.path === location.pathname);
                    setActiveMonkey(currentIndex >= 0 ? currentIndex : null);
                  }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 h-full text-sm font-medium transition-all duration-200 relative z-20 ${
                      location.pathname === item.path
                        ? 'text-rose-600 font-bold'
                        : isScrolled 
                          ? 'text-rose-800 hover:text-rose-600' 
                          : 'text-white hover:text-rose-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Monkey that jumps between items - NOW VISIBLE */}
              <AnimatePresence>
                {activeMonkey !== null && (
                  <motion.div
                    className="absolute -top-8 z-30 pointer-events-none"
                    style={{ left: `${activeMonkey * 96 + 48}px` }} // Adjusted positioning
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ 
                      y: [-30, -50, -30],
                      opacity: 1,
                    }}
                    transition={{ 
                      y: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <svg 
                        width="32" 
                        height="32" 
                        viewBox="0 0 24 24" 
                        className="text-amber-600 fill-current"
                      >
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M8.5,8C9.3,8 10,8.7 10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8M19,16V15.5C19,14.7 18.3,14 17.5,14H6.5C5.7,14 5,14.7 5,15.5V16C5,17.1 5.9,18 7,18H17C18.1,18 19,17.1 19,16M16,12V10.5C16,9.7 15.3,9 14.5,9H9.5C8.7,9 8,9.7 8,10.5V12H16Z" />
                        <path d="M9,16C9,16.55 9.45,17 10,17H14C14.55,17 15,16.55 15,16V15H9V16Z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-full ${
              isScrolled ? 'bg-rose-100 text-rose-700' : 'bg-white/30 text-white backdrop-blur-sm'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-rose-100 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="px-4 py-4 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-rose-100 text-rose-700'
                          : 'text-rose-800 hover:bg-rose-50'
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4 mr-3" />}
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          className="ml-auto"
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity 
                          }}
                        >
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            className="text-amber-600 fill-current"
                          >
                            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M8.5,8C9.3,8 10,8.7 10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8M19,16V15.5C19,14.7 18.3,14 17.5,14H6.5C5.7,14 5,14.7 5,15.5V16C5,17.1 5.9,18 7,18H17C18.1,18 19,17.1 19,16M16,12V10.5C16,9.7 15.3,9 14.5,9H9.5C8.7,9 8,9.7 8,10.5V12H16Z" />
                          </svg>
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;