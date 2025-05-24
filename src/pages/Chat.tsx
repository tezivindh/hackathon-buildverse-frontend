
import React, { useState } from 'react';
import { Send, Volume2, Star, FileText, Sparkles } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  verse?: string;
  sanskrit?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome, dear seeker. I am here to guide you through life's challenges using the eternal wisdom of the Bhagavad Gita. What weighs upon your heart today?",
      isUser: false,
      timestamp: new Date(),
      verse: "Chapter 4, Verse 7",
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।"
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    const responses = [
      {
        text: "Your question touches the very essence of dharma. Remember, every action performed without attachment to its fruits becomes a step toward liberation. Focus on your duty, not the outcome.",
        verse: "Chapter 2, Verse 47",
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।"
      },
      {
        text: "In moments of doubt, remember that the soul is eternal and unchanging. What you perceive as problems are merely experiences for the soul's growth. Trust in the divine plan.",
        verse: "Chapter 2, Verse 20",
        sanskrit: "न जायते म्रियते वा कदाचिन्।"
      },
      {
        text: "The mind is indeed restless, but through practice and detachment, it can be controlled. Start with small moments of mindfulness and gradually build your inner strength.",
        verse: "Chapter 6, Verse 35",
        sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्।"
      }
    ];

    const krishnaResponse: Message = {
      id: messages.length + 2,
      text: responses[Math.floor(Math.random() * responses.length)].text,
      isUser: false,
      timestamp: new Date(),
      verse: responses[Math.floor(Math.random() * responses.length)].verse,
      sanskrit: responses[Math.floor(Math.random() * responses.length)].sanskrit
    };

    setMessages([...messages, newUserMessage, krishnaResponse]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden divine-glow">
            {/* Header */}
            <div className="bg-gradient-to-r from-divine-purple to-divine-purple-light p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center divine-glow animate-pulse-glow">
                  <span className="text-divine-indigo font-devanagari font-bold text-2xl">कृ</span>
                </div>
                <div>
                  <h1 className="font-cinzel text-2xl font-bold text-divine-ivory">
                    Lord Krishna
                  </h1>
                  <p className="text-divine-lavender text-sm">
                    Your Divine Spiritual Guide
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center space-x-2 text-divine-gold">
                    <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-[60vh] overflow-y-auto p-6 space-y-6 bg-black/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo'
                        : 'glass-card text-divine-ivory'
                    } rounded-2xl p-6 shadow-lg`}
                  >
                    {!message.isUser && message.sanskrit && (
                      <div className="font-devanagari text-divine-lavender text-lg mb-3 animate-float">
                        {message.sanskrit}
                      </div>
                    )}
                    
                    <p className="leading-relaxed mb-4">{message.text}</p>
                    
                    {!message.isUser && (
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                        <button className="flex items-center space-x-2 text-divine-lavender hover:text-divine-gold transition-colors duration-300">
                          <Volume2 size={16} />
                          <span className="text-sm">Listen</span>
                        </button>
                        <button className="flex items-center space-x-2 text-divine-lavender hover:text-divine-gold transition-colors duration-300">
                          <Star size={16} />
                          <span className="text-sm">Save to Journey</span>
                        </button>
                        <button className="flex items-center space-x-2 text-divine-lavender hover:text-divine-gold transition-colors duration-300">
                          <FileText size={16} />
                          <span className="text-sm">Expand Verse</span>
                        </button>
                        {message.verse && (
                          <span className="text-divine-gold text-sm font-medium bg-divine-gold/10 px-3 py-1 rounded-full">
                            {message.verse}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-2">
                      <span className={`text-xs ${message.isUser ? 'text-divine-indigo/70' : 'text-divine-lavender/70'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10 bg-black/10">
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind, dear seeker..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md resize-none transition-all duration-300"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo p-4 rounded-2xl hover:scale-105 transition-all duration-300 divine-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={24} />
                </button>
              </div>
              
              <div className="flex items-center justify-center mt-4 text-divine-lavender/60 text-sm">
                <Sparkles size={16} className="mr-2" />
                <span>Krishna listens with infinite patience and wisdom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
