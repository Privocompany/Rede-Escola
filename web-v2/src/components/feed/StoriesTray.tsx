"use client";

import { mockStories, type MockStory } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function StoryItem({ story }: { story: MockStory }) {
  if (story.isOwn) {
    return (
      <button className="flex flex-col items-center gap-1.5 min-w-[64px] group">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-ui-divider smooth group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.user.avatar}
              alt={story.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-blue rounded-full border-2 border-white flex items-center justify-center">
            <Plus size={10} strokeWidth={3} className="text-white" />
          </div>
        </div>
        <span className="text-[11px] font-semibold text-text-secondary truncate w-full text-center">
          Meu dia
        </span>
      </button>
    );
  }

  return (
    <button className="flex flex-col items-center gap-1.5 min-w-[64px] group">
      <div
        className={cn(
          "rounded-full p-[2.5px] smooth group-hover:scale-105",
          story.seen
            ? "bg-ui-divider"
            : "bg-gradient-to-tr from-brand-yellow via-brand-blue to-brand-purple"
        )}
      >
        <div className="bg-white p-[2px] rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={story.user.avatar}
            alt={story.user.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      <span
        className={cn(
          "text-[11px] truncate w-full text-center",
          story.seen ? "text-text-secondary font-medium" : "text-text-primary font-bold"
        )}
      >
        {story.user.name.split(" ")[0]}
      </span>
    </button>
  );
}

export default function StoriesTray() {
  return (
    <div className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 p-4">
      <div className="flex gap-4 overflow-x-auto scroll-hide pb-1">
        {mockStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
