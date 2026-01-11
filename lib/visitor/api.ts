import {
  LocationData,
  VisitorPayload,
  VisitorInitResponse,
  NewVisitorPayload,
  ExistingVisitorPayload,
} from './types';
import { getDeviceInfo } from './utils';


export async function fetchLocationData(): Promise<LocationData> {
  const response = await fetch('/api/visitor/location');

  if (!response.ok) {
    throw new Error(`Failed to fetch location data: ${response.status}`);
  }

  return response.json();
}

/**
 * Initialize or update visitor on backend
 */
export async function initializeVisitorOnBackend(
  visitorId: string | null
): Promise<VisitorInitResponse> {
  let payload: VisitorPayload;

  if (visitorId) {
    // Existing visitor - just send ID to increment visit count
    payload = { visitor_id: visitorId } as ExistingVisitorPayload;
  } else {
    // New visitor - fetch location and device info
    const [locationData, deviceInfo] = await Promise.all([
      fetchLocationData(),
      Promise.resolve(getDeviceInfo()),
    ]);

    payload = {
      ip_address: locationData.ip,
      device_name: deviceInfo.device_name,
      device_type: deviceInfo.device_type,
      longitude: locationData.longitude,
      latitude: locationData.latitude,
      country: locationData.country,
      city: locationData.city,
    } as NewVisitorPayload;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/base/visitors/init`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`Backend responded with ${response.status}`);
  }

  return response.json();
}