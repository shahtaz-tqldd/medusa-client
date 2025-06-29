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
