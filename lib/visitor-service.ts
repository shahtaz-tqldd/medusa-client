import { getDeviceName, getDeviceType } from "./device-info";

interface LocationData {
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface VisitorPayload {
  visitor_id?: string;
  ip_address?: string;
  device_name?: string;
  device_type?: string;
  longitude?: number;
  latitude?: number;
  country?: string;
  city?: string;
}

export const initializeVisitor = async (): Promise<void> => {
  try {
    // Check if visitor has already been initialized in this session
    const sessionInitialized = sessionStorage.getItem(
      "visitor_session_initialized"
    );

    if (sessionInitialized) {
      // Already initialized in this session, don't make API call
      return;
    }

    const existingVisitorId = localStorage.getItem("visitor_id");

    let payload: VisitorPayload;

    if (existingVisitorId) {
      // Existing visitor - send visitor_id to update visit count
      payload = {
        visitor_id: existingVisitorId,
      };
    } else {
      // New visitor - fetch location and device info
      const locationData = await fetchLocationData();
      payload = {
        ip_address: locationData.ip,
        device_name: getDeviceName(),
        device_type: getDeviceType(),
        longitude: locationData.longitude,
        latitude: locationData.latitude,
        country: locationData.country,
        city: locationData.city,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/base/visitors/init`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    // Store visitor_id for new visitors
    if (data?.success && data?.data?.visitor_id && !existingVisitorId) {
      localStorage.setItem("visitor_id", data.data.visitor_id);
    }

    // Mark this session as initialized to prevent multiple calls
    sessionStorage.setItem("visitor_session_initialized", "true");
  } catch (error) {
    console.error("Visitor initialization failed:", error);
  }
};

const fetchLocationData = async (): Promise<LocationData> => {
  const response = await fetch("/api/visitor");

  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  return response.json();
};
