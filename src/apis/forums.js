import { api, filterError, parseJSON } from '../request';

export const listForum = () => (
  api('forums')
    .then(filterError)
    .then(parseJSON)
);

export const getForum = alias => (
  api(`forums/${alias}`)
    .then(filterError)
    .then(parseJSON)
);

export const subscribeForum = id => (
  api(`forums/${id}/subscribe`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const unsubscribeForum = id => (
  api(`forums/${id}/subscribe`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
);

export const setReadForum = id => (
  api(`forums/${id}/read`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);
