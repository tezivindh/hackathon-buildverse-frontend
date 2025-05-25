import React, { useState } from "react";
import {
  Send,
  Volume2,
  Star,
  FileText,
  Sparkles,
  Loader2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import { toast } from "react-hot-toast";

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
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<"integrated" | "embedded">(
    "integrated"
  );

  const getKrishnaResponse = async (userMessage: string): Promise<string> => {
    try {
      // Try different possible API endpoints and structures
      let response;
      let data;

      // First try: Direct API call to the chatbot
      try {
        response = await fetch(
          "https://zingy-valkyrie-a2f067.netlify.app/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: userMessage,
              context:
                "You are Lord Krishna providing spiritual guidance based on Bhagavad Gita teachings.",
            }),
          }
        );

        if (response.ok) {
          data = await response.json();
          return data.response || data.message || data.reply;
        }
      } catch (e) {
        console.log("First API attempt failed, trying alternative...");
      }

      // Second try: Netlify functions endpoint
      try {
        response = await fetch(
          "https://zingy-valkyrie-a2f067.netlify.app/.netlify/functions/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: userMessage,
              prompt:
                "You are Lord Krishna providing spiritual guidance based on Bhagavad Gita teachings.",
            }),
          }
        );

        if (response.ok) {
          data = await response.json();
          return data.response || data.message || data.reply;
        }
      } catch (e) {
        console.log("Second API attempt failed, trying alternative...");
      }

      // Third try: Simple GET request with query parameters
      try {
        const encodedMessage = encodeURIComponent(userMessage);
        response = await fetch(
          `https://zingy-valkyrie-a2f067.netlify.app/api/ask?message=${encodedMessage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          data = await response.json();
          return data.response || data.message || data.reply;
        }
      } catch (e) {
        console.log("Third API attempt failed, using fallback...");
      }

      // If all API calls fail, throw error to use fallback
      throw new Error("All API endpoints failed");
    } catch (error) {
      console.error("Error calling Krishna chatbot:", error);

      // Fallback to meaningful Krishna-style responses
      const fallbackResponses = [
        `Dear seeker, regarding "${userMessage}" - Remember that every challenge is an opportunity for spiritual growth. The Gita teaches us that we must perform our duties without attachment to results. Focus on righteous action, and let the divine handle the outcomes.`,
        `Your question about "${userMessage}" touches the heart of dharma. As I taught Arjuna, the soul is eternal and beyond destruction. What seems like a problem is merely the soul's journey toward enlightenment. Trust in the divine plan and act with devotion.`,
        `In response to your concern about "${userMessage}" - The mind is indeed restless, but through practice and detachment, it can be controlled. Meditate on the eternal truth that you are not the body but the immortal soul. This perspective will bring you peace.`,
        `Regarding "${userMessage}" - Remember that I am present in all beings and all beings are in me. When you see the divine in everything, your troubles become stepping stones to liberation. Act with love and compassion, and you will find your path.`,
        `Your question about "${userMessage}" reminds me of the eternal wisdom: 'Whatever happened, happened for the good. Whatever is happening, is happening for the good. Whatever will happen, will also happen for the good.' Trust in this divine truth.`,
      ];

      return fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ];
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Get response from Krishna chatbot
      const krishnaResponseText = await getKrishnaResponse(userMessage);

      // Predefined verses and Sanskrit for spiritual context
      const spiritualContext = [
        {
          verse: "Chapter 2, Verse 47",
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
        },
        {
          verse: "Chapter 2, Verse 20",
          sanskrit: "न जायते म्रियते वा कदाचिन्।",
        },
        {
          verse: "Chapter 6, Verse 35",
          sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम्।",
        },
        {
          verse: "Chapter 18, Verse 66",
          sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।",
        },
        {
          verse: "Chapter 4, Verse 7",
          sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
        },
      ];

      const randomContext =
        spiritualContext[Math.floor(Math.random() * spiritualContext.length)];

      const krishnaResponse: Message = {
        id: messages.length + 2,
        text: krishnaResponseText,
        isUser: false,
        timestamp: new Date(),
        verse: randomContext.verse,
        sanskrit: randomContext.sanskrit,
      };

      setMessages((prev) => [...prev, krishnaResponse]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Unable to connect with Krishna. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (chatMode === "embedded") {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />

        <div className="relative z-10 container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="glass-card rounded-3xl overflow-hidden divine-glow">
              {/* Header with mode toggle */}
              <div className="bg-gradient-to-r from-divine-purple to-divine-purple-light p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center divine-glow animate-pulse-glow">
                      <span className="text-divine-indigo font-devanagari font-bold text-2xl">
                        कृ
                      </span>
                    </div>
                    <div>
                      <h1 className="font-cinzel text-2xl font-bold text-divine-ivory">
                        Lord Krishna
                      </h1>
                      <p className="text-divine-lavender text-sm">
                        Direct Chatbot Interface
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setChatMode("integrated")}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-divine-gold/20 text-divine-gold hover:bg-divine-gold/30 transition-colors duration-300"
                    >
                      <MessageSquare size={18} />
                      <span className="text-sm">Integrated Chat</span>
                    </button>

                    <a
                      href="https://zingy-valkyrie-a2f067.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 text-divine-ivory hover:bg-white/20 transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Open in New Tab</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Chatbot */}
              <div className="h-[70vh]">
                <iframe
                  src="https://zingy-valkyrie-a2f067.netlify.app/"
                  className="w-full h-full border-0"
                  title="Krishna Chatbot"
                  allow="microphone; camera"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden divine-glow">
            {/* Header with mode toggle */}
            <div className="bg-gradient-to-r from-divine-purple to-divine-purple-light p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center divine-glow animate-pulse-glow">
                    <span className="text-divine-indigo font-devanagari font-bold text-2xl">
                      कृ
                    </span>
                  </div>
                  <div>
                    <h1 className="font-cinzel text-2xl font-bold text-divine-ivory">
                      Lord Krishna
                    </h1>
                    <p className="text-divine-lavender text-sm">
                      Your Divine Spiritual Guide
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setChatMode("embedded")}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-divine-gold/20 text-divine-gold hover:bg-divine-gold/30 transition-colors duration-300"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm">Direct Chatbot</span>
                  </button>

                  <div className="flex items-center space-x-2 text-divine-gold">
                    <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      {isLoading ? "Contemplating..." : "Online"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-[60vh] overflow-y-auto p-6 space-y-6 bg-black/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-2xl ${
                      message.isUser
                        ? "bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo"
                        : "glass-card text-divine-ivory"
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
                      <span
                        className={`text-xs ${
                          message.isUser
                            ? "text-divine-indigo/70"
                            : "text-divine-lavender/70"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-card text-divine-ivory rounded-2xl p-6 shadow-lg max-w-2xl">
                    <div className="flex items-center space-x-3">
                      <Loader2
                        size={20}
                        className="animate-spin text-divine-gold"
                      />
                      <span className="text-divine-lavender">
                        Krishna is contemplating your question...
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo p-4 rounded-2xl hover:scale-105 transition-all duration-300 divine-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <Send size={24} />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center mt-4 text-divine-lavender/60 text-sm">
                <Sparkles size={16} className="mr-2" />
                <span>
                  {isLoading
                    ? "Krishna is reflecting on the eternal wisdom..."
                    : "Krishna listens with infinite patience and wisdom"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
