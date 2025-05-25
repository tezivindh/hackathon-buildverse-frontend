import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { useAuthStore } from "@/store/useAuthStore";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);
      // Only navigate if login was successful (no error thrown)
      navigate("/dashboard");
    } catch (error) {
      // Error is already handled in the store with toast
      // Just prevent navigation
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-8 divine-glow">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center mx-auto mb-6 divine-glow animate-pulse-glow">
              <span className="text-divine-indigo font-devanagari font-bold text-3xl">
                कृ
              </span>
            </div>
            <h2 className="font-cinzel text-3xl font-bold text-divine-ivory mb-4">
              Welcome Back, Seeker
            </h2>
            <p className="text-divine-lavender text-lg font-devanagari mb-6">
              "Even the confused mind has a path"
            </p>
            <p className="text-divine-lavender/80 text-sm italic">
              — Bhagavad Gita
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-divine-lavender"
                size={20}
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md transition-all duration-300"
                required
                disabled={isLoggingIn}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-divine-lavender"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your sacred password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-divine-ivory placeholder-divine-lavender/60 focus:outline-none focus:ring-2 focus:ring-divine-gold focus:border-transparent backdrop-blur-md transition-all duration-300"
                required
                disabled={isLoggingIn}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-divine-lavender hover:text-divine-gold transition-colors duration-300"
                disabled={isLoggingIn}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo font-bold py-4 rounded-xl hover:scale-105 transition-all duration-300 divine-glow flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-divine-indigo"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Continue Journey</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-8">
            <p className="text-divine-lavender text-sm">
              New seeker?{" "}
              <Link
                to="/signup"
                className="text-divine-gold hover:text-divine-gold-light transition-colors duration-300 font-medium"
              >
                Begin your journey
              </Link>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-divine-lavender/70 hover:text-divine-lavender transition-colors duration-300 text-sm"
            >
              Lost your way? Reset password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
