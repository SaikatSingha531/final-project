export interface User {
  email: string;
  password: string;
}

export interface PasswordItem {
  id: number;
  site: string;
  username: string;
  password: string;
  userEmail: string;
}

export interface PasswordFormData {
  site: string;
  username: string;
  password: string;
}