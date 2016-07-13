import cookie from 'react-cookie';
const multiUserMagicNumber = 10000000000;
export default {
  isLoggedIn() {
    const userCookie = cookie.load('Econ.user.user');
    const userId = cookie.load('ec_uid');
    if (typeof userId !== 'undefined') {
      return userId !== 0;
    } else if (userCookie) {
      return Boolean(userCookie.uid) && userCookie.name !== null;
    }
    return false;
  },
  getUserId() {
    const userId = cookie.load('ec_uid');
    const userCookie = cookie.load('Econ.user.user');
    if (typeof userId !== 'undefined') {
      return userId;
    }
    return userCookie && userCookie.uid || 0;
  },
  getUserType() {
    const userInfo = cookie.load('ec_omniture_user_sub');
    let userType = '';
    if (!userInfo || !userInfo.split('*')[0]) {
      userType = 'anonymous';
    } else {
      // User info could be like this 'digital-subscriber*2016/01/19'
      userType = userInfo.split('*')[0];
      if (userType.indexOf('|') >= 0) {
        // Or they could be like this
        // 'registered|ent-product-A*2011/02/16|2014/09/30|ent-product-A'
        userType = userType.split('|')[0];
      }
    }
    return userType;
  },
  canEdit() {
    return Boolean(cookie.load('ec_su'));
  },
  isMultiUserLicense() {
    return cookie.load('ec_community') === multiUserMagicNumber;
  },
  setMultiUserLicense(mul = true) {
    if (mul) {
      cookie.save('ec_community', multiUserMagicNumber);
    } else {
      cookie.remove('ec_community');
    }
  },
  getSubscriberCookie() {
    return cookie.load('ec_omniture_user_sub');
  },
};
