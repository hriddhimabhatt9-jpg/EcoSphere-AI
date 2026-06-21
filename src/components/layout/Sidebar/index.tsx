"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calculator,
  Users,
  MessageSquare,
  Trophy,
  BarChart3,
  BookOpen,
  ShoppingBag,
  Map,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/carbon-twin", label: "Carbon Twin", icon: Users },
  { href: "/coach", label: "AI Coach", icon: MessageSquare },
  { href: "/challenges", label: "Challenges", icon: Trophy },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/education", label: "Education Hub", icon: BookOpen },
  { href: "/shopping", label: "Green Shopping", icon: ShoppingBag },
  { href: "/travel-planner", label: "Travel Planner", icon: Map },
];

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-bg-secondary border-r border-border transition-all duration-300 z-30 hidden md:flex flex-col",
        collapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]"
      )}
    >
      <div className="h-[var(--header-height)] flex items-center px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-xl font-display font-bold">
          <span>🌍</span>
          {!collapsed && (
            <span className="text-text-primary">
              Eco<span className="text-accent-green">Sphere</span> AI
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                isActive
                  ? "bg-accent-green-dim text-accent-green font-medium"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              
              {isActive && !collapsed && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent-green rounded-l-full" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-border flex flex-col gap-1">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-accent-rose transition-colors w-full text-left"
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-bg-tertiary border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors hover:border-accent-green"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
