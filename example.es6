/* eslint-disable id-match */
import React from 'react';
import User from './index';

export default (
    <div>
      <h1>Reading your cookie (Change your host with wwww.economist.com to see real results).</h1>
      <ul>
        <li>Are you logged in? {User.isLoggedIn() ? 'Yes' : 'No'}</li>
      </ul>
    </div>
);
