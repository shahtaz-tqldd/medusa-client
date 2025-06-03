import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export const getCookieId = () => {
  let cookieId = Cookies.get('visitor_cookie_id');
  if (!cookieId) {
    cookieId = uuidv4();
    Cookies.set('visitor_cookie_id', cookieId, { expires: 365 });
  }
  return cookieId;
};
