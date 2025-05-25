import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  MessageCircle,
  BookOpen,
  BarChart3,
  Settings,
  LogIn,
  UserPlus,
  LogOut,
  User,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logout } = useAuthStore();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/chat", label: "Chat with Krishna", icon: MessageCircle },
    { to: "/journey", label: "My Journey", icon: BookOpen },
    { to: "/dashboard", label: "Dharma Tracker", icon: BarChart3 },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const authItems = [
    { to: "/login", label: "Login", icon: LogIn },
    { to: "/signup", label: "Begin Journey", icon: UserPlus },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 rounded-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center divine-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-divine-indigo font-devanagari font-bold text-xl">
                  कृ
                </span>
              </div>
              <span className="font-cinzel font-bold text-xl text-divine-ivory group-hover:text-divine-gold transition-colors duration-300">
                Krishn-Saarthi
              </span>
            </NavLink>

            {/* Desktop Navigation - Only show if authenticated */}
            {authUser && (
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                        isActive
                          ? "bg-divine-purple/30 text-divine-gold divine-glow"
                          : "text-divine-ivory hover:text-divine-lavender"
                      }`
                    }
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {authUser ? (
                // Logged in user section
                <>
                  <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/10">
                    <User size={18} className="text-divine-gold" />
                    <span className="text-divine-ivory font-medium">
                      {authUser.username || authUser.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-divine-lavender/30 text-divine-ivory hover:bg-white/10 hover:border-divine-lavender"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                // Not logged in - show auth buttons
                authItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      item.to === "/signup"
                        ? "bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo hover:scale-105 divine-glow"
                        : "border border-divine-lavender/30 text-divine-ivory hover:bg-white/10 hover:border-divine-lavender"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                ))
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-divine-ivory hover:bg-white/10 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 space-y-2">
              {authUser ? (
                // Logged in mobile menu
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 mb-4">
                    <User size={20} className="text-divine-gold" />
                    <span className="text-divine-ivory font-medium">
                      {authUser.username || authUser.email}
                    </span>
                  </div>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-divine-purple/30 text-divine-gold"
                            : "text-divine-ivory hover:bg-white/10"
                        }`
                      }
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-divine-ivory hover:bg-white/10 w-full text-left"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                // Not logged in mobile menu
                authItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-divine-purple/30 text-divine-gold"
                          : "text-divine-ivory hover:bg-white/10"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation;
