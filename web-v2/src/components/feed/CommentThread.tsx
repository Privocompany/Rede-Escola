"use client";

import { type MockComment } from "@/lib/mock-data";
import { ArrowUp, ArrowDown, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

function Comment({
  comment,
  depth = 0,
}: {
  comment: MockComment;
  depth?: number;
}) {
  return (
    <div className={cn("flex gap-2.5", depth > 0 && "mt-2")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className={cn(
          "rounded-full object-cover flex-shrink-0 border border-ui-divider",
          depth === 0 ? "w-7 h-7" : "w-5 h-5"
        )}
      />
      <div className="flex-1 min-w-0">
        {/* Author meta */}
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span
            className={cn(
              "font-bold text-text-primary",
              depth === 0 ? "text-[13px]" : "text-[12px]",
              comment.author.role === "PROFESSOR" && "text-brand-blue",
              comment.author.role === "DIRETOR" && "text-brand-purple"
            )}
          >
            {comment.author.name}
          </span>

          {comment.isOP && (
            <span className="bg-brand-blue text-white text-[8px] px-1 rounded-sm uppercase font-bold tracking-wider leading-tight">
              OP
            </span>
          )}

          {comment.author.role === "PROFESSOR" && (
            <span className="bg-brand-blue/10 text-brand-blue text-[8px] px-1.5 rounded-full font-bold uppercase tracking-wider">
              Prof
            </span>
          )}

          {comment.author.role === "DIRETOR" && (
            <span className="bg-brand-purple/10 text-brand-purple text-[8px] px-1.5 rounded-full font-bold uppercase tracking-wider">
              Dir
            </span>
          )}

          <span className="text-[10px] text-text-placeholder">
            {comment.timestamp}
          </span>
        </div>

        {/* Content */}
        <p
          className={cn(
            "text-text-primary",
            depth === 0 ? "text-[13px]" : "text-[12px]"
          )}
        >
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-1.5 text-text-secondary">
          <div className="flex items-center gap-1">
            <button className="hover:text-brand-orange smooth p-0.5 rounded">
              <ArrowUp size={12} strokeWidth={2.5} />
            </button>
            <span className="text-[10px] font-bold">{comment.votes}</span>
            <button className="hover:text-brand-blue smooth p-0.5 rounded">
              <ArrowDown size={12} strokeWidth={2.5} />
            </button>
          </div>
          <button className="text-[11px] font-bold hover:text-brand-purple smooth flex items-center gap-1">
            <CornerDownRight size={10} />
            Responder
          </button>
        </div>

        {/* Nested replies with Reddit-style thread line */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 pl-2 border-l-2 border-ui-divider hover:border-text-placeholder smooth space-y-2">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentThread({
  comments,
}: {
  comments: MockComment[];
}) {
  if (comments.length === 0) {
    return (
      <p className="text-[12px] text-text-placeholder italic py-2">
        Seja o primeiro a comentar...
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
