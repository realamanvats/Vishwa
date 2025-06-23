import React from 'react';
import { Play, Heart, Users, Clock, Calendar } from 'lucide-react';
import { castAndCrew } from '../utils/data';

const Film: React.FC = () => {
  const [showMainVideo, setShowMainVideo] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <Heart className="w-20 h-20 text-rose-400 fill-current mx-auto mb-6" />
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 font-serif">
            Our Love Story
          </h1>
          <p className="text-xl sm:text-2xl text-rose-200 mb-4 font-light">
            Vishwa & Sneha - A Journey of Hearts
          </p>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Watch the beautiful story of how two hearts found each other and decided to become one
          </p>
          
          <button 
            onClick={() => setShowMainVideo(true)}
            className="inline-flex items-center px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Play className="w-6 h-6 mr-3" />
            Watch Our Story
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Embed Section */}
        <section className="py-20">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            {showMainVideo ? (
              <div className="aspect-video">
                <iframe
                  src="https://drive.google.com/file/d/1xWQp_oLmVOVIrXmGhy7PQ0i5Xaqh2ksg/preview"
                  title="Vishwa & Sneha Love Story"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="p-4 bg-gray-50">
                  <button
                    onClick={() => setShowMainVideo(false)}
                    className="text-rose-500 hover:text-rose-600 font-medium"
                  >
                    Close Video
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <div 
                  className="w-full h-full bg-gray-100 flex items-center justify-center cursor-pointer group relative"
                  onClick={() => setShowMainVideo(true)}
                >
                  <img
                    src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Vishwa & Sneha Love Story"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform group-hover:shadow-2xl">
                        <Play className="w-12 h-12 text-white ml-1" />
                      </div>
                      <p className="text-white text-lg font-semibold">Click to watch our love story</p>
                      <p className="text-gray-200 text-sm mt-2">Duration: 8 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Story Details */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Journey Together</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  This video captures the essence of our beautiful love story - from our first meeting 
                  at a college reunion to the moment Vishwa got down on one knee. It's a testament to 
                  how two people can find their perfect match in the most unexpected circumstances.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Through candid moments, heartfelt interviews, and beautiful cinematography, we share 
                  the milestones that brought us closer together. From our first coffee date to weekend 
                  adventures, from meeting each other's families to planning our future - every moment 
                  has been a step towards this beautiful destination.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We hope this video gives you a glimpse into our hearts and the love we share. 
                  It's not just our story - it's a celebration of love, commitment, and the 
                  beautiful journey that lies ahead of us as we become husband and wife.
                </p>
              </div>

              {/* Photo Highlights */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Story Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img
                    src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="First meeting"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <img
                    src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Proposal moment"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-600 mt-6">
                  From our first meeting to the proposal - every moment has been magical and 
                  has brought us closer to our dream of spending forever together.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Video Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Story Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-rose-500" />
                    <span>Duration: 8 minutes</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-rose-500" />
                    <span>Created: 2024</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <Heart className="w-5 h-5 mr-3 text-rose-500 mt-1 fill-current" />
                    <div>
                      <p>Genre: Love Story, Documentary</p>
                      <p className="text-sm text-gray-500 mt-1">
                        A personal journey of love and commitment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured People */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured In Our Story</h3>
                <div className="space-y-4">
                  {castAndCrew.slice(0, 2).map((member, index) => (
                    <div key={index} className="flex items-center">
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                      )}
                      <div>
                        <p className="text-gray-800 font-semibold">{member.name}</p>
                        <p className="text-gray-500 text-sm">{member.role}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      Special thanks to our families and friends who made this story possible
                    </p>
                  </div>
                </div>
              </div>

              {/* Love Quotes */}
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Favorite Quote</h3>
                <blockquote className="text-rose-100 italic text-lg leading-relaxed">
                  "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage."
                </blockquote>
                <p className="text-rose-200 text-sm mt-4">- Lao Tzu</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Film;