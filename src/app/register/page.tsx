"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { Toaster, toast } from "sonner";
import { UserPlus, Mail, LockKeyhole, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    if (!email || !password) {
      toast.error("Required Fields", { description: "Please fill in all fields." });
      return;
    }

    setIsLoading(true);

    // Subtle delay for a professional processing feel
    setTimeout(() => {
      if (registerUser(email, password)) {
        toast.success("Identity Created", {
          description: "Your secure vault is ready. Please log in.",
        });
        router.push("/login");
      } else {
        toast.error("Registration Failed", {
          description: "This email is already associated with an identity.",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      <Toaster position="top-center" richColors theme="dark" />

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] bg-[#0f0f0f] border border-zinc-800/50 p-8 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/20">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create Identity</h1>
          <p className="text-zinc-500 text-sm mt-1">Start securing your digital assets today</p>
        </div>

        <div className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 ml-1 text-zinc-500">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@provider.com" 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 text-sm" 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Master Password</label>
            <div className="relative group">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 text-sm" 
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleRegister} 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-zinc-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/20"
            >
              {isLoading ? "Generating Vault..." : "Register Identity"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col items-center gap-4">
          <p className="text-zinc-500 text-xs">By registering, you agree to secure encryption protocols.</p>
          <button 
            onClick={() => router.push("/login")}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Secure Login
          </button>
        </div>
      </motion.div>
      
      <div className="mt-8 flex items-center gap-2 text-zinc-600">
        <ShieldCheck className="w-4 h-4" />
        <p className="text-[10px] uppercase tracking-[0.2em]">Zero-Knowledge Architecture</p>
      </div>
    </div>
  );
}