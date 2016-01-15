import cookie from 'react-cookie';

const User = {
  isLoggedIn() {
    return Boolean(cookie.load('ec_uid'));
  },
  // Check if the user is in the range of internal IP
  isInternal() {
    return (cookie.load('ec_community') === 10000000000);
  },
  setInternal(internal = true) {
    if (internal) {
      cookie.save('ec_community', 10000000000);
    } else {
      cookie.remove('ec_community');
    }
  },
  getSubscriberCookie() {
    return cookie.load('ec_omniture_user_sub');
  },
};
export default User;
