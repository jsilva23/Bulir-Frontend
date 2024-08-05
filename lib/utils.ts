import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBalance(balance: number = 0): string {
  return balance
    .toLocaleString('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}
