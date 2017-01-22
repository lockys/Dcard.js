import { api, filterError, parseJSON } from '../request';

export const createIdentityCardPhoto = data => (
  api('me/identityCards',
    {
      method: 'post',
      body: data,
    },
  )
    .then(filterError)
    .then(parseJSON)
);
