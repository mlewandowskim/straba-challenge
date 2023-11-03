import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000`
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}
