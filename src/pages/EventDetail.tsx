import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Play } from 'lucide-react';
import PhotoGallery from '../components/PhotoGallery';
import { events } from '../utils/data';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);
  const [showVideo, setShowVideo] = React.useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
          <Link
            to="/events"
            className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation */}
        <Link
          to="/events"
          className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">About This Event</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Photo Gallery */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Event Gallery</h2>
              <PhotoGallery images={event.images} title={event.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Event Details */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-orange-400" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-orange-400" />
                  {event.location}
                </div>
              </div>
            </div>

            {/* Video Section */}
            {event.videoUrl && (
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Event Video</h3>
                <div className="relative">
                  {showVideo ? (
                    <div className="aspect-video">
                      <iframe
                        src={`${event.videoUrl}?autoplay=1`}
                        title={`${event.title} Video`}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <button
                        onClick={() => setShowVideo(false)}
                        className="mt-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
                      >
                        Close Video
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="aspect-video bg-gray-700 rounded-lg overflow-hidden cursor-pointer group relative"
                      onClick={() => setShowVideo(true)}
                    >
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Share This Event</h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Facebook
                </button>
                <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-colors">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;