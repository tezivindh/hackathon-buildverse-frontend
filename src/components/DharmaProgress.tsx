
import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';

interface DharmaProgressProps {
  chaptersExplored: number;
  totalChapters: number;
  versesSaved: number;
}

const DharmaProgress: React.FC<DharmaProgressProps> = ({ 
  chaptersExplored, 
  totalChapters, 
  versesSaved 
}) => {
  const progressPercentage = (chaptersExplored / totalChapters) * 100;
  
  const chapterData = [
    { chapter: 1, verses: 3, theme: "Arjuna's Grief" },
    { chapter: 2, verses: 8, theme: "Eternal Soul" },
    { chapter: 3, verses: 4, theme: "Karma Yoga" },
    { chapter: 4, verses: 2, theme: "Divine Knowledge" },
    { chapter: 6, verses: 3, theme: "Meditation" },
    { chapter: 9, verses: 2, theme: "Royal Knowledge" },
    { chapter: 12, verses: 1, theme: "Devotion" },
    { chapter: 18, verses: 0, theme: "Liberation" }
  ];

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

      {/* Chapter Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        {chapterData.map((chapter, index) => (
          <div 
            key={chapter.chapter}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-divine-gold font-bold">Chapter {chapter.chapter}</span>
              <div className="flex items-center space-x-1">
                <BookOpen size={14} className="text-divine-lavender" />
                <span className="text-divine-lavender text-sm">{chapter.verses}</span>
              </div>
            </div>
            <p className="text-divine-lavender/80 text-sm">{chapter.theme}</p>
            {chapter.verses > 0 && (
              <div className="mt-2 w-full bg-divine-indigo/20 rounded-full h-1">
                <div 
                  className="h-full bg-divine-lavender rounded-full"
                  style={{ width: `${(chapter.verses / 10) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DharmaProgress;
