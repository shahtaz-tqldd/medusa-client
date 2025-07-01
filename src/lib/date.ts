export function getDuration(
  startDate: Date | string,
  endDate: Date | string = new Date()
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Adjust if months go negative
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const yearText = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
  const monthText = months > 0 ? `${months} mo${months !== 1 ? "s" : ""}` : "";

  return [yearText, monthText].filter(Boolean).join(" ") || "0 month";
}

export function formatTimeFromNow(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return `${diffSeconds} sec${diffSeconds !== 1 ? "s" : ""} ago`;
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
  }

  if (diffHours < 24 && now.toDateString() === date.toDateString()) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const formatTime = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (diffDays === 1 || date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${formatTime}`;
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
