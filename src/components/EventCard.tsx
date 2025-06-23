import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Event } from '../utils/types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <Heart className="w-6 h-6 text-white fill-current opacity-80" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-rose-500 mb-2 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {event.location}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-500 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.shortDescription}
        </p>
        
        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center text-rose-500 hover:text-rose-600 font-medium transition-colors group"
        >
          Learn More
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;