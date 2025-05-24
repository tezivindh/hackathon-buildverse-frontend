
import React from 'react';
import { Flame, Calendar } from 'lucide-react';

interface LoginStreakProps {
  streak: number;
}

const LoginStreak: React.FC<LoginStreakProps> = ({ streak }) => {
  const generateStreakDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const isActive = i < streak;
      const isToday = i === 0;
      
      days.push({
        date: day.getDate(),
        day: day.toLocaleDateString('en', { weekday: 'short' }),
        isActive,
        isToday
      });
    }
    
    return days;
  };

  const streakDays = generateStreakDays();
  const flameIntensity = Math.min(streak / 10, 1); // Max intensity at 10 days

  return (
    <div className="glass-card p-8 divine-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="relative">
          <Flame 
            className="text-divine-gold animate-pulse" 
            size={28}
            style={{ 
              filter: `drop-shadow(0 0 ${10 + (flameIntensity * 10)}px rgba(245, 158, 11, ${0.5 + (flameIntensity * 0.5)}))` 
            }}
          />
          {streak >= 5 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-divine-gold rounded-full animate-ping"></div>
          )}
        </div>
        <div>
          <h3 className="font-cinzel text-2xl font-bold text-divine-ivory">
            Reflection Streak
          </h3>
          <p className="text-divine-lavender">
            You've reflected for <span className="text-divine-gold font-bold">{streak} days</span> in a row
          </p>
        </div>
      </div>

      {/* Streak Visualization */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {streakDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-divine-lavender/60 text-xs mb-2">{day.day}</div>
            <div 
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                day.isActive 
                  ? 'bg-gradient-to-r from-divine-gold to-divine-gold-light border-divine-gold text-divine-indigo divine-glow' 
                  : 'border-divine-lavender/30 text-divine-lavender/50'
              } ${
                day.isToday ? 'ring-2 ring-divine-purple' : ''
              }`}
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      <div className="text-center">
        {streak === 0 && (
          <p className="text-divine-lavender/80 italic">
            "The journey of a thousand miles begins with a single step"
          </p>
        )}
        {streak >= 1 && streak < 5 && (
          <p className="text-divine-lavender/80 italic">
            "Consistency is the mother of mastery. Keep going!"
          </p>
        )}
        {streak >= 5 && streak < 10 && (
          <p className="text-divine-gold italic">
            "Your dedication shines bright! You're building divine habits."
          </p>
        )}
        {streak >= 10 && (
          <p className="text-divine-gold italic font-medium">
            "You are a true spiritual warrior! Krishna smiles upon your devotion."
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginStreak;
