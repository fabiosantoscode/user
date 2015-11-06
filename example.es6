/* eslint-disable id-match */
import React from 'react';
import User from './index';

const user = new User();
export default (
    <div>
      <h1>Reading your cookie</h1>
      <ul>
        <li>Are you logged in? {user.isLoggedIn() ? 'Yes' : 'No'}</li>
        <li>Area you subscriber? {user.isSubscriber() ? 'Yes' : 'No'}</li>
        <li>Area you registered? {user.isRegistered() ? 'Yes' : 'No'}</li>
        <li>Entitlements: {JSON.stringify(user.getEntitlements())}</li>
      </ul>
    </div>
);
