import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Tag, BookOpen, Heart, Brain, Zap } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const Journey = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');

  const themes = [
    { id: 'all', name: 'All', icon: BookOpen, color: 'divine-lavender' },
    { id: 'karma', name: 'Karma', icon: Zap, color: 'divine-gold' },
    { id: 'devotion', name: 'Devotion', icon: Heart, color: 'divine-purple' },
    { id: 'wisdom', name: 'Wisdom', icon: Brain, color: 'divine-lavender' },
    { id: 'doubt', name: 'Doubt', icon: Tag, color: 'divine-gold' }
  ];

  const savedVerses = [
    {
      id: 1,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      translation: "You have the right to perform action, but never to the fruits of action.",
      chapter: "2.47",
      theme: "karma",
      savedAt: "2 hours ago",
      reflection: "This verse helped me understand that I should focus on doing my best work without being attached to the results.",
      tags: ["action", "detachment", "duty"]
    },
    {
      id: 2,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
      translation: "Whenever there is a decline in dharma and rise of adharma, I manifest myself.",
      chapter: "4.7",
      theme: "devotion",
      savedAt: "Yesterday",
      reflection: "Krishna's promise to restore balance gives me hope during difficult times.",
      tags: ["divine", "protection", "dharma"]
    },
    {
      id: 3,
      sanskrit: "न जायते म्रियते वा कदाचिन्",
      translation: "The soul is never born, nor does it die at any time.",
      chapter: "2.20",
      theme: "wisdom",
      savedAt: "2 days ago",
      reflection: "Understanding the eternal nature of the soul brings peace about mortality.",
      tags: ["soul", "eternal", "death"]
    },
    {
      id: 4,
      sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्",
      translation: "The mind is indeed restless and difficult to control.",
      chapter: "6.35",
      theme: "doubt",
      savedAt: "3 days ago",
      reflection: "Krishna acknowledges the challenge of controlling the mind, which makes me feel understood.",
      tags: ["mind", "control", "meditation"]
    }
  ];

  const filteredVerses = savedVerses.filter(verse => {
    const matchesSearch = verse.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verse.sanskrit.includes(searchTerm) ||
                         verse.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTheme = selectedTheme === 'all' || verse.theme === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  const getThemeColor = (theme: string) => {
    const themeObj = themes.find(t => t.id === theme);
    return themeObj ? themeObj.color : 'divine-lavender';
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-divine-ivory mb-4">
            Your Spiritual Journey
          </h1>
          <p className="text-xl text-divine-lavender max-w-2xl mx-auto">
            Collection of sacred verses and reflections that guide your path
          </p>
        </div>

        {/* Progress Overview */}
        <div className="glass-card p-8 mb-8 divine-glow">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-divine-gold mb-2">{savedVerses.length}</div>
              <div className="text-divine-lavender">Verses Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-divine-gold mb-2">8</div>
              <div className="text-divine-lavender">Chapters Explored</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-divine-gold mb-2">44%</div>
              <div className="text-divine-lavender">Journey Progress</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-8 divine-glow">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-divine-lavender" size={20} />
              <input
                type="text"
                placeholder="Search verses, translations, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md"
              />
            </div>

            {/* Theme Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-divine-lavender" size={20} />
              <div className="flex space-x-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      selectedTheme === theme.id
                        ? 'bg-divine-gold/20 text-divine-gold border border-divine-gold/30'
                        : 'bg-white/5 text-divine-lavender border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <theme.icon size={16} />
                    <span className="text-sm font-medium">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verses Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {filteredVerses.map((verse) => (
            <div key={verse.id} className="glass-card p-6 divine-glow hover:scale-105 transition-all duration-300">
              {/* Verse Header */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getThemeColor(verse.theme)}/20 text-${getThemeColor(verse.theme)}`}>
                  Chapter {verse.chapter}
                </span>
                <div className="flex items-center space-x-2 text-divine-lavender/60">
                  <Clock size={14} />
                  <span className="text-xs">{verse.savedAt}</span>
                </div>
              </div>

              {/* Sanskrit Verse */}
              <div className="font-devanagari text-lg text-divine-lavender mb-4 animate-float">
                {verse.sanskrit}
              </div>

              {/* Translation */}
              <p className="text-divine-ivory leading-relaxed mb-4">
                "{verse.translation}"
              </p>

              {/* Reflection */}
              {verse.reflection && (
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="text-divine-gold" size={16} />
                    <span className="text-divine-gold text-sm font-medium">Your Reflection</span>
                  </div>
                  <p className="text-divine-lavender/80 text-sm italic">
                    {verse.reflection}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {verse.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-divine-purple/20 text-divine-lavender text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button className="flex items-center space-x-2 text-divine-lavender hover:text-divine-gold transition-colors duration-300">
                  <Star size={16} />
                  <span className="text-sm">Favorite</span>
                </button>
                <button className="text-divine-lavender hover:text-divine-gold transition-colors duration-300 text-sm">
                  Add Reflection
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Empty State */}
        {filteredVerses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-divine-lavender/40 mb-4" size={48} />
            <h3 className="font-cinzel text-xl text-divine-ivory mb-2">
              No verses found
            </h3>
            <p className="text-divine-lavender/60">
              Try adjusting your search or explore more chapters to build your journey
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journey;
