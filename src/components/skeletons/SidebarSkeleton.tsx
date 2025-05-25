import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-white/10 flex flex-col transition-all duration-200 bg-black/10">
      <div className="border-b border-white/10 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-divine-gold" />
          <span className="font-medium hidden lg:block text-divine-ivory">
            Seekers
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="h-4 w-32 mb-2 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
