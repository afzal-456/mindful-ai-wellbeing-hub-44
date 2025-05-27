// src/lib/auth.ts
const ADMIN_EMAILS = [
  'aaashu1666@gmail.com',
  '22cs76@ecajmer.ac.in',
  '22cs75@ecajmer.ac.in',
  '22cs73@ecajmer.ac.in',
  '22cs75@ecajmer.ac.in'
];

export interface UserSession {
  email: string;
  name: string;
  isAdmin: boolean;
  token?: string;
}

export const isAdminUser = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
};

export const storeUserSession = (user: UserSession) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', 'true');
};

export const getUserSession = (): UserSession | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const clearUserSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
};