"use client";

import { mockPosts } from "@/lib/mock-data";
import StoriesTray from "./StoriesTray";
import PostCard from "./PostCard";
import { PenSquare } from "lucide-react";

export default function MainFeed() {
  return (
    <div className="space-y-4">
      {/* Stories Tray */}
      <StoriesTray />

      {/* Create Post bar */}
      <div className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 px-4 py-3 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pravatar.cc/150?img=33"
          alt="Meu perfil"
          className="w-9 h-9 rounded-full border border-ui-divider flex-shrink-0"
        />
        <button className="flex-1 text-left bg-ui-wash hover:bg-ui-divider smooth rounded-2xl px-4 py-2.5 text-text-placeholder text-[14px] font-medium">
          O que está acontecendo na escola?
        </button>
        <button className="text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20 smooth p-2 rounded-xl">
          <PenSquare size={18} />
        </button>
      </div>

      {/* Posts */}
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Load more indicator */}
      <div className="text-center pb-8">
        <p className="text-text-placeholder text-sm font-medium">
          Você está em dia com as novidades! 🎉
        </p>
      </div>
    </div>
  );
}
