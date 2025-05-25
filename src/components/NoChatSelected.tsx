import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-black/10">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center divine-glow animate-pulse-glow">
              <span className="text-divine-indigo font-devanagari font-bold text-3xl">
                कृ
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-divine-ivory font-cinzel">
          Welcome to Krishna Saarthi!
        </h2>
        <p className="text-divine-lavender/80">
          Select a conversation from the sidebar to start chatting with fellow
          seekers, or visit the Chat with Krishna page for divine guidance.
        </p>

        <div className="mt-8">
          <div className="glass-card p-6 rounded-xl">
            <p className="text-divine-lavender font-devanagari text-lg mb-2">
              "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज"
            </p>
            <p className="text-divine-ivory/80 text-sm italic">
              "Abandon all varieties of dharma and surrender unto Me alone"
            </p>
            <p className="text-divine-gold text-xs mt-2">
              — Bhagavad Gita 18.66
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
