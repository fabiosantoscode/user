/* eslint-disable no-undef, id-match, no-underscore-dangle */
import User from '../index';
import spies from 'chai-spies';
import cookie from 'react-cookie';

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
      cookie.save('mmcore.uat', fakeMmcoreUatCookie);
      User.getEntitlements(null).should.eql(expected);
      User.getEntitlements('LogInState').should.eql('LoggedIn');
      cookie.remove('mmcore.uat');
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
  });
});
