export function geDuration(startDate: Date | string): string {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
  const monthText = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

  return [yearText, monthText].filter(Boolean).join(" ");
}
