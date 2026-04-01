"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { PeopleChatList } from "./people-chat-list";
import { ChatConversationScreen } from "./chat-conversation-screen";

export interface Character {
  id?: string | number;
  emoji: string;
  name: string;
  online: boolean;
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientColors?: string;
  avatar?: string;
}

export interface MessageDockProps {
  characters?: Character[];
  onMessageSend?: (message: string, character: Character, characterIndex: number) => void;
  onCharacterSelect?: (character: Character, characterIndex: number) => void;
  onDockToggle?: (isExpanded: boolean) => void;
  className?: string;
  expandedWidth?: number;
  position?: "bottom" | "top";
  showSparkleButton?: boolean;
  showMenuButton?: boolean;
  enableAnimations?: boolean;
  animationDuration?: number;
  placeholder?: (characterName: string) => string;
  theme?: "light" | "dark" | "auto";
  autoFocus?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  closeOnSend?: boolean;
}

const defaultCharacters: Character[] = [
  { emoji: "✨", name: "Destaque", online: false },
  {
    emoji: "👩‍🏫",
    name: "Prof. Ana Clara",
    online: true,
    avatar: "https://i.pravatar.cc/150?u=ana_clara",
    backgroundColor: "bg-brand-purple/10",
    gradientColors: "#6835D6, #EBE7F9",
  },
  {
    emoji: "👩‍💼",
    name: "Diretora Lucia",
    online: true,
    avatar: "https://i.pravatar.cc/150?u=lucia_dir",
    backgroundColor: "bg-brand-blue/10",
    gradientColors: "#00B2F7, #E6F7FE",
  },
  {
    emoji: "👦",
    name: "Matheus Silva",
    online: true,
    avatar: "https://i.pravatar.cc/150?u=matheus_silva",
    backgroundColor: "bg-brand-yellow/10",
    gradientColors: "#FFCA28, #FFF9E6",
  },
  {
    emoji: "👨‍💻",
    name: "André (Monitor)",
    online: false,
    avatar: "https://i.pravatar.cc/150?u=andre_dev",
    backgroundColor: "bg-brand-orange/10",
    gradientColors: "#FF4500, #FFEBE6",
  },
];

const getGradientColors = (character: Character) => character.gradientColors || "#6835D6, #EBE7F9";

export function MessageDock({
  characters = defaultCharacters,
  onMessageSend,
  onCharacterSelect,
  onDockToggle,
  className,
  expandedWidth = 448,
  position = "bottom",
  showSparkleButton = true,
  showMenuButton = true,
  enableAnimations = true,
  animationDuration = 1,
  placeholder = (name: string) => `Conversar com ${name}...`,
  theme = "light",
  autoFocus = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  closeOnSend = true,
}: MessageDockProps) {
  const shouldReduceMotion = useReducedMotion();
  const [expandedCharacter, setExpandedCharacter] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const dockRef = useRef<HTMLDivElement>(null);
  const [collapsedWidth, setCollapsedWidth] = useState<number>(266);
  const [showHistory, setShowHistory] = useState(false);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Measure the TRUE initial collapsed width only once on first mount
  useEffect(() => {
    if (dockRef.current && !hasInitialized) {
      const width = dockRef.current.offsetWidth;
      if (width > 0) {
        setCollapsedWidth(width);
        setHasInitialized(true);
      }
    }
  }, [hasInitialized]);

  // Click outside handler
  useEffect(() => {
    if (!closeOnClickOutside) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setExpandedCharacter(null);
        setMessageInput("");
        setShowHistory(false);
        setActiveChat(null);
        onDockToggle?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickOutside, onDockToggle]);

  const containerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8, staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const hoverAnimation = shouldReduceMotion ? { scale: 1.02 } : { scale: 1.05, y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } };

  const handleCharacterClick = (index: number) => {
    const character = characters[index];
    if (expandedCharacter === index) {
      setExpandedCharacter(null);
      setMessageInput("");
      onDockToggle?.(false);
    } else {
      setExpandedCharacter(index);
      setShowHistory(false);
      onCharacterSelect?.(character, index);
      onDockToggle?.(true);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      setExpandedCharacter(null);
      onDockToggle?.(false);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && expandedCharacter !== null) {
      onMessageSend?.(messageInput, characters[expandedCharacter], expandedCharacter);
      setMessageInput("");
      if (closeOnSend) {
        setExpandedCharacter(null);
        onDockToggle?.(false);
      }
    }
  };

  const selectedCharacter = expandedCharacter !== null ? characters[expandedCharacter] : null;
  const isExpanded = expandedCharacter !== null;
  const positionClasses = position === "top" ? "fixed top-6 right-8 z-[100] px-4" : "fixed bottom-6 right-8 z-[100] px-4";

  return (
    <motion.div ref={dockRef} className={cn(positionClasses, className)} initial={enableAnimations ? "hidden" : "visible"} animate="visible" variants={enableAnimations ? containerVariants : {}}>
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.8, y: 20 }} 
            className="absolute bottom-full right-4 mb-4 w-[350px] z-[60]"
          >
            {activeChat ? (
              <ChatConversationScreen 
                onClose={() => {
                  setActiveChat(null);
                  setShowHistory(false);
                }} 
              />
            ) : (
              <PeopleChatList 
                onClose={() => setShowHistory(false)} 
                onPersonClick={(person) => {
                  setActiveChat(person);
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="rounded-full px-4 py-2 shadow-float border border-ui-divider/40 backdrop-blur-md"
        animate={{
          width: isExpanded ? expandedWidth : collapsedWidth,
          background: isExpanded && selectedCharacter ? `linear-gradient(to right, ${getGradientColors(selectedCharacter)})` : theme === "dark" ? "#050505" : "#ffffff",
        }}
        transition={enableAnimations ? { type: "spring", stiffness: isExpanded ? 300 : 500, damping: isExpanded ? 30 : 35, mass: isExpanded ? 0.8 : 0.6 } : { duration: 0 }}
      >
        <div className="flex items-center gap-2 relative">
          {showSparkleButton && (
            <motion.div className="flex items-center justify-center shrink-0" animate={{ opacity: isExpanded ? 0 : 1, x: isExpanded ? -20 : 0, scale: isExpanded ? 0.8 : 1 }}>
              <motion.button className="w-12 h-12 flex items-center justify-center cursor-pointer" whileHover={!isExpanded ? hoverAnimation : undefined} whileTap={{ scale: 0.95 }}>
                <span className="text-2xl">✨</span>
              </motion.button>
            </motion.div>
          )}

          <motion.div className="w-px h-6 bg-ui-divider mr-2 -ml-2" animate={{ opacity: isExpanded ? 0 : 1, scaleY: isExpanded ? 0 : 1 }} transition={{ delay: isExpanded ? 0 : 0.3 }} />

          <div className="flex items-center gap-2">
            {characters.slice(1, -1).map((character, index) => {
              const actualIndex = index + 1;
              const isSelected = expandedCharacter === actualIndex;
              return (
                <motion.div key={character.name} className={cn("relative", isSelected && isExpanded && "absolute left-1 top-0 z-20")} style={{ width: isSelected && isExpanded ? 0 : "auto", minWidth: isSelected && isExpanded ? 0 : "auto" }} animate={{ opacity: isExpanded && !isSelected ? 0 : 1, y: isExpanded && !isSelected ? 60 : 0, scale: isExpanded && !isSelected ? 0.8 : 1 }}>
                  <motion.button className={cn("relative w-10 h-10 rounded-full flex items-center justify-center text-xl cursor-pointer overflow-hidden", isSelected && isExpanded ? "bg-white shadow-md text-brand-purple" : character.backgroundColor || "bg-ui-wash")} onClick={() => handleCharacterClick(actualIndex)} whileHover={!isExpanded ? hoverAnimation : { scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {character.avatar ? <img src={character.avatar} alt={character.name} className="size-full object-cover" /> : <span className="text-2xl leading-none">{character.emoji}</span>}
                    {character.online && <motion.div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-blue border-2 border-white rounded-full" animate={{ scale: isExpanded && !isSelected ? 0 : 1 }} />}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.input
                type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); if (e.key === "Escape" && closeOnEscape) { setExpandedCharacter(null); setMessageInput(""); onDockToggle?.(false); } }}
                placeholder={placeholder(selectedCharacter?.name || "")} className={cn("w-[300px] absolute left-14 right-0 bg-transparent border-none outline-none text-sm font-bold z-50 h-10", theme === "dark" ? "text-white placeholder-white/40" : "text-text-primary placeholder-text-secondary/60")}
                autoFocus={autoFocus} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }} exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <motion.div className="w-px h-6 bg-ui-divider ml-2 -mr-2" animate={{ opacity: isExpanded ? 0 : 1, scaleY: isExpanded ? 0 : 1 }} />

          {showMenuButton && (
            <motion.div className={cn("flex items-center justify-center z-20 shrink-0", isExpanded && "absolute right-0")}>
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.button key="menu" onClick={toggleHistory} className={cn("w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-300", showHistory ? "text-brand-purple" : "text-text-primary")} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="current-color"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                  </motion.button>
                ) : (
                  <motion.button key="send" onClick={handleSendMessage} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-white disabled:opacity-50 cursor-pointer relative z-30" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} disabled={!messageInput.trim()} initial={{ opacity: 0, scale: 0, rotate: -90 }} animate={{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.25 } }} exit={{ opacity: 0, scale: 0, rotate: 90 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-purple"><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
