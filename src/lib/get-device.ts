import {UAParser} from 'ua-parser-js';

export const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  const deviceType = result.device.type || 'desktop';
  const deviceName = result.device.model || result.browser.name;

  return {
    deviceType,
    deviceName,
  };
};
