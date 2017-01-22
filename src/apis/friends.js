import qs from 'qs';
import { api, filterError, parseJSON } from '../request';

export function getFriendsListKey() {
  return 'friends';
}

export const listFriends = options => (
  api(`me/friends?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const updateFriend = id => (
  api(`friends/${id}`)
    .then(filterError)
    .then(parseJSON)
);

export const deleteFriend = id => (
  api(`friends/${id}`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
    .then(() => ({ id }))
);
