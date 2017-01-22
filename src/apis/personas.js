import { pick } from 'lodash';
import qs from 'qs';
import { api, filterError, parseJSON } from '../request';

const ENDPOINT = 'personas';
const QUERY_PARAMS = ['before', 'after', 'limit', 'forum', 'content'];

export const getPersonaPostListKey = options => (
  qs.stringify(pick(options, QUERY_PARAMS))
);

export function getPersonaSearchKey(options) {
  return qs.stringify(pick(options, ['query']));
}

export const getPersona = uid => (
  api(`${ENDPOINT}/${uid}`)
    .then(filterError)
    .then(parseJSON)
);

export const createPersona = (uid, nickname) => (
  api(`${ENDPOINT}`,
    {
      method: 'post',
      body: {
        uid,
        nickname,
      },
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const updateNickname = (uid, nickname) => (
  api(`${ENDPOINT}/${uid}`,
    {
      method: 'put',
      body: {
        nickname,
      },
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const updateUid = (uid, newUid) => (
  api(`${ENDPOINT}/${uid}`,
    {
      method: 'put',
      body: {
        uid: newUid,
      },
    },
  )
    .then(filterError)
    .then(parseJSON)
    .then(data => ({
      oldUid: uid,
      newUid,
      ...data,
    }))
);

export const listPersonaPost = (uid, options) => {
  const queries = getPersonaPostListKey(options);

  return api(`${ENDPOINT}/${uid}/posts${queries ? `?${queries}` : ''}`)
    .then(filterError)
    .then(parseJSON);
};

export const searchPersona = options => (
  api(`search/personas?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);
