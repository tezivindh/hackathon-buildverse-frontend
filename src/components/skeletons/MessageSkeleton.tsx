const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
            {idx % 2 === 0 && (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse flex-shrink-0" />
            )}

            <div
              className={`flex flex-col ${
                idx % 2 === 1 ? "items-end" : "items-start"
              }`}
            >
              <div className="h-3 w-16 bg-white/10 rounded animate-pulse mb-1" />

              <div
                className={`rounded-2xl p-4 ${
                  idx % 2 === 1 ? "bg-divine-gold/20" : "bg-white/10"
                }`}
              >
                <div className="h-4 w-32 bg-white/10 rounded animate-pulse mb-2" />
                <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              </div>
            </div>

            {idx % 2 === 1 && (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse flex-shrink-0" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
