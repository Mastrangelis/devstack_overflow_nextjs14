import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  if (diff < minute) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
};

export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1000000) {
    if (number % 1000000 === 0) return `${number / 1000000}M`;

    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number >= 1000) {
    if (number % 1000 === 0) return `${number / 1000}K`;

    return `${(number / 1000).toFixed(1)}K`;
  } else {
    return number.toString();
  }
};
