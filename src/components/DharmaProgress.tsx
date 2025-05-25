import React from 'react';
import { TrendingUp } from 'lucide-react';

interface DharmaProgressProps {
  chaptersExplored: number;
  totalChapters: number;
}

const DharmaProgress: React.FC<DharmaProgressProps> = ({ 
  chaptersExplored, 
  totalChapters 
}) => {
  const progressPercentage = (chaptersExplored / totalChapters) * 100;

  return (
    <div className="glass-card p-8 divine-glow">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="text-divine-gold" size={24} />
        <h3 className="font-cinzel text-2xl font-bold text-divine-ivory">
          Dharma Progress
        </h3>
      </div>

      {/* Overall Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-divine-lavender">Chapters Explored</span>
          <span className="text-divine-gold font-bold">
            {chaptersExplored} of {totalChapters}
          </span>
        </div>
        <div className="w-full bg-divine-indigo/30 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full transition-all duration-1000 ease-out divine-glow"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-divine-lavender/70 text-sm mt-2">
          {Math.round(progressPercentage)}% of your spiritual journey completed
        </p>
      </div>
    </div>
  );
};

export default DharmaProgress;
