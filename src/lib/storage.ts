
import { PasswordItem } from "@/typescript/global";

export const getPasswords = (): PasswordItem[] => {
  return JSON.parse(localStorage.getItem("passwords") || "[]");
};

export const savePasswords = (data: PasswordItem[]) => {
  localStorage.setItem("passwords", JSON.stringify(data));
};