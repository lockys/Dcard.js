import { api, filterError } from '../api';

export const revokeTokens = () => (
  api('me/tokens',
    {
      method: 'delete',
    },
  )
    .then(filterError)
);
