import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, BarChart3, Play, Pause } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import DharmaProgress from '../components/DharmaProgress';
import AchievementBadges from '../components/AchievementBadges';
import LoginStreak from '../components/LoginStreak';
import axios from 'axios';

const Dashboard = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [userName] = useState('Arjuna'); // This would come from auth context
  const [progressData, setProgressData] = useState(null); // Holds progress data from backend
  const [loading, setLoading] = useState(true); // Loading state

  const dailyQuote = {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    translation: "You have the right to perform action, but never to the fruits of action.",
    chapter: "Chapter 2, Verse 47"
  };

  // Fetch progress data from backend
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userId = '12345'; // Replace with actual user ID from auth context
        const response = await axios.get(`http://localhost:5000/progress/${userId}`);
        setProgressData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching progress data:', error);
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-divine-lavender">Loading your progress...</p>
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-divine-lavender">No progress data found.</p>
      </div>
    );
  }

  const { touched_chapters, current_streak } = progressData;
  const chaptersExplored = touched_chapters.length;
  const totalChapters = 18; // Total chapters in the Gita

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header with Music Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center divine-glow animate-pulse-glow">
              <span className="text-divine-indigo font-devanagari font-bold text-2xl">कृ</span>
            </div>
            <div>
              <h1 className="font-cinzel text-3xl font-bold text-divine-ivory">
                Dharma Tracker
              </h1>
              <p className="text-divine-lavender">Your spiritual journey dashboard</p>
            </div>
          </div>
          
          <button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="glass-card p-3 rounded-xl divine-glow hover:scale-105 transition-all duration-300"
          >
            {musicEnabled ? 
              <Pause className="text-divine-gold" size={20} /> : 
              <Play className="text-divine-lavender" size={20} />
            }
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Card */}
            <div className="glass-card p-8 divine-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-divine-gold/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="font-cinzel text-2xl font-bold text-divine-ivory mb-2">
                  Welcome back, {userName}
                </h2>
                <div className="space-y-4">
                  <div className="font-devanagari text-xl text-divine-lavender animate-float">
                    {dailyQuote.sanskrit}
                  </div>
                  <p className="text-divine-ivory text-lg leading-relaxed">
                    "{dailyQuote.translation}"
                  </p>
                  <span className="inline-block bg-divine-gold/20 text-divine-gold px-3 py-1 rounded-full text-sm">
                    {dailyQuote.chapter}
                  </span>
                </div>
              </div>
            </div>

            {/* Login Streak */}
            <LoginStreak streak={current_streak} />

            {/* Dharma Progress */}
            <DharmaProgress 
              chaptersExplored={chaptersExplored}
              totalChapters={totalChapters}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="glass-card p-6 divine-glow">
              <h3 className="font-cinzel text-xl font-bold text-divine-ivory mb-6">
                Journey Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-divine-gold" size={20} />
                    <span className="text-divine-lavender">Chapters Explored</span>
                  </div>
                  <span className="text-divine-ivory font-bold">{chaptersExplored} / {totalChapters}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-divine-gold" size={20} />
                    <span className="text-divine-lavender">Current Streak</span>
                  </div>
                  <span className="text-divine-ivory font-bold">{current_streak} days</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <AchievementBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
