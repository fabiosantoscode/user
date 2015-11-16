import Cookie from '@economist/cookie';

const defaultCookie = new Cookie();
const User = {
  splitValues(list, separator = ';') {
    return list.split(separator)
    .reduce((obj, subStr) => {
      const [ key = '', val = '' ] = subStr.trim().split(/\s*=\s*/).map(decodeURIComponent);
      obj[key] = val;
      return obj;
    }, {});
  },
  isLoggedIn(cookie = defaultCookie) {
    // Maybe we can use just mmcore.
    return cookie.getCookie('mm-logged-in-state');
  },
  isRegistered(cookie = defaultCookie) {
    return (User.getEntitlements('RegState', cookie) === 'Registered');
  },
  isSubscriber(cookie = defaultCookie) {
    return (User.getEntitlements('Subscriber', cookie) === 'Subscribed');
  },
  getEntitlements(entitlement, cookie = defaultCookie) {
    if (cookie.getCookie('mmcore.uat')) {
      const allEntitlements = User.splitValues(cookie.getCookie('mmcore.uat'), ';');
      return (entitlement ? allEntitlements[entitlement] || {} : allEntitlements);
    }
    return false;
  },
};
export default User;
