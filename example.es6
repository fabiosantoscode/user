/* eslint-disable id-match */
import React from 'react';
import User from './index';

export default (
    <div>
      <h1>Reading your cookie</h1>
      <ul>
        <li>Are you logged in? {User.isLoggedIn() ? 'Yes' : 'No'}</li>
        <li>Area you subscriber? {User.isSubscriber() ? 'Yes' : 'No'}</li>
        <li>Area you registered? {User.isRegistered() ? 'Yes' : 'No'}</li>
        <li>Entitlements: {JSON.stringify(User.getEntitlements())}</li>
      </ul>
    </div>
);
