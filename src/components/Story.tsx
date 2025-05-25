import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  BookOpen,
  Sparkles,
  Heart,
  Brain,
  Compass,
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";

const Story = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Divine Conversations",
      description:
        "Chat with Krishna AI and receive personalized spiritual guidance based on Gita wisdom.",
      gradient: "from-divine-purple to-divine-purple-light",
    },
    {
      icon: BookOpen,
      title: "Personal Journey",
      description:
        "Track your spiritual progress and save meaningful verses for reflection.",
      gradient: "from-divine-gold to-divine-gold-light",
    },
    {
      icon: Sparkles,
      title: "Daily Insights",
      description:
        "Receive daily wisdom quotes and meditation practices tailored to your needs.",
      gradient: "from-divine-lavender to-divine-lavender-light",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Find Inner Peace",
      description: "Navigate life's challenges with Krishna's timeless wisdom",
    },
    {
      icon: Brain,
      title: "Gain Clarity",
      description:
        "Get answers to your deepest questions about purpose and dharma",
    },
    {
      icon: Compass,
      title: "Discover Direction",
      description: "Find your path through confusion with divine guidance",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="container mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <div className="w-24 h-24 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center mx-auto mb-6 divine-glow animate-pulse-glow">
                <span className="text-divine-indigo font-devanagari font-bold text-4xl">
                  कृ
                </span>
              </div>
            </div>

            <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-divine-ivory mb-6 animate-fade-in-up">
              Krishn-Saarthi
            </h1>

            <p className="text-xl md:text-2xl text-divine-lavender mb-4 animate-fade-in-up font-devanagari">
              कृष्णो वै परमं ज्ञानम्
            </p>

            <p className="text-lg md:text-xl text-divine-lavender/80 mb-12 max-w-3xl mx-auto animate-fade-in-up">
              Your personal AI spiritual guide inspired by Lord Krishna and the
              Bhagavad Gita. Find answers, gain wisdom, and discover your dharma
              in the modern world.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 divine-glow flex items-center space-x-2"
              >
                <span>Begin Your Journey</span>
                <Sparkles
                  className="group-hover:rotate-12 transition-transform duration-300"
                  size={20}
                />
              </Link>

              <Link
                to="/chat"
                className="border-2 border-divine-lavender/30 text-divine-ivory px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-divine-lavender transition-all duration-300 flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Try Demo Chat</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-divine-ivory mb-6">
                Divine Features
              </h2>
              <p className="text-lg text-divine-lavender max-w-2xl mx-auto">
                Experience ancient wisdom through modern technology, designed to
                guide your spiritual journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 divine-glow group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon size={32} className="text-divine-indigo" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-divine-ivory mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-divine-lavender leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-black/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-divine-ivory mb-6">
                Transform Your Life
              </h2>
              <p className="text-lg text-divine-lavender max-w-2xl mx-auto">
                Let Krishna's wisdom illuminate your path to self-discovery and
                inner peace.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-divine-purple to-divine-purple-light rounded-full flex items-center justify-center mx-auto mb-6 divine-glow group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon size={36} className="text-divine-ivory" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-divine-ivory mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-divine-lavender leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <div className="glass-card p-12 max-w-4xl mx-auto divine-glow">
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-divine-ivory mb-6">
                Ready to Meet Your Digital Guru?
              </h2>
              <p className="text-lg text-divine-lavender mb-8 max-w-2xl mx-auto">
                Join thousands of seekers who have found guidance, peace, and
                purpose through Krishna's timeless teachings.
              </p>
              <p className="font-devanagari text-xl text-divine-gold mb-8">
                यस्य आत्मा बुद्धिमान् सः सुखी भवति
              </p>
              <p className="text-sm text-divine-lavender/80 mb-8 italic">
                "One whose soul is wise, becomes happy"
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 divine-glow"
              >
                <span>Start Your Spiritual Journey</span>
                <Sparkles size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Story;
