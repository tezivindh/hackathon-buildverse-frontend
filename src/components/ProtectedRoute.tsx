import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-divine-indigo via-divine-purple to-divine-indigo">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-divine-gold to-divine-gold-light rounded-full flex items-center justify-center mx-auto mb-4 divine-glow animate-pulse">
            <span className="text-divine-indigo font-devanagari font-bold text-2xl">
              कृ
            </span>
          </div>
          <p className="text-divine-lavender text-lg">
            Loading your spiritual journey...
          </p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
