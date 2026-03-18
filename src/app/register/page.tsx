"use client";

import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { Toaster, toast } from "sonner";
import { UserPlus, Mail, LockKeyhole, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/services/schima";

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (registerUser(data.email, data.password)) {
      toast.success("Identity Created", {
        description: "Your secure vault is ready. Please log in.",
      });

      router.push("/login");
    } else {
      toast.error("Registration Failed", {
        description: "This email is already associated with an identity.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-emerald-500/30">
      <Toaster position="top-center" richColors theme="dark" />

      <div className="absolute w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] bg-[#0f0f0f] border border-zinc-800/50 p-8 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Create Identity</h1>
          <p className="text-zinc-500 text-sm">
            Start securing your digital assets today
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-[11px] text-zinc-500 ml-1">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />

              <input
                {...register("email")}
                placeholder="name@provider.com"
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-[11px] text-zinc-500 ml-1">
              Master Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />

              <input
                type="text"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Generating Vault..." : "Register Identity"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-500 text-xs">
            By registering, you agree to secure encryption protocols.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="flex items-center justify-center gap-2 text-zinc-400 hover:text-white text-sm mt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Secure Login
          </button>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center gap-2 text-zinc-600">
        <ShieldCheck className="w-4 h-4" />
        <p className="text-[10px] uppercase tracking-[0.2em]">
          Zero-Knowledge Architecture
        </p>
      </div>
    </div>
  );
}