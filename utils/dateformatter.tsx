export function formatToReadableDate(timestamp: string): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  let hours = date.getUTCHours();
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${formattedDate} - ${hours}${period} UTC`;
}

export function formatDateWithRelativeTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);

  const today: Date = new Date();
  const timeDifference: number = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  let relativeTime: string;
  if (timeDifference === 0) {
    relativeTime = "today";
  } else if (timeDifference === 1) {
    relativeTime = "yesterday";
  } else {
    relativeTime = `${timeDifference} days ago`;
  }

  return `${formattedDate} (${relativeTime})`;
}
