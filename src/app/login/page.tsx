"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster, toast } from "sonner";
import { LockKeyhole, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/services/schima";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (loginUser(data.email, data.password)) {
      login(data);

      toast.success("Access Granted", {
        description: "Redirecting to your secure vault...",
      });

      router.push("/dashboard");
    } else {
      toast.error("Access Denied", {
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      <Toaster position="top-center" richColors theme="dark" />

      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-[#0f0f0f] border border-zinc-800/50 p-8 rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Vault Login</h1>
          <p className="text-zinc-500 text-sm">
            Provide credentials to unlock your data
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-[11px] text-zinc-500 ml-1">
              Identity
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />

              <input
                {...register("email")}
                placeholder="Email Address"
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20"
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
              Security Key
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />

              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-[#161616] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20"
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
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Authenticating..." : "Unlock Vault"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-500 text-xs">
            Don't have an account yet?
          </p>

          <button
            onClick={() => router.push("/register")}
            className="text-zinc-300 hover:text-white text-sm underline"
          >
            Create Security Identity
          </button>
        </div>
      </motion.div>
    </div>
  );
}