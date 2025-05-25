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
      toast.error(error.response?.data?.message || "An error occurred");
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
      toast.error(error.response?.data?.message || "An error occurred");
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
      toast.error(error.response?.data?.message || "An error occurred");
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
