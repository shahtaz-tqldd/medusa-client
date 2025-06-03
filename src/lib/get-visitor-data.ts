import { getCookieId } from "./get-cookie";
import { getDeviceInfo } from "./get-device";
import { getIpAndLocation } from "./get-location";

export const sendVisitorData = async () => {
  const locationData = await getIpAndLocation();
  const deviceData = getDeviceInfo();
  const cookieId = getCookieId();

  const visitorData = {
    ip_address: locationData.ip,
    device_name: deviceData.deviceName,
    device_type: deviceData.deviceType,
    longitude: locationData.longitude,
    latitude: locationData.latitude,
    country: locationData.country,
    city: locationData.city,
    cookie_id: cookieId,
  };

  return visitorData
};
