import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import NoChatSelected from "@/components/NoChatSelected";
import ChatContainer from "@/components/ChatContainer";

const HomePage = () => {
  const { selectedUser, getUsers } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    // Initialize users when component mounts
    if (authUser) {
      getUsers();
    }
  }, [authUser, getUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-divine-indigo via-divine-purple to-divine-indigo">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="glass-card rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] divine-glow">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
