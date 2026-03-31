"use client";

import { useState } from "react";
import { type MockPost } from "@/lib/mock-data";
import CommentThread from "./CommentThread";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const flairColors: Record<string, string> = {
  purple: "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
  blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  orange: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
  yellow: "bg-brand-yellow/20 text-yellow-700 border-brand-yellow/30",
};

export default function PostCard({ post }: { post: MockPost }) {
  const [votes, setVotes] = useState(post.votes);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(post.saved ?? false);

  const handleUpvote = () => {
    if (voted === "up") {
      setVotes(votes - 1);
      setVoted(null);
    } else {
      setVotes(voted === "down" ? votes + 2 : votes + 1);
      setVoted("up");
    }
  };

  const handleDownvote = () => {
    if (voted === "down") {
      setVotes(votes + 1);
      setVoted(null);
    } else {
      setVotes(voted === "up" ? votes - 2 : votes - 1);
      setVoted("down");
    }
  };

  const roleLabel: Record<string, string> = {
    PROFESSOR: "Prof",
    DIRETOR: "Dir",
    ALUNO: "Aluno",
    PAI: "Família",
  };

  return (
    <article className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 overflow-hidden animate-fade-in">
      {/* ── Post Header ── */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-[2.5px] bg-gradient-to-tr from-brand-yellow via-brand-blue to-brand-purple">
            <div className="bg-white p-[2px] rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[14px] text-text-primary leading-tight">
                {post.author.name}
              </h3>
              <span
                className={cn(
                  "text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
                  post.author.role === "PROFESSOR" &&
                    "bg-brand-blue/10 text-brand-blue",
                  post.author.role === "DIRETOR" &&
                    "bg-brand-purple/10 text-brand-purple",
                  post.author.role === "PAI" && "bg-gray-100 text-gray-500",
                  post.author.role === "ALUNO" &&
                    "bg-brand-yellow/20 text-yellow-700"
                )}
              >
                {roleLabel[post.author.role]}
              </span>

              {/* Flair / Tag */}
              {post.flair && (
                <span
                  className={cn(
                    "text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider",
                    flairColors[post.flair.color] ?? flairColors.purple
                  )}
                >
                  {post.flair.label}
                </span>
              )}
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">
              {post.timestamp}
            </p>
          </div>
        </div>
        <button className="text-text-placeholder hover:text-text-secondary smooth p-1 rounded-full hover:bg-ui-wash">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* ── Post Content ── */}
      <div className="px-4 pb-3">
        <p className="text-[14px] text-text-primary leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* ── Post Media ── */}
      {post.image && (
        <div className="w-full aspect-video overflow-hidden bg-ui-wash">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt="Conteúdo do post"
            className="w-full h-full object-cover smooth hover:scale-[1.02]"
          />
        </div>
      )}

      {/* ── Post Actions ── */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Upvote / Downvote (Reddit style) */}
            <div className="flex items-center gap-1 bg-ui-wash rounded-full border border-ui-divider px-2 py-1 shadow-sm">
              <button
                onClick={handleUpvote}
                className={cn(
                  "smooth rounded-full p-0.5",
                  voted === "up"
                    ? "text-brand-orange"
                    : "text-text-secondary hover:text-brand-orange"
                )}
              >
                <ArrowUp
                  size={16}
                  strokeWidth={voted === "up" ? 3 : 2}
                  className={voted === "up" ? "-translate-y-0.5 smooth" : ""}
                />
              </button>
              <span
                className={cn(
                  "text-xs font-bold px-1 min-w-[2ch] text-center",
                  voted === "up" && "text-brand-orange",
                  voted === "down" && "text-brand-blue",
                  !voted && "text-text-primary"
                )}
              >
                {votes}
              </span>
              <button
                onClick={handleDownvote}
                className={cn(
                  "smooth rounded-full p-0.5",
                  voted === "down"
                    ? "text-brand-blue"
                    : "text-text-secondary hover:text-brand-blue"
                )}
              >
                <ArrowDown
                  size={16}
                  strokeWidth={voted === "down" ? 3 : 2}
                  className={voted === "down" ? "translate-y-0.5 smooth" : ""}
                />
              </button>
            </div>

            {/* Comments */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 text-text-secondary hover:text-brand-blue smooth px-2 py-1 rounded-full hover:bg-brand-blue/10"
            >
              <MessageSquare size={16} strokeWidth={1.8} />
              {post.comments.length > 0 && (
                <span className="text-xs font-bold">
                  {post.comments.length}
                </span>
              )}
            </button>

            {/* Share */}
            <button className="text-text-secondary hover:text-brand-yellow smooth px-2 py-1 rounded-full hover:bg-brand-yellow/10">
              <Share2 size={16} strokeWidth={1.8} />
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setSaved(!saved)}
            className={cn(
              "smooth px-2 py-1 rounded-full",
              saved
                ? "text-brand-purple bg-brand-purple/10"
                : "text-text-secondary hover:text-brand-purple hover:bg-brand-purple/10"
            )}
          >
            <Bookmark
              size={16}
              strokeWidth={1.8}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-ui-divider/70 animate-slide-in">
            <CommentThread comments={post.comments} />

            {/* Comment input */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ui-divider/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.pravatar.cc/150?img=33"
                alt="Seu perfil"
                className="w-7 h-7 rounded-full border border-ui-divider flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Adicionar comentário..."
                className="flex-1 bg-ui-wash rounded-full px-3 py-1.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none focus:ring-2 focus:ring-brand-blue/30 smooth border border-transparent focus:border-brand-blue/20"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
