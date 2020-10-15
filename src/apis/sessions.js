/* @flow */
import { api, filterError } from '../request';
/**
 * Login to Dcard with email and password.
 * @param {String} email Your email for login
 * @param {String} password Your password for login
 * @example
 * createSession({ email: 'abc@example.com', password: 'Passw0rd' }).then((res) => {
 *   console.log(res);
 * });
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
    constants.apiV0
  )
  .then(filterError)
);
