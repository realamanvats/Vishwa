import React from 'react';
import { Heart, Users, Calendar, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-rose-500 mr-4 fill-current" />
            <h1 className="text-5xl font-bold text-gray-800">About Us</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the beautiful love story of Vishwa Prakash and Sneha Singh, 
            and learn about the journey that brought them together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Couple's Story */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mr-6">
                  <Heart className="w-10 h-10 text-white fill-current" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Our Love Story</h2>
                  <p className="text-rose-500 text-lg">Vishwa Prakash & Sneha Singh</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our story began in the most unexpected way - through mutual friends at a college 
                reunion in 2020. What started as casual conversations over coffee slowly blossomed 
                into something beautiful and meaningful. Vishwa's sense of humor perfectly 
                complemented Sneha's thoughtful nature, creating a bond that grew stronger with each passing day.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Through late-night phone calls, weekend adventures, and shared dreams, we discovered 
                that we were not just falling in love, but becoming best friends. Our relationship 
                weathered challenges and celebrated victories together, always supporting each other's 
                goals and aspirations.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                After three wonderful years of dating, Vishwa proposed to Sneha during a romantic 
                sunset at their favorite spot by the lake. Now, we're excited to begin this new 
                chapter of our lives together, surrounded by the love and blessings of our families and friends.
              </p>
            </div>

            {/* Individual Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vishwa's Profile */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <img
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Vishwa Prakash"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-800">Vishwa Prakash</h3>
                  <p className="text-rose-500">The Groom</p>
                </div>
                
                <div className="space-y-3 text-gray-600">
                  <p><strong>Profession:</strong> Software Engineer</p>
                  <p><strong>Hobbies:</strong> Photography, Travel, Cooking</p>
                  <p><strong>Favorite Quote:</strong> "Love is not about finding the perfect person, but learning to see an imperfect person perfectly."</p>
                </div>
              </div>

              {/* Sneha's Profile */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <img
                    src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Sneha Singh"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-800">Sneha Singh</h3>
                  <p className="text-rose-500">The Bride</p>
                </div>
                
                <div className="space-y-3 text-gray-600">
                  <p><strong>Profession:</strong> Marketing Manager</p>
                  <p><strong>Hobbies:</strong> Reading, Dancing, Gardening</p>
                  <p><strong>Favorite Quote:</strong> "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."</p>
                </div>
              </div>
            </div>

            {/* Wedding Philosophy */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Wedding Vision</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Heart className="w-6 h-6 text-rose-500 mr-4 mt-1 flex-shrink-0 fill-current" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Love & Togetherness</h3>
                    <p className="text-gray-600">
                      Our wedding is a celebration of the love we share and the commitment we make 
                      to support each other through all of life's adventures.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-rose-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Family & Friends</h3>
                    <p className="text-gray-600">
                      We believe that the people we love are the foundation of our happiness. 
                      Our wedding is as much about celebrating with them as it is about our union.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-rose-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Traditions & Memories</h3>
                    <p className="text-gray-600">
                      We honor the traditions that have shaped us while creating new memories 
                      that will be cherished for generations to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Wedding Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Wedding Details</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-rose-400 pl-4">
                  <p className="text-rose-500 font-semibold">Engagement</p>
                  <p className="text-gray-600 text-sm">December 15, 2024</p>
                  <p className="text-gray-600 text-sm">Hotel Grand Palace</p>
                </div>
                <div className="border-l-4 border-rose-400 pl-4">
                  <p className="text-rose-500 font-semibold">Mehendi & Sangeet</p>
                  <p className="text-gray-600 text-sm">December 20, 2024</p>
                  <p className="text-gray-600 text-sm">Banquet Hall, CP</p>
                </div>
                <div className="border-l-4 border-rose-400 pl-4">
                  <p className="text-rose-500 font-semibold">Wedding Ceremony</p>
                  <p className="text-gray-600 text-sm">December 22, 2024</p>
                  <p className="text-gray-600 text-sm">Sacred Heart Temple</p>
                </div>
                <div className="border-l-4 border-rose-400 pl-4">
                  <p className="text-rose-500 font-semibold">Reception</p>
                  <p className="text-gray-600 text-sm">December 23, 2024</p>
                  <p className="text-gray-600 text-sm">The Leela Palace</p>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-6 border border-rose-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Fun Facts About Us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">First date: Coffee at Café Mocha</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Favorite activity: Weekend hiking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Dream destination: Japan</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Shared hobby: Cooking together</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                  <span className="text-gray-700">Years together: 3 beautiful years</span>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">Thank You</h3>
              <p className="text-rose-100">
                We are incredibly grateful for all the love, support, and blessings 
                from our families and friends. Your presence in our lives makes our 
                journey even more meaningful and joyful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;