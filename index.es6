import cookie from 'react-cookie';

const User = {
  isLoggedIn() {
    return Boolean(cookie.load('ec_uid'));
  },
  getUserId() {
    return cookie.load('ec_uid');
  },
  // Check if the user is a MUL
  isMultiUserLicense() {
    return (cookie.load('ec_community') === 10000000000);
  },
  setMultiUserLicense(mul = true) {
    if (mul) {
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
