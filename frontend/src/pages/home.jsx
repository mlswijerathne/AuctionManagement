import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Car, Gauge, Trophy } from 'lucide-react';
import homeBg from '../assets/home.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={homeBg} 
          alt="Luxury cars"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8">
              Discover Exceptional Cars at Auction
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto mb-12">
              Join exclusive auctions featuring premium, luxury, and classic vehicles from trusted sellers worldwide.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2">                
                Start Bidding
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/allauctions')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-200"
              >
                View All Auctions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Car className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Premium Selection</h3>
            <p className="text-gray-600">Curated collection of exceptional vehicles from trusted sellers worldwide.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Gauge className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Smart Bidding</h3>
            <p className="text-gray-600">Real-time updates and automated bidding to help you win your dream car.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Verified Quality</h3>
            <p className="text-gray-600">Each vehicle undergoes thorough inspection and verification process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;