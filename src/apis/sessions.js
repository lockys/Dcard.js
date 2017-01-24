/* @flow */
import { api, filterError } from '../request';

/**
 * Login to Dcard with email and password.
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
