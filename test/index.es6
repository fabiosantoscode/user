/* eslint-disable no-undef, id-match, no-underscore-dangle */
import User from '../index';
import spies from 'chai-spies';
import Cookie from '@economist/cookie';

chai.use(spies);
const fakeMmcoreUatCookie = `LogInState=LoggedIn;Subscriber=Subscribed;
RegState=NotRegistered;ClickDepth=Ci0.2;Recency=Ri0.5;Loyalty=Li0.8;
Interaction=Ii0;Brand=Bi0.8;SignedIn=Si0.3;VEI=VEI0.5;Referrer=TypedBM;
Entry=Homepage;SiteVersion=Desktop;OptlyEconomist=False`;
describe('User', () => {
  describe('it provides differen interfaces to user state', () => {
    it('it can read all the entitlements of the user', () => {
      const expected = {
        LogInState: 'LoggedIn',
        Subscriber: 'Subscribed',
        RegState: 'NotRegistered',
        ClickDepth: 'Ci0.2',
        Recency: 'Ri0.5',
        Loyalty: 'Li0.8',
        Interaction: 'Ii0',
        Brand: 'Bi0.8',
        SignedIn: 'Si0.3',
        VEI: 'VEI0.5',
        Referrer: 'TypedBM',
        Entry: 'Homepage',
        SiteVersion: 'Desktop',
        OptlyEconomist: 'False',
      };
      const fakeCookie = {
        getCookie: () => fakeMmcoreUatCookie,
      };
      User.getEntitlements(null, fakeCookie).should.eql(expected);
      User.getEntitlements('LogInState', fakeCookie).should.eql('LoggedIn');
    });
    describe('functions that use getEntitlements', () => {
      const _getEntitlements = User.getEntitlements;
      afterEach(() => {
        User.getEntitlements = _getEntitlements;
      });
      it('isRegistered calls getEntitlements(\'RegState\')', () => {
        User.getEntitlements = chai.spy(() => {
          return 'Registered';
        });
        User.isRegistered().should.equal(true);
        User.getEntitlements = chai.spy(() => {
          return 'NotRegistered';
        });
        User.isRegistered().should.equal(false);
        User.getEntitlements.should.have.been.called.with('RegState');
      });
      it('isSubscriber calls getEntitlements(\'Subscriber\')', () => {
        User.getEntitlements = chai.spy(() => {
          return 'Subscribed';
        });
        User.isSubscriber().should.equal(true);
        User.getEntitlements = chai.spy(() => {
          return 'NotSubscribed or wahtever';
        });
        User.isSubscriber().should.equal(false);
        User.getEntitlements.should.have.been.called.with('Subscriber');
      });
    });
    it('isLoggedIn called the getCookie function', () => {
      const fakeCookieObj = new Cookie();
      fakeCookieObj.getCookie = chai.spy(() => {
        return true;
      });
      User.isLoggedIn(fakeCookieObj);
      fakeCookieObj.getCookie.should.have.been.called();
    });
  });
});
