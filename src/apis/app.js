/* @flow weak */
import { pick } from 'lodash';
import { api, filterError, parseJSON } from '../request';

/**
 * Get the profile of yourself.
 * @example
 * getMe().then((res) => {
 *  console.log(res);
 * });
 */
export const getMe = (): Promise<Object> => (
  api('me')
    .then(filterError)
    .then(parseJSON)
);

/**
 * Get the pending fields.
 * @example
 * getPendingFields().then((res) => {
 *  console.log(res);
 * });
 */
export const getPendingFields = (): Promise<Object> => (
  api('me/fields')
    .then(filterError)
    .then(parseJSON)
);

/**
 * Update your profile.
 * @example
 * const data = {...}; //key listed above could be used.
 * updateMe(data).then((res) => {
 *  console.log(res);
 * });
 */
export const updateMe = (data: {
  name: string,
  birthday: string,
  gender: string,
  school: string,
  department: string,
  talent: string,
  wantToTry: string,
  exchange: string,
  club: string,
  lecture: string,
  lovedCountry: string,
  trouble: string,
  affection: string,
  identityCardId: string,
}): Promise<Object> => (
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
