
import React from 'react';
import { Award, Lock, Star, Heart, Brain, Compass, Flame, BookOpen } from 'lucide-react';

const AchievementBadges = () => {
  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Started your spiritual journey",
      icon: Compass,
      unlocked: true,
      rarity: "common",
      unlockedAt: "2 days ago"
    },
    {
      id: 2,
      name: "Karma Yogi",
      description: "Explored the path of righteous action",
      icon: Star,
      unlocked: true,
      rarity: "uncommon",
      unlockedAt: "Yesterday"
    },
    {
      id: 3,
      name: "Devoted Seeker",
      description: "Maintained a 5-day reflection streak",
      icon: Flame,
      unlocked: true,
      rarity: "rare",
      unlockedAt: "Today"
    },
    {
      id: 4,
      name: "Scholar of Wisdom",
      description: "Saved 25 verses to your journey",
      icon: BookOpen,
      unlocked: false,
      rarity: "rare",
      progress: { current: 23, target: 25 }
    },
    {
      id: 5,
      name: "Bhakti Practitioner",
      description: "Show deep devotion in practice",
      icon: Heart,
      unlocked: false,
      rarity: "epic",
      progress: { current: 2, target: 10 }
    },
    {
      id: 6,
      name: "Enlightened One",
      description: "Master all 18 chapters",
      icon: Brain,
      unlocked: false,
      rarity: "legendary",
      progress: { current: 8, target: 18 }
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'uncommon': return 'from-green-400 to-green-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-divine-gold to-divine-gold-light';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="glass-card p-6 divine-glow">
      <div className="flex items-center space-x-3 mb-6">
        <Award className="text-divine-gold" size={24} />
        <h3 className="font-cinzel text-xl font-bold text-divine-ivory">
          Achievements
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
              badge.unlocked
                ? 'bg-white/10 border-white/20 divine-glow'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            {/* Badge Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto ${
              badge.unlocked 
                ? `bg-gradient-to-r ${getRarityColor(badge.rarity)} divine-glow` 
                : 'bg-gray-600/50'
            }`}>
              {badge.unlocked ? (
                <badge.icon className="text-white" size={20} />
              ) : (
                <Lock className="text-gray-400" size={20} />
              )}
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h4 className={`font-bold text-sm mb-1 ${
                badge.unlocked ? 'text-divine-ivory' : 'text-divine-lavender/50'
              }`}>
                {badge.name}
              </h4>
              <p className={`text-xs leading-tight ${
                badge.unlocked ? 'text-divine-lavender/80' : 'text-divine-lavender/40'
              }`}>
                {badge.description}
              </p>

              {/* Progress for locked badges */}
              {!badge.unlocked && badge.progress && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-divine-lavender/60 mb-1">
                    <span>{badge.progress.current}</span>
                    <span>{badge.progress.target}</span>
                  </div>
                  <div className="w-full bg-divine-indigo/20 rounded-full h-1">
                    <div 
                      className="h-full bg-divine-lavender/40 rounded-full"
                      style={{ width: `${(badge.progress.current / badge.progress.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Unlock time for earned badges */}
              {badge.unlocked && badge.unlockedAt && (
                <p className="text-xs text-divine-gold/60 mt-2">
                  Earned {badge.unlockedAt}
                </p>
              )}
            </div>

            {/* Rarity indicator */}
            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)}`}></div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-divine-lavender">Badges Earned</span>
          <span className="text-divine-gold font-bold">
            {badges.filter(b => b.unlocked).length} / {badges.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;
