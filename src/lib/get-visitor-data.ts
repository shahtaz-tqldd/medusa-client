import { UAParser } from "ua-parser-js";
import { getDeviceInfo } from "./device-info";

export const getVisitorData = async () => {
  const res = await fetch("/api/visitor");
  const data = await res.json();
  const deviceInfo = getDeviceInfo();
  const allInfo = {
    ...data,
    ...deviceInfo,
  };
  return allInfo;
};
