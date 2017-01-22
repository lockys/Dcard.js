import { pick } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const getMe = () => (
  api('me')
    .then(filterError)
    .then(parseJSON)
);

export const getPendingFields = () => (
  api('me/fields')
    .then(filterError)
    .then(parseJSON)
);

export const updateMe = data => (
  api('me',
    {
      method: 'put',
      body: pick(data, [
        'name',
        'birthday',
        'gender',
        'school',
        'department',
        'talent',
        'wantToTry',
        'exchange',
        'club',
        'lecture',
        'lovedCountry',
        'trouble',
        'affection',
        'identityCardId',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const getPrivilege = data => (
  api('me/validate',
    {
      method: 'post',
      body: data,
    },
  )
    .then((res) => {
      const response = res;

      if (res.status !== 204) {
        response.error = true;
      }

      return pick(response, ['status', 'error']);
    })
);

export const getLocalItem = (key) => {
  const value = window.localStorage.getItem(key);

  if (!value) {
    return {};
  }

  return JSON.parse(value);
};

export const setLocalItem = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value))
);

export const clearLocalStorage = () => (
  window.localStorage.clear()
);

export const getAdConfig = keys => (
  api(`configs?${keys.join('&')}`,
    {
      method: 'get',
    },
  )
    .then(filterError)
    .then(parseJSON)
);
