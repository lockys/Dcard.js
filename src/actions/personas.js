import {pick} from 'lodash';
import qs from 'qs';

import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

const ENDPOINT = 'personas';
const QUERY_PARAMS = ['before', 'after', 'limit', 'forum', 'content'];

export const getPersonaPostListKey = (options) => {
  return qs.stringify(pick(options, QUERY_PARAMS));
};

export function getPersonaSearchKey(options) {
  return qs.stringify(pick(options, ['query']));
}

export const getPersona = createAsyncAction(ActionTypes.UPDATE_PERSONA, function(uid) {
  return api(`${ENDPOINT}/${uid}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const createPersona = createAsyncAction(ActionTypes.CREATE_PERSONA, function(uid, nickname) {
  return api(`${ENDPOINT}`, {
    method: 'post',
    body: {
      uid,
      nickname
    }
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const updateNickname = createAsyncAction(ActionTypes.UPDATE_PERSONA, function(uid, nickname) {
  return api(`${ENDPOINT}/${uid}`, {
    method: 'put',
    body: {
      nickname
    }
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const updateUid = createAsyncAction(ActionTypes.UPDATE_PERSONA_UID, function(uid, newUid) {
  return api(`${ENDPOINT}/${uid}`, {
    method: 'put',
    body: {
      uid: newUid
    }
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(data => ({
      oldUid: uid,
      newUid: newUid,
      ...data
    }));
});

export const listPersonaPost = createAsyncAction(ActionTypes.LIST_PERSONA_POST, function(uid, options) {
  let queries = getPersonaPostListKey(options);
  queries = queries ? '?' + queries : '';

  return api(`${ENDPOINT}/${uid}/posts${queries}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(uid, options, refresh) => ({
  uid,
  key: uid,
  refresh
}));

export const searchPersona = createAsyncAction(ActionTypes.LIST_PERSONAS, function(options) {
  return api(`search/personas?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getPersonaSearchKey(options),
  refresh
}));
