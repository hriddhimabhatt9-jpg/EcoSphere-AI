"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { getInitials } from "@/lib/utils";

/**
 * Header — Top navigation bar for the dashboard.
 * Includes search, notifications, and user profile display.
 * Uses role='banner' for WCAG landmark compliance.
 * @returns {JSX.Element} The header component
 */
export function Header() {
  const { data: session } = useSession();

  return (
    <header role="banner" aria-label="Site header" className="sticky top-0 right-0 h-[var(--header-height)] bg-bg-secondary/80 backdrop-blur-md border-b border-border z-20 flex items-center justify-between px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search for actions, lessons, or friends..."
            aria-label="Search"
            className="w-full bg-bg-tertiary border border-border rounded-full h-9 pl-9 pr-4 text-sm focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-bg-tertiary"
          aria-label="Notifications - 1 unread"
        >
          <Bell size={20} aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium leading-tight">{session?.user?.name || "Eco Explorer"}</span>
            <span className="text-xs text-accent-green font-medium">Level 5 • 850 XP</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-eco flex items-center justify-center text-xs font-bold text-white uppercase overflow-hidden">
            {session?.user?.image ? (
              <Image src={session.user.image} alt={session.user.name || "User"} width={32} height={32} className="w-full h-full object-cover" />
            ) : (
              getInitials(session?.user?.name || "Eco Explorer")
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
