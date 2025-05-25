import { create } from "zustand";
import { AxiosInstance } from "axios";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { io, Socket } from "socket.io-client";

interface AuthUser {
  _id: string;
  email: string;
  username: string;
}

interface SignupData {
  email: string;
  username: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  socket: Socket | null;
  onlineUsers: string[];
  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const BASE_URL: string =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async (): Promise<void> => {
    try {
      const res = await axiosInstance.get<AuthUser>("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData): Promise<void> => {
    set({ isSigningUp: true });
    console.log("Signup attempt with data:", {
      username: data.username,
      email: data.email,
      password: "***",
    });
    console.log(
      "API endpoint:",
      axiosInstance.defaults.baseURL + "/auth/signup"
    );

    try {
      const res = await axiosInstance.post<AuthUser>("/auth/signup", data);
      console.log("Signup successful, response:", res.data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error: any) {
      console.error("Signup error details:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please check your connection and try again.";
      toast.error(errorMessage);

      // Important: Re-throw the error so the component knows signup failed
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginData): Promise<void> => {
    set({ isLoggingIn: true });
    console.log("Login attempt with data:", {
      email: data.email,
      password: "***",
    });
    console.log(
      "API endpoint:",
      axiosInstance.defaults.baseURL + "/auth/login"
    );

    try {
      const res = await axiosInstance.post<AuthUser>("/auth/login", data);
      console.log("Login successful, response:", res.data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error: any) {
      console.error("Login error details:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);

      // Clear any existing auth state on login failure
      set({ authUser: null });

      let errorMessage = "Login failed. Please try again.";

      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        errorMessage =
          "Cannot connect to server. Please check your connection.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);

      // Important: Re-throw the error so the component knows login failed
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error: any) {
      // Even if server logout fails, clear local state
      set({ authUser: null });
      get().disconnectSocket();

      // Don't show error for logout - just clear the state
      console.log("Logout error (clearing local state anyway):", error);
      toast.success("Logged out successfully");
    }
  },

  connectSocket: (): void => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket: Socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: (): void => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
