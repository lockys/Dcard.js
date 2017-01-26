import { api, filterError } from '../request';

export const revokeTokens = () => (
  api('me/tokens',
    {
      method: 'delete',
    },
  )
    .then(filterError)
);
