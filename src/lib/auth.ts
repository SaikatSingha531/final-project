// import { User } from "@/types";

import { User } from "@/typescript/global";

export const registerUser = (email: string, password: string): boolean => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const exists = users.find((u) => u.email === email);
  if (exists) return false;

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

export const loginUser = (email: string, password: string): boolean => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
  return false;
};