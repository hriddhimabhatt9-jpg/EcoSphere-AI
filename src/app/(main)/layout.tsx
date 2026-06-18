import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-[var(--sidebar-width)] transition-all duration-300">
        <Header />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden pb-24 md:pb-8">
          <div className="max-w-[1200px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
