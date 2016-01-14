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
    it('isInternal check that user is in The Economist Network', () => {
      cookie.save('ec_community', '10000000000');
      User.isInternal().should.equal(true);
    });
    it('isInternal check that user is not in The Economist Network', () => {
      cookie.remove('ec_community');
      User.isInternal().should.equal(false);
    });
    it('getSubscriberCookie check the cookie with the subscriber information', () => {
      const subscriberInformation = 'registered|ent-product-A*2011/02/16|2014/09/30|ent-product-A';
      cookie.save('ec_omniture_user_sub', subscriberInformation);
      User.getSubscriberCookie().should.equal(subscriberInformation);
      cookie.remove('ec_omniture_user_sub');
      (typeof User.getSubscriberCookie()).should.equal('undefined');
    });
  });
});
