import { pick } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const getMyFacebook = () => (
  api('me/facebook')
    .then(filterError)
    .then(parseJSON)
);

export const connectFacebook = data => (
  api('facebook',
    {
      method: 'post',
      body: pick(data, [
        'token',
      ]),
    },
  )
    .then(filterError)
);

export const disconnectFacebook = id => (
  api(`members/${id}/facebook`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
);
