import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import {pick} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const updateCSRFToken = createAction(ActionTypes.UPDATE_CSRF_TOKEN);
export const updateStatusCode = createAction(ActionTypes.UPDATE_STATUS_CODE);

export const getMe = createAsyncAction(ActionTypes.UPDATE_ME, function() {
  return api('me', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const getPendingFields = createAsyncAction(ActionTypes.UPDATE_PENDING_FIELD, function() {
  return api('me/fields', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const updateMe = createAsyncAction(ActionTypes.UPDATE_ME, function(data) {
  return api('me', {
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
      'identityCardId'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const getPrivilege = createAsyncAction(ActionTypes.GET_PRIVILEGE, function(data) {
  return api('me/validate', {
    method: 'post',
    body: data
  }, this).then(function(res) {
    if (res.status !== 204) {
      res.error = true;
    }

    return pick(res, ['status', 'error']);
  });
});

export const getLocalItem = createAction(ActionTypes.GET_LOCALSTORAGE_ITEM, (key) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return;
  }

  return JSON.parse(value);
});

export const setLocalItem = createAction(ActionTypes.SET_LOCALSTORAGE_ITEM, (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))
);

export const clearLocalStorage = createAction(ActionTypes.CLEAR_LOCALSTORAGE, () => {
  window.localStorage.clear();
});

export const getAdConfig = createAsyncAction(ActionTypes.UPDATE_AD_CONFIG, function(keys) {
  return api(`configs?${keys.join('&')}`, {
    method: 'get'
  }, this)
  .then(filterError)
  .then(parseJSON);
});



// WEBPACK FOOTER //
// ./src/actions/app.js