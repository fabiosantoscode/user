import cookie from 'react-cookie';

const User = {
  isLoggedIn() {
    return Boolean(cookie.load('ec_uid'));
  },
  isRegistered() {
    return (User.getEntitlements('RegState', cookie) === 'Registered');
  },
  isSubscriber() {
    return (User.getEntitlements('Subscriber', cookie) === 'Subscribed');
  },
  // Check if the user is in the range of internal IP
  isInternal() {
    return (cookie.load('ec_community') === 10000000000);
  },
  getSubscriberCookie() {
    return cookie.load('ec_omniture_user_sub');
  },
  getSubscriberInfo() {
    // const subscriberCookie = this.getSubscriberCookie();
    const subscriberCookie = 'registered|ent-product-A*2011/02/16|2014/09/30|ent-product-A';
  }
};
export default User;
