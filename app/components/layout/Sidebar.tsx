"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Wallet 
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Gamepad2,
  },
  {
    title: "My Lineups",
    url: "/my-lineups",
    icon: Users,
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currency = "USD"

  const handleDebug = async () => {
    const params = {
      event_id: 7148,
      event_name: "PGL CS2 Major Copenhagen2024"
    };

    const res = await fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)  // ⬅️ FIX HERE (remove {params})
    });

    const json = await res.json();
    console.log(json);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        
        {/* Neon Effects */}
        <style>{`
          :root {
            --neon-green: #00FF88;
            --neon-purple: #9945FF;
            --card-glow: 0 0 20px rgba(153, 69, 255, 0.3);
          }

          .glow-border {
            border: 1px solid rgba(153, 69, 255, 0.3);
            box-shadow: var(--card-glow);
          }
          
          .glow-border:hover {
            border-color: rgba(153, 69, 255, 0.6);
            box-shadow: 0 0 30px rgba(153, 69, 255, 0.5);
          }

          .neon-text {
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
          }
        `}</style>

        {/* Sidebar */}
        <Sidebar className="border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl w-75">
          
          <SidebarHeader className="border-b border-slate-800 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9945FF] to-[#00FF88] rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-black text-lg">Esports Arena [{currency}]</h2>
              </div>
            </div>
          </SidebarHeader>
          <button onClick={handleDebug}>DEBUG</button>

          <SidebarContent className="p-2">
            
            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-slate-800/50 transition-all duration-200 rounded-lg mb-1 ${
                          pathname === item.url
                            ? "bg-gradient-to-r from-[#9945FF]/20 to-[#00FF88]/20 text-black border-l-2 border-[#00FF88]"
                            : "text-slate-400"
                        }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Wallet */}
            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider px-3 py-2">
                Wallet
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <div className="px-3 py-3 mx-2 rounded-lg bg-black border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-[#00FF88]" />
                    <span className="text-md text-slate-300">Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-white">$250.00</p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">P</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">Player</p>
                <p className="text-xs text-slate-500 truncate">Level 5 • Gold</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile Top Bar */}
        <main className="flex-1 flex flex-col">
          <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-800 px-6 py-4 lg:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-800 p-2 rounded-lg transition-colors duration-200 text-white" />
              <h1 className="text-xl font-semibold text-white">ESPORTS FANTASY</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>

      </div>
    </SidebarProvider>
  );
}
