export const getIpAndLocation = async () => {
  const res = await fetch('https://ipapi.co/json/');
  const data = await res.json();
  return {
    ip: data.ip,
    city: data.city,
    country: data.country_name,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};