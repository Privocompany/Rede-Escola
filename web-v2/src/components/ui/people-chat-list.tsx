"use client";

import { Plus, Settings, X, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DEMO_GROUPS = [
  {
    id: "g1",
    name: "HextaUI Team",
    avatar: "https://hextaui.com/favicon.ico",
    lastMessage: "Release v2.0 is live!",
    unread: 2,
  },
  {
    id: "g2",
    name: "Designers",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=designers",
    lastMessage: "Check the new Figma file.",
    unread: 0,
  },
];

type StatusType = "online" | "dnd" | "offline";
const DEMO_PEOPLE = [
  {
    id: "u1",
    name: "Alice",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
    lastMessage: "Let me know if you need help.",
    unread: 1,
    status: "online" as StatusType,
  },
  {
    id: "u2",
    name: "Bob",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=bob",
    lastMessage: "Thanks for the info!",
    unread: 0,
    status: "dnd" as StatusType,
  },
  {
    id: "u3",
    name: "Charlie",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=charlie",
    lastMessage: "See you at 5pm.",
    unread: 3,
    status: "offline" as StatusType,
  },
];

const STATUS_COLORS: Record<StatusType, string> = {
  online: "bg-green-500",
  dnd: "bg-red-500",
  offline: "bg-gray-400",
};

function StatusDot({ status }: { status: StatusType }) {
  return (
    <span
      aria-label={status}
      className={cn(
        "inline-block size-2.5 rounded-full border-2 border-white",
        STATUS_COLORS[status]
      )}
    />
  );
}

export function PeopleChatList({
  className,
  onClose,
  onPersonClick,
}: {
  className?: string;
  onClose?: () => void;
  onPersonClick?: (person: any) => void;
}) {
  const [search, setSearch] = useState("");
  const filteredGroups = DEMO_GROUPS.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredPeople = DEMO_PEOPLE.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={cn(
        "flex flex-col w-full bg-white rounded-[2rem] shadow-float border border-ui-divider/40 overflow-hidden",
        className
      )}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-ui-divider/20">
        <h2 className="font-black text-lg tracking-tight text-text-primary">Chats</h2>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-ui-wash rounded-xl transition-all text-text-secondary">
            <Plus className="size-5" />
          </button>
          <button className="p-2 hover:bg-ui-wash rounded-xl transition-all text-text-secondary">
            <Settings className="size-5" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-ui-wash rounded-xl transition-all text-text-secondary md:hidden">
              <X className="size-5" />
            </button>
          )}
        </div>
      </header>

      <div className="px-5 py-3">
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-4 text-text-placeholder" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar pessoas ou grupos…"
            className="w-full h-11 pl-10 pr-4 bg-ui-wash/50 border-none rounded-2xl text-sm font-bold text-text-primary placeholder:text-text-placeholder focus:ring-2 focus:ring-brand-purple/20 transition-all outline-none"
            value={search}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-hide pb-6">
        {/* Groups */}
        <section className="mb-4">
          <h3 className="px-6 py-2 font-black text-[10px] uppercase tracking-widest text-text-placeholder">Grupos</h3>
          <div className="space-y-0.5">
            {filteredGroups.length === 0 ? (
              <p className="px-6 py-2 text-xs font-bold text-text-placeholder italic text-center">Nenhum grupo encontrado.</p>
            ) : (
              filteredGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => onPersonClick?.(group)}
                  className="flex w-full items-center gap-4 px-6 py-3 text-left hover:bg-ui-wash transition-all group"
                >
                  <div className="size-11 rounded-2xl overflow-hidden border border-ui-divider/40 flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <img alt={group.name} src={group.avatar} className="size-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col ">
                    <span className="truncate font-black text-sm text-text-primary tracking-tight">{group.name}</span>
                    <span className="truncate text-text-secondary text-xs font-medium">{group.lastMessage}</span>
                  </div>
                  {group.unread > 0 && (
                    <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-brand-purple text-[10px] font-black text-white shadow-lg shadow-brand-purple/20">
                      {group.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </section>

        {/* Direct Messages */}
        <section>
          <h3 className="px-6 py-2 font-black text-[10px] uppercase tracking-widest text-text-placeholder">Mensagens Diretas</h3>
          <div className="space-y-0.5">
            {filteredPeople.length === 0 ? (
              <p className="px-6 py-2 text-xs font-bold text-text-placeholder italic text-center">Ninguém encontrado.</p>
            ) : (
              filteredPeople.map((person) => (
                <button
                  key={person.id}
                  onClick={() => onPersonClick?.(person)}
                  className="flex w-full items-center gap-4 px-6 py-3 text-left hover:bg-ui-wash transition-all group"
                >
                  <div className="relative flex flex-shrink-0 items-end">
                    <div className="size-11 rounded-2xl overflow-hidden border border-ui-divider/40 group-hover:scale-105 transition-transform shadow-sm">
                       <img alt={person.name} src={person.avatar} className="size-full object-cover" />
                    </div>
                    <span className="absolute -bottom-1 -right-1">
                      <StatusDot status={person.status} />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-black text-sm text-text-primary tracking-tight">{person.name}</span>
                    <span className="truncate text-text-secondary text-xs font-medium">{person.lastMessage}</span>
                  </div>
                  {person.unread > 0 && (
                    <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-brand-purple text-[10px] font-black text-white shadow-lg shadow-brand-purple/20">
                      {person.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
