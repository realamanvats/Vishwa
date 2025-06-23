import React from 'react';
import EventCard from '../components/EventCard';
import { events } from '../utils/data';
import { Calendar, Heart } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-rose-500 mr-4" />
            <h1 className="text-5xl font-bold text-gray-800">Wedding Events</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in celebrating our love story through a series of beautiful ceremonies and 
            festivities. Each event is a special milestone in our journey to forever.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Wedding Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Wedding Timeline</h2>
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={event.id} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-rose-500 font-semibold mb-2">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} • {event.location}
                  </p>
                  <p className="text-gray-600">{event.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-8 max-w-4xl mx-auto text-white">
            <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
            <h2 className="text-2xl font-bold mb-4">Join Our Celebration</h2>
            <p className="text-rose-100 mb-6 text-lg">
              Your presence would make our special days even more meaningful. We can't wait to 
              celebrate with all our loved ones and create beautiful memories together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-rose-600 font-semibold rounded-full hover:bg-rose-50 transition-colors"
              >
                RSVP Now
              </a>
              <a
                href="/upload"
                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-rose-600 font-semibold rounded-full transition-all"
              >
                Share Your Memories
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;