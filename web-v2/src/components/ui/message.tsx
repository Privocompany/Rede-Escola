"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Componente Base de Mensagem (Wrapper)
 */
export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  from: "user" | "assistant" | "system";
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end gap-2 py-3 px-1",
      from === "user" ? "flex-row-reverse" : "flex-row",
      "[&>div]:max-w-[80%]",
      className
    )}
    {...props}
  />
);

/**
 * Conteúdo da Mensagem (Bolha)
 */
export interface MessageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  from: "user" | "assistant" | "system";
}

export const MessageContent = ({
  children,
  className,
  from,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-2xl text-[14.5px] px-4 py-2.5 overflow-hidden shadow-sm transition-all duration-200",
      from === "user" 
        ? "bg-brand-purple text-white rounded-tr-none font-medium shadow-brand-purple/10" 
        : "bg-white text-text-primary rounded-tl-none border border-ui-divider/40 font-semibold",
      className
    )}
    {...props}
  >
    <div className="leading-relaxed">{children}</div>
  </div>
);

/**
 * Avatar da Mensagem
 */
export interface MessageAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
}

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <div
    className={cn(
      "size-8 rounded-full ring-1 ring-ui-divider/60 overflow-hidden bg-ui-wash shrink-0 flex items-center justify-center shadow-sm",
      className
    )}
    {...props}
  >
    {src ? (
      <img src={src} alt={name || "Avatar"} className="w-full h-full object-cover" />
    ) : (
      <span className="text-[10px] font-black text-brand-purple uppercase">
        {name?.slice(0, 2) || "ME"}
      </span>
    )}
  </div>
);
