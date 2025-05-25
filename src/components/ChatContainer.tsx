import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "@/lib/util";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <p className="text-divine-lavender">No user selected</p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-black/5">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === authUser?._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
              {message.senderId !== authUser?._id && (
                <div className="w-8 h-8 rounded-full border border-divine-gold/30 overflow-hidden flex-shrink-0">
                  <img
                    src="/avatar.png"
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`flex flex-col ${
                  message.senderId === authUser?._id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div className="text-xs text-divine-lavender/60 mb-1">
                  {formatMessageTime(message.createdAt)}
                </div>

                <div
                  className={`rounded-2xl p-4 ${
                    message.senderId === authUser?._id
                      ? "bg-gradient-to-r from-divine-gold to-divine-gold-light text-divine-indigo"
                      : "glass-card text-divine-ivory"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && (
                    <p className="leading-relaxed">{message.text}</p>
                  )}
                </div>
              </div>

              {message.senderId === authUser?._id && (
                <div className="w-8 h-8 rounded-full border border-divine-gold/30 overflow-hidden flex-shrink-0">
                  <img
                    src="/avatar.png"
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
