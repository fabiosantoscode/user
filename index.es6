import Cookie from '@economist/cookie';

const cookie = new Cookie();
export default class User {

  splitValues(list, separator = ';') {
    return list.split(separator)
    .reduce((obj, subStr) => {
      const [ key = '', val = '' ] = subStr.trim().split(/\s*=\s*/).map(decodeURIComponent);
      obj[key] = val;
      return obj;
    }, {});
  }

  isLoggedIn() {
    // Maybe we can use just mmcore.
    return cookie.getCookie('mm-logged-in-state');
  }

  isRegistered() {
    return (this.getEntitlements('RegState') === 'Registered');
  }

  isSubscriber() {
    return (this.getEntitlements('Subscriber') === 'Subscribed');
  }

  getEntitlements(entitlement) {
    let requested = {};
    if (cookie.getCookie('mmcore.uat')) {
      const allEntitlements = this.splitValues(cookie.getCookie('mmcore.uat'), ';');
      requested = allEntitlements;
      if (entitlement) {
        requested = allEntitlements[entitlement];
      }
    } else {
      requested = false;
    }
    return requested;
  }
}
