import Cookie from '@economist/cookie';

const cookie = new Cookie();
export default class User {

  splitValues(list, separator = ';') {
    const splitObj = {};
    list.split(separator)
    .map((subStr) => {
      let key = '';
      let val = '';
      [ key, val ] = subStr.trim().split('=').map(decodeURIComponent);
      splitObj[key] = val;
    });
    return splitObj;
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
    const allEntitlements = this.splitValues(cookie.getCookie('mmcore.uat'), ';');
    let requested = allEntitlements;
    if (entitlement) {
      requested = allEntitlements[entitlement];
    }
    return requested;
  }
}
