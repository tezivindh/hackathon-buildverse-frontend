
import { Link } from "react-router-dom";
import { Compass, Star } from "lucide-react";
import AnimatedBackground from '../components/AnimatedBackground';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="glass-card p-12 divine-glow">
          {/* Celestial Elements */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center mx-auto mb-6 divine-glow animate-pulse-glow">
              <Compass className="text-divine-indigo" size={40} />
            </div>
            <div className="absolute -top-4 -right-4 text-divine-gold animate-star-twinkle">
              <Star size={16} />
            </div>
            <div className="absolute -bottom-2 -left-6 text-divine-lavender animate-star-twinkle" style={{ animationDelay: '1s' }}>
              <Star size={12} />
            </div>
          </div>

          {/* 404 Message */}
          <h1 className="font-cinzel text-6xl font-bold text-divine-ivory mb-4">
            404
          </h1>
          
          {/* Sacred Quote */}
          <div className="font-devanagari text-xl text-divine-lavender mb-4 animate-float">
            न हि पथस्य न प्राप्तिः अपि पथस्य भागः
          </div>
          
          <p className="text-lg text-divine-ivory mb-8 italic">
            "Even the path not found is part of the path"
          </p>
          
          <p className="text-divine-lavender/80 mb-8 leading-relaxed">
            Sometimes we must lose our way to find our true direction. 
            This page may not exist, but your spiritual journey continues.
          </p>
          
          {/* Return Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 divine-glow"
          >
            <Compass size={20} />
            <span>Return to Your Journey</span>
          </Link>
          
          {/* Mystical Quote */}
          <p className="text-divine-lavender/60 text-sm mt-8 italic">
            "In confusion, find clarity. In loss, find purpose."
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
