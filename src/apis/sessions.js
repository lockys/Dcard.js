import { api, filterError } from '../api';

export const createSession = data => (
  api('sessions',
    {
      method: 'POST',
      body: data,
    },
  )
    .then(filterError)
);
