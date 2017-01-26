/* @flow */
import { api, filterError } from '../request';

/**
 * Login to Dcard with email and password.
 * @param {String} email Your email for login
 * @param {String} password Your password for login
 */
export const createSession = (data: {
  email: string,
  password: string,
}): Promise<Object> => (
  api('sessions',
    {
      method: 'POST',
      body: data,
    },
  )
  .then(filterError)
);
