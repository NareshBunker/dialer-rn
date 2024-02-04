import DayJS from 'dayjs';
import DayJSUtc from 'dayjs/plugin/utc';
import DayJSTimezone from 'dayjs/plugin/timezone';
import DayJSDuration from 'dayjs/plugin/duration';
import DayJSRelativeTime from 'dayjs/plugin/relativeTime';
DayJS.extend(DayJSUtc);
DayJS.extend(DayJSTimezone);
DayJS.extend(DayJSDuration);
DayJS.extend(DayJSRelativeTime);

const currentDate = new Date();

const getTimezone = (): string => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz.toLowerCase().includes('unknown') || !tz) {
    return 'Europe/London';
  }
  return tz;
};

const getTimezoneShort = (): string => {
  const date = Intl.DateTimeFormat('en-US', { timeZoneName: 'long' }).format(
    new Date()
  );
  const tzLong = date.split(', ')[1];
  if (!tzLong.includes('GMT')) {
    return tzLong
      .split(' ')
      .map((w) => w[0])
      .join('');
  }
  return tzLong;
};

export const timezonedTime = (date: Date): Date =>
  DayJS(date).tz(getTimezone()).toDate();

export const diffTimeHuman = (date: Date): string => {
  const targetDate = DayJS(timezonedTime(date));
  return targetDate
    .fromNow()
    .replace(' days', 'd')
    .replace(' months', 'm')
    .replace(' years', 'y');
};

export const dateInFormat = (date: Date, format: string) => {
  // const targetDate = DayJS(timezonedTime(date));
  const targetDate = DayJS(date);
  return targetDate.format(format);
}

export const diffInDays = (date1: Date, date2: Date): number => {
  return DayJS(date1).diff(date2, 'days');
};

export const parseTime = (date: Date): string => {
  // const tz: Date = timezonedTime(date);
  const tz: Date = date;
  const hours: number = tz.getHours();
  const minutes: number = tz.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

export const parseDate = (date: Date): string => {
  const targetDate: Date = timezonedTime(date);
  if (isToday(targetDate)) {
    return 'Today';
  }
  return targetDate.toLocaleDateString('en-US', {
    year: isCurrentYear(targetDate) ? undefined : 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function isSameDay(firstDate: Date, secondDate: Date): boolean {
  const date1: Date = timezonedTime(firstDate);
  const date2: Date = timezonedTime(secondDate);
  return date1.toDateString() === date2.toDateString();
}

export function isToday(date: Date): boolean {
  return isSameDay(date, currentDate);
}

export function isCurrentYear(date: Date): boolean {
  const targetDate: Date = timezonedTime(date);
  return targetDate.getFullYear() === timezonedTime(new Date()).getFullYear();
}

export function parseFullDate(date: Date): string {
  const dateObj: Date = timezonedTime(date);
  return dateObj.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: isCurrentYear(date) ? undefined : 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function parseHtmlAudioDuration(duration: number) {
  const hours: number = Math.floor(duration / 3600);
  const minutes: number = Math.floor((duration % 3600) / 60);
  const seconds: number = Math.floor(duration % 60);
  
  let formattedDuration: string = '';
  
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  
  if (minutes > 0) {
    formattedDuration += `${minutes}m `;
  }
  
  formattedDuration += `${seconds}s`;
  
  return formattedDuration;
}

export const createdDateHuman = (date: string): string => {
  const now: Date = new Date();
  const createdDate: Date = new Date(date);
  const daysDiff: number = diffInDays(now, createdDate);
  if (daysDiff) {
    return diffTimeHuman(createdDate);
  } else {
    return parseTime(createdDate);
  }
};

export const defaultFormat = (date: Date, withTz = false): string => {
  const dateObj: Date = timezonedTime(date);
  const tz = getTimezoneShort();
  let result = DayJS(dateObj).format('YYYY-MM-DD HH:mm:ss');
  if (withTz) {
    result += ` ${tz}`;
  }
  return result;
};
