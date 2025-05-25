import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-white/10 flex flex-col transition-all duration-200 bg-black/10">
      <div className="border-b border-white/10 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-divine-gold" />
          <span className="font-medium hidden lg:block text-divine-ivory">
            Seekers
          </span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 text-divine-gold bg-white/10 border-white/20 rounded focus:ring-divine-gold focus:ring-2"
            />
            <span className="text-sm text-divine-lavender">
              Show online only
            </span>
          </label>
          <span className="text-xs text-divine-lavender/60">
            ({onlineUsers.length > 0 ? onlineUsers.length - 1 : 0} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-white/10 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-divine-gold/20 border-r-2 border-divine-gold"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src="/avatar.png"
                alt={user.username}
                className="w-12 h-12 object-cover rounded-full border border-divine-gold/30"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-divine-indigo" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-divine-ivory">
                {user.username}
              </div>
              <div className="text-sm text-divine-lavender/70">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-divine-lavender/60 py-4">
            <p>No seekers found</p>
            <p className="text-xs mt-2">
              Connect with fellow spiritual seekers
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
