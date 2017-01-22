import { pick } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const signup = data => (
  api('members',
    {
      method: 'post',
      body: pick(data, [
        'email',
        'password',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const facebookSign = data => (
  api('facebook/token',
    {
      method: 'post',
      body: pick(data, [
        'token',
      ]),
    },
  )
    .then(filterError)
);
