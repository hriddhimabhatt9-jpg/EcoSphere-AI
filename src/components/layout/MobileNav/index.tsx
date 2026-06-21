"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calculator, MessageSquare, Trophy, Menu } from "lucide-react";

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/calculator", label: "Calculate", icon: Calculator },
    { href: "/coach", label: "AI Coach", icon: MessageSquare },
    { href: "/challenges", label: "Challenges", icon: Trophy },
    { href: "/menu", label: "Menu", icon: Menu },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[var(--mobile-nav-height)] bg-bg-secondary border-t border-border z-30 px-2 pb-safe">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-accent-green" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
