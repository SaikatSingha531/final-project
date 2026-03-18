"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Globe, User, ShieldCheck, Plus, Loader2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { encrypt } from "@/lib/crypto";
import { getPasswords, savePasswords } from "@/lib/storage";
import { useAuthStore } from "@/store/useAuthStore";
import { PasswordFormData, PasswordItem } from "@/typescript/global";
import { Passwordschema } from "@/services/schima";



export default function PasswordForm({ refresh }: any) {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(Passwordschema),
  });

  const onSubmit = (data: PasswordFormData) => {
    if (!user) {
      toast.error("Session expired. Please log in.");
      return;
    }

    const all: PasswordItem[] = getPasswords();

    all.push({
      id: Date.now(),
      site: data.site,
      username: data.username,
      password: encrypt(data.password),
      userEmail: user.email,
    });

    savePasswords(all);
    toast.success("Credential Secured", {
      description: `${data.site} added to your encrypted vault.`,
    });
    refresh();
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="bg-[#0f0f0f] border border-zinc-800/50 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600/10 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Add New Credential</h2>
            <p className="text-zinc-500 text-sm">All data is encrypted before being stored locally.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Site Input */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-1">Platform</label>
            <div className="relative group">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                placeholder="Google, Github..." 
                {...register("site")} 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm text-zinc-100 placeholder:text-zinc-700" 
              />
            </div>
            {errors.site && <p className="text-red-500 text-[10px] font-medium ml-1">{errors.site.message}</p>}
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-1">Identity</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                placeholder="Email or Username" 
                {...register("username")} 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm text-zinc-100 placeholder:text-zinc-700" 
              />
            </div>
            {errors.username && <p className="text-red-500 text-[10px] font-medium ml-1">{errors.username.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-1">Security Key</label>
            <div className="relative group">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••" 
                {...register("password")} 
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm text-zinc-100 placeholder:text-zinc-700" 
              />
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-medium ml-1">{errors.password.message}</p>}
          </div>

          <div className="md:col-span-3 flex items-center justify-between mt-4 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center gap-2 text-zinc-600 text-[10px] uppercase tracking-widest">
              <Info className="w-3 h-3" />
              <span>AES-256 Encryption Active</span>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-10 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-900/20"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Secure Entry</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}