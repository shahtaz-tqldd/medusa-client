import { DeviceInfo } from './types';

/**
 * Get device type from user agent
 */
export function getDeviceType(): 'Mobile' | 'Tablet' | 'Desktop' {
  if (typeof window === 'undefined') return 'Desktop';

  const ua = navigator.userAgent;
  if (/tablet/i.test(ua)) return 'Tablet';
  if (/mobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

/**
 * Get device/platform name
 */
export function getDeviceName(): string {
  if (typeof window === 'undefined') return 'Unknown';
  return navigator.platform || 'Unknown';
}

/**
 * Get complete device information
 */
export function getDeviceInfo(): DeviceInfo {
  return {
    device_name: getDeviceName(),
    device_type: getDeviceType(),
  };
}
