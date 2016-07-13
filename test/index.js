import 'babel-polyfill';
import User from '../src';
import chai from 'chai';
import cookie from 'react-cookie';
chai.should();
describe('User', () => {
  describe('it provides differen interfaces to user state', () => {
    beforeEach(() => {
      cookie.remove('Econ.user.user');
      cookie.remove('ec_uid');
    });

    it('isLoggedIn check that user is loggedin (ec_uid)', () => {
      cookie.save('ec_uid', 1);
      User.isLoggedIn().should.equal(true);
    });

    it('isLoggedIn check that user is loggedin (Econ.user.user)', () => {
      cookie.save('Econ.user.user',
        { uid: '3854922', name: 'vCywQBDmUf', country: {
          id: 74,
          iso: 'GB',
          name: 'United+Kingdom',
          region: 'UK',
        } }
      );
      User.isLoggedIn().should.equal(true);
    });

    it('isLoggedIn check that user is not loggedin', () => {
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
    it('getUserId return user-id or undefined (ec_uid)', () => {
      const userID = 120554;
      cookie.save('ec_uid', userID);
      User.getUserId().should.equal(userID);
      cookie.remove('ec_uid');
      (typeof User.getSubscriberCookie()).should.equal('undefined');
    });
    it('getUserId return user-id or undefined (Econ.user.user)', () => {
      cookie.save('Econ.user.user', { uid: 3854922 });
      User.getUserId().should.equal(3854922);
      cookie.remove('Econ.user.user');
      (typeof User.getSubscriberCookie()).should.equal('undefined');
    });
    it('getUserType return user type for anonymous', () => {
      cookie.remove('ec_omniture_user_sub');
      User.getUserType().should.equal('anonymous');
    });
    it('getUserType return user type for registered', () => {
      cookie.remove('ec_omniture_user_sub');
      cookie.save('ec_omniture_user_sub', 'registered|ent-product-A*2011/02/16|2014/09/30|ent-product-A');
      User.getUserType().should.equal('registered');
    });
    it('getUserType return user type for digital-subscriber', () => {
      cookie.save('ec_omniture_user_sub', 'digital-subscriber*2016/01/19');
      User.getUserType().should.equal('digital-subscriber');
    });
    it('canEdit return true if user can Edit a content', () => {
      cookie.save('ec_su', 'just a value');
      User.canEdit().should.equal(true);
    });
    it('canEdit return false if user can\'t Edit a content', () => {
      cookie.remove('ec_su');
      User.canEdit().should.equal(false);
    });
  });
});
