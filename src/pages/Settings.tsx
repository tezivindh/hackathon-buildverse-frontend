
import React, { useState } from 'react';
import { Moon, Sun, Music, Volume2, VolumeX, Trash2, LogOut, Palette } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const Settings = () => {
  const [theme, setTheme] = useState('spiritual');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [showClearDialog, setShowClearDialog] = useState(false);

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, description: 'Clean and bright' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { id: 'spiritual', name: 'Spiritual', icon: Palette, description: 'Divine cosmic theme' }
  ];

  const handleClearJourney = () => {
    // Clear journey logic would go here
    setShowClearDialog(false);
    console.log('Journey cleared');
  };

  const handleLogout = () => {
    // Logout logic would go here
    console.log('Logging out');
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-divine-ivory mb-4">
            Settings
          </h1>
          <p className="text-xl text-divine-lavender">
            Customize your spiritual journey experience
          </p>
        </div>

        <div className="space-y-8">
          {/* Theme Selection */}
          <div className="glass-card p-8 divine-glow">
            <h2 className="font-cinzel text-2xl font-bold text-divine-ivory mb-6">
              Appearance
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    theme === themeOption.id
                      ? 'border-divine-gold bg-divine-gold/10 divine-glow'
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <themeOption.icon 
                    className={theme === themeOption.id ? 'text-divine-gold' : 'text-divine-lavender'} 
                    size={32} 
                  />
                  <h3 className={`font-bold mt-3 mb-1 ${
                    theme === themeOption.id ? 'text-divine-gold' : 'text-divine-ivory'
                  }`}>
                    {themeOption.name}
                  </h3>
                  <p className="text-divine-lavender/70 text-sm">
                    {themeOption.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Settings */}
          <div className="glass-card p-8 divine-glow">
            <h2 className="font-cinzel text-2xl font-bold text-divine-ivory mb-6">
              Audio Experience
            </h2>
            
            <div className="space-y-6">
              {/* Background Music */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-divine-gold/20 rounded-xl flex items-center justify-center">
                    <Music className="text-divine-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-divine-ivory">Background Music</h3>
                    <p className="text-divine-lavender/70 text-sm">Peaceful flute and spiritual sounds</p>
                  </div>
                </div>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                    musicEnabled ? 'bg-divine-gold' : 'bg-divine-lavender/30'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                    musicEnabled ? 'left-7' : 'left-1'
                  }`}></div>
                </button>
              </div>

              {/* Text to Speech */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-divine-purple/20 rounded-xl flex items-center justify-center">
                    {ttsEnabled ? 
                      <Volume2 className="text-divine-purple" size={20} /> :
                      <VolumeX className="text-divine-purple" size={20} />
                    }
                  </div>
                  <div>
                    <h3 className="font-bold text-divine-ivory">Krishna's Voice</h3>
                    <p className="text-divine-lavender/70 text-sm">Listen to verses with AI narration</p>
                  </div>
                </div>
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                    ttsEnabled ? 'bg-divine-gold' : 'bg-divine-lavender/30'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                    ttsEnabled ? 'left-7' : 'left-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="glass-card p-8 divine-glow">
            <h2 className="font-cinzel text-2xl font-bold text-divine-ivory mb-6">
              Journey Data
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Trash2 className="text-red-400" size={24} />
                  <div>
                    <h3 className="font-bold text-red-300">Clear My Journey</h3>
                    <p className="text-red-200/70 text-sm">
                      This will permanently delete all your saved verses and progress
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClearDialog(true)}
                  className="bg-red-500/20 text-red-300 px-6 py-3 rounded-xl hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                >
                  Clear Journey Data
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="glass-card p-8 divine-glow">
            <h2 className="font-cinzel text-2xl font-bold text-divine-ivory mb-6">
              Account
            </h2>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 bg-divine-lavender/20 text-divine-lavender px-6 py-4 rounded-xl hover:bg-divine-lavender/30 transition-all duration-300 border border-divine-lavender/30"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Clear Journey Confirmation Dialog */}
        {showClearDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-card p-8 max-w-md mx-4 divine-glow">
              <h3 className="font-cinzel text-xl font-bold text-divine-ivory mb-4">
                Clear Your Journey?
              </h3>
              <p className="text-divine-lavender mb-6">
                This action cannot be undone. All your saved verses, reflections, and progress will be permanently deleted.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowClearDialog(false)}
                  className="flex-1 bg-white/10 text-divine-ivory px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearJourney}
                  className="flex-1 bg-red-500/20 text-red-300 px-4 py-3 rounded-xl hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
                >
                  Clear Journey
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
