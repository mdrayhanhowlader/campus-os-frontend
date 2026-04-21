import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, fmt = 'MMM d, yyyy') {
  return format(new Date(date), fmt);
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), 'MMM d, yyyy HH:mm');
}

export function timeAgo(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function formatPercent(value: number, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

export function getInitials(firstOrFullName: string, lastName?: string) {
  if (lastName !== undefined) {
    return `${firstOrFullName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
  }
  const parts = firstOrFullName.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return (parts[0]?.[0] ?? '').toUpperCase();
}

export function getAttendanceColor(percentage: number): string {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 75) return 'text-yellow-600';
  return 'text-red-600';
}

export function getGradeColor(grade: string): string {
  if (['A+', 'A', 'A-'].includes(grade)) return 'text-green-600';
  if (['B+', 'B', 'B-'].includes(grade)) return 'text-blue-600';
  if (['C+', 'C', 'C-'].includes(grade)) return 'text-yellow-600';
  if (['D+', 'D'].includes(grade)) return 'text-orange-600';
  return 'text-red-600';
}

export function truncate(str: string, maxLen = 50): string {
  return str.length > maxLen ? `${str.slice(0, maxLen)}…` : str;
}

export function buildQueryString(params: Record<string, unknown>): string {
  const p = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      p.append(key, String(value));
    }
  }
  return p.toString();
}
