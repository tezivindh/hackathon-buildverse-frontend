import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { Socket } from "socket.io-client";

interface User {
  _id: string;
  email: string;
  username: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt: string;
}

interface MessageData {
  text?: string;
  image?: string;
}

interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: MessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async (): Promise<void> => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get<User[]>("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      console.error("Error fetching users:", error);

      // Provide fallback demo users when backend is not available
      const demoUsers: User[] = [
        {
          _id: "demo1",
          email: "arjuna@kurukshetra.com",
          username: "Arjuna",
        },
        {
          _id: "demo2",
          email: "bhima@pandava.com",
          username: "Bhima",
        },
        {
          _id: "demo3",
          email: "yudhishthira@dharma.com",
          username: "Yudhishthira",
        },
      ];

      set({ users: demoUsers });

      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        toast.error("Chat server is offline. Showing demo users.");
      } else {
        toast.error(error.response?.data?.message || "Unable to load users");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string): Promise<void> => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      console.error("Error fetching messages:", error);

      // Provide fallback demo messages
      const demoMessages: Message[] = [
        {
          _id: "msg1",
          senderId: userId,
          receiverId: useAuthStore.getState().authUser?._id || "current",
          text: "Namaste! Welcome to Krishna Saarthi. This is a demo message since the chat server is offline.",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "msg2",
          senderId: useAuthStore.getState().authUser?._id || "current",
          receiverId: userId,
          text: "Thank you for the warm welcome! I'm excited to be part of this spiritual community.",
          createdAt: new Date(Date.now() - 60000).toISOString(),
        },
      ];

      set({ messages: demoMessages });

      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        toast.error("Chat server is offline. Showing demo conversation.");
      } else {
        toast.error(error.response?.data?.message || "Unable to load messages");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: MessageData): Promise<void> => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post<Message>(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      console.error("Error sending message:", error);

      // Create a demo message when backend is offline
      const demoMessage: Message = {
        _id: `demo_${Date.now()}`,
        senderId: useAuthStore.getState().authUser?._id || "current",
        receiverId: selectedUser._id,
        text: messageData.text,
        image: messageData.image,
        createdAt: new Date().toISOString(),
      };

      set({ messages: [...messages, demoMessage] });

      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        toast.error("Chat server is offline. Message saved locally.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send message");
      }
    }
  },

  subscribeToMessages: (): void => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket: Socket | null = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: (): void => {
    const socket: Socket | null = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser: User): void => set({ selectedUser }),
}));
