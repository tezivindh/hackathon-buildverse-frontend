
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cosmic particles */}
      <div className="cosmic-particles absolute inset-0 opacity-70"></div>
      
      {/* Mandala background */}
      <div className="mandala-bg absolute inset-0 opacity-20"></div>
      
      {/* Floating Sanskrit symbols */}
      <div className="sanskrit-float" style={{ top: '10%', left: '15%', animationDelay: '0s' }}>
        ॐ
      </div>
      <div className="sanskrit-float" style={{ top: '25%', right: '20%', animationDelay: '2s' }}>
        श्री
      </div>
      <div className="sanskrit-float" style={{ bottom: '30%', left: '25%', animationDelay: '4s' }}>
        कृष्ण
      </div>
      <div className="sanskrit-float" style={{ bottom: '15%', right: '15%', animationDelay: '6s' }}>
        गीता
      </div>
      <div className="sanskrit-float" style={{ top: '50%', left: '5%', animationDelay: '1s' }}>
        धर्म
      </div>
      <div className="sanskrit-float" style={{ top: '70%', right: '10%', animationDelay: '3s' }}>
        ध्यान
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-divine-purple rounded-full opacity-10 blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-divine-gold rounded-full opacity-15 blur-2xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-divine-lavender rounded-full opacity-20 blur-xl animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
