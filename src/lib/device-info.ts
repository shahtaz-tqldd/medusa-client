export const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet/i.test(ua)) return "Tablet";
  if (/mobile/i.test(ua)) return "Mobile";
  return "Desktop";
};

export const getDeviceName = (): string => {
  return navigator.platform || "Unknown";
};