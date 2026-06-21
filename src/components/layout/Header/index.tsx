"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { getInitials } from "@/lib/utils";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 right-0 h-[var(--header-height)] bg-bg-secondary/80 backdrop-blur-md border-b border-border z-20 flex items-center justify-between px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input
            type="text"
            placeholder="Search for actions, lessons, or friends..."
            className="w-full bg-bg-tertiary border border-border rounded-full h-9 pl-9 pr-4 text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-bg-tertiary">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium leading-tight">{session?.user?.name || "Eco Explorer"}</span>
            <span className="text-xs text-accent-green font-medium">Level 5 • 850 XP</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-eco flex items-center justify-center text-xs font-bold text-white uppercase overflow-hidden">
            {session?.user?.image ? (
              <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
            ) : (
              getInitials(session?.user?.name || "Eco Explorer")
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
