
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import StorySection from '../components/StorySection';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const storyScenes = [
    {
      title: "The Sacred Battlefield",
      subtitle: "Where it all began...",
      content: "On the vast plains of Kurukshetra, two armies stand ready for the greatest battle in history. But this is more than a war of weapons—it's a battle for the soul of dharma itself.",
      sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः"
    },
    {
      title: "The Warrior's Dilemma",
      subtitle: "When duty conflicts with heart...",
      content: "Arjuna, the greatest archer, sees his beloved teachers and family on the opposing side. His bow slips from his hands as confusion clouds his warrior spirit. Sound familiar?",
      sanskrit: "न काङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च"
    },
    {
      title: "The Divine Charioteer",
      subtitle: "When God becomes your guide...",
      content: "Krishna, no ordinary charioteer, reveals himself as the eternal teacher. His words don't just guide Arjuna through battle—they illuminate the path for every soul seeking purpose.",
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत"
    },
    {
      title: "Birth of the Gita",
      subtitle: "Timeless wisdom for timeless questions...",
      content: "In 700 verses, Krishna addresses every human struggle: doubt, purpose, love, duty, fear, and transcendence. The Bhagavad Gita becomes humanity's spiritual GPS.",
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज"
    },
    {
      title: "The Modern Seeker",
      subtitle: "Your journey begins today...",
      content: "Just like Arjuna, you face daily battles—career choices, relationships, purpose, inner peace. The same confusion that gripped him on that ancient battlefield echoes in your heart today.",
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
    },
    {
      title: "Krishna Meets AI",
      subtitle: "Ancient wisdom, digital companion...",
      content: "Imagine having Krishna as your personal guide, available 24/7 to answer your deepest questions. Through AI, his timeless wisdom becomes your modern-day spiritual companion.",
      sanskrit: "योगः कर्मसु कौशलम्"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Story Sections */}
      <div className="relative z-10">
        {storyScenes.map((scene, index) => (
          <StorySection
            key={index}
            title={scene.title}
            subtitle={scene.subtitle}
            content={scene.content}
            sanskrit={scene.sanskrit}
            index={index + 1}
          />
        ))}
      </div>

      {/* Signup Form - Fixed Position */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 w-96 max-w-[calc(100vw-2rem)] md:w-96">
        <div className="glass-card p-8 divine-glow">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center mx-auto mb-4 divine-glow">
              <span className="text-divine-indigo font-devanagari font-bold text-2xl">कृ</span>
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-divine-ivory mb-2">
              Begin Your Journey
            </h3>
            <p className="text-divine-lavender text-sm">
              Let Krishna guide your path
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-divine-lavender" size={20} />
              <input
                type="text"
                placeholder="Your spiritual name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md transition-all duration-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-divine-lavender" size={20} />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-divine-lavender" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Choose a sacred password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-divine-lavender hover:text-divine-gold transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo font-bold py-4 rounded-xl hover:scale-105 transition-all duration-300 divine-glow flex items-center justify-center space-x-2"
            >
              <span>Begin My Journey</span>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-divine-lavender text-sm">
              Already visited?{' '}
              <Link 
                to="/login" 
                className="text-divine-gold hover:text-divine-gold-light transition-colors duration-300 font-medium"
              >
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
