import { api, filterError } from '../request';

export const createSession = data => (
  api('sessions',
    {
      method: 'POST',
      body: data,
    },
  )
    .then(filterError)
);
