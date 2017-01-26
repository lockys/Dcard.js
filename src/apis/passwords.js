import { pick } from 'lodash';
import { api, filterError } from '../request';

export const updatePassword = data => (
  api('passwords',
    {
      method: 'put',
      body: pick(data, [
        'current',
        'password',
      ]),
    },
  )
    .then(filterError)
);

export const createPasswordReset = data => (
  api('passwords/reset',
    {
      method: 'post',
      body: pick(data, [
        'email',
      ]),
    },
  )
    .then(filterError)
);

export const resetPassword = (token, data) => (
  api(`passwords/reset/${token}`,
    {
      method: 'put',
      body: pick(data, [
        'password',
      ]),
    },
  )
    .then(filterError)
);
