"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PasswordForm from "@/components/PasswordForm";
import PasswordList from "@/components/PasswordList";
import { useAuthStore } from "@/store/useAuthStore";

export default function Dashboard() {
  const { user, loadUser } = useAuthStore();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return (
    <div>
      <Navbar />
      <PasswordForm refresh={() => setRefresh(!refresh)} />
      <PasswordList key={refresh.toString()} />
    </div>
  );
}