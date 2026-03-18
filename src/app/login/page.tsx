"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster, toast } from "sonner";
import { LockKeyhole, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (loginUser(email, password)) {
        login({ email, password });
        toast.success("Access Granted", {
          description: "Redirecting to your secure vault...",
        });
        router.push("/dashboard");
      } else {
        toast.error("Access Denied", {
          description: "Invalid email or password. Please try again.",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      <Toaster position="top-center" richColors theme="dark" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-[#0f0f0f] border border-zinc-800/50 p-8 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Vault Login</h1>
          <p className="text-zinc-500 text-sm mt-1">Provide credentials to unlock your data</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Identity</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email Address" 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-zinc-700 text-sm" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Security Key</label>
            <div className="relative group">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-zinc-700 text-sm" 
              />
            </div>
          </div>

          <button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-zinc-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2 shadow-lg shadow-blue-900/20"
          >
            {isLoading ? "Authenticating..." : "Unlock Vault"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col items-center gap-4">
          <p className="text-zinc-500 text-xs">Don't have an account yet?</p>
          <button 
            onClick={() => router.push("/register")}
            className="text-zinc-300 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-blue-500"
          >
            Create Security Identity
          </button>
        </div>
      </motion.div>
      
      <p className="mt-8 text-zinc-600 text-[10px] uppercase tracking-[0.2em]">End-to-End Encrypted Storage</p>
    </div>
  );
}