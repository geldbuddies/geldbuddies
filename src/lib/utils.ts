import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(month: number, year: number) {
  const months = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  return `${months[month - 1]} ${year}`;
}

export function calculateAge(
  birthMonth: number,
  birthYear: number,
  currentMonth: number,
  currentYear: number
) {
  if (currentMonth < birthMonth) {
    return currentYear - birthYear - 1;
  }

  return currentYear - birthYear;
}
