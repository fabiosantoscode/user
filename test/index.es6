/* eslint-disable no-undef, id-match, no-underscore-dangle */
import User from '../index';
import spies from 'chai-spies';
import cookie from 'react-cookie';

chai.use(spies);
describe('User', () => {
  describe('it provides differen interfaces to user state', () => {
    it('isLoggedIn check that user is loggedin', () => {
      cookie.save('ec_uid', 1);
      User.isLoggedIn().should.equal(true);
    });
    it('isLoggedIn check that user is not loggedin', () => {
      cookie.remove('ec_uid');
      User.isLoggedIn().should.equal(false);
    });
    it('isMultiUserLicense check that user is a MUL', () => {
      cookie.save('ec_community', '10000000000');
      User.isMultiUserLicense().should.equal(true);
    });
    it('isMultiUserLicense check that user is not a MUL', () => {
      cookie.remove('ec_community');
      User.isMultiUserLicense().should.equal(false);
    });
    it('getSubscriberCookie check the cookie with the subscriber information', () => {
      const subscriberInformation = 'registered|ent-product-A*2011/02/16|2014/09/30|ent-product-A';
      cookie.save('ec_omniture_user_sub', subscriberInformation);
      User.getSubscriberCookie().should.equal(subscriberInformation);
      cookie.remove('ec_omniture_user_sub');
      (typeof User.getSubscriberCookie()).should.equal('undefined');
    });
    it('getUserId return user-id or undefined', () => {
      const userID = 120554;
      cookie.save('ec_uid', userID);
      User.getUserId().should.equal(userID);
      cookie.remove('ec_uid');
      (typeof User.getSubscriberCookie()).should.equal('undefined');
    });
  });
});
