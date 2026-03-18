"use client";

import { useEffect, useState } from "react";
import { decrypt } from "@/lib/crypto";
import { getPasswords, savePasswords } from "@/lib/storage";
import { useAuthStore } from "@/store/useAuthStore";
import { PasswordItem } from "@/typescript/global";
import { toast } from "sonner";
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Globe, 
  User as UserIcon, 
  ShieldCheck,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PasswordList() {
  const { user } = useAuthStore();
  const [data, setData] = useState<PasswordItem[]>([]);
  const [show, setShow] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const load = () => {
    const all = getPasswords();
    if (!user) return;

    const filtered = all.filter((i) => i.userEmail === user.email);
    setData(filtered);
  };

  useEffect(() => {
    load();
  }, [user]);

  const deleteItem = (id: number) => {
    const all = getPasswords();
    savePasswords(all.filter((i) => i.id !== id));
    load();
    toast.error("Entry deleted from vault");
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const filteredData = data.filter(item => 
    item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* List Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            Your Secured Vault
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Manage your encrypted credentials</p>
        </div>

        <div className="relative group min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search site or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-zinc-800 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm text-zinc-200"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
          <Globe className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
          <p className="text-zinc-500 font-medium">No credentials found</p>
        </div>
      )}

      {/* Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f0f0f] border border-zinc-800/50 p-5 rounded-2xl hover:border-zinc-700 transition-all group shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/10">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 capitalize">{item.site}</h3>
                    <div className="flex items-center gap-1 text-zinc-500 text-xs">
                      <UserIcon className="w-3 h-3" />
                      {item.username}
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Box */}
              <div className="bg-[#161616] border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between">
                <code className="text-blue-400 font-mono text-sm tracking-wider">
                  {show[item.id] ? decrypt(item.password) : "••••••••••••"}
                </code>
                <button 
                  onClick={() => setShow({ ...show, [item.id]: !show[item.id] })}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors p-1"
                >
                  {show[item.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button 
                  onClick={() => copy(decrypt(item.password))}
                  className="flex-1 bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Copy size={14} />
                  Copy
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="w-10 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/50 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}