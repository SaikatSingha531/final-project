"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ShieldCheck, LogOut, LayoutDashboard, User } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.info("Session Terminated", {
      description: "You have been securely logged out.",
    });
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Navigation */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push("/dashboard")}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-all text-sm font-medium"
          >
            <div className="p-1.5 rounded-lg bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span className="hidden md:block">Dashboard</span>
          </button>
        </div>

        {/* Center: Branding */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <div className="bg-blue-600 p-1 rounded-lg shadow-lg shadow-blue-600/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tighter text-white">
            VAULT<span className="text-blue-500 text-sm ml-0.5 tracking-widest opacity-80 font-light underline underline-offset-4 decoration-blue-500/30">SAFE</span>
          </span>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4">
          {/* User Badge (Optional: shows current user initial/email) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[100px]">
              {user?.email || "Secure User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 text-zinc-900 hover:bg-red-500 hover:text-white transition-all text-xs font-bold active:scale-95 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
}