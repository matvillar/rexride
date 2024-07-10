import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return 'No Threads';
  } else {
    const threadCount = count.toString().padStart(2, '0');
    const threadWord = count === 1 ? 'Thread' : 'Threads';
    return `${threadCount} ${threadWord}`;
  }
}
export function toCapitalize(str: string): string | undefined {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export function formatDateFromIso(isoDate: string | Date): string {
  const date = new Date(isoDate);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', dateOptions);
}

// Function to format the time part
export function formatTimeFromIso(isoDate: string | Date): string {
  const date = new Date(isoDate);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const timeString = date
    .toLocaleTimeString('en-US', timeOptions)
    .toLowerCase();
  return timeString.replace(' ', '');
}
