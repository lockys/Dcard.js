import {ActionTypes} from '../constants';
import {api, filterError} from '../api';
import {pick} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const updatePassword = createAsyncAction(ActionTypes.UPDATE_PASSWORD, function(data) {
  return api('passwords', {
    method: 'put',
    body: pick(data, [
      'current',
      'password'
    ])
  }, this)
    .then(filterError);
});

export const createPasswordReset = createAsyncAction(ActionTypes.CREATE_PASSWORD_RESET, function(data) {
  return api('passwords/reset', {
    method: 'post',
    body: pick(data, [
      'email'
    ])
  }, this)
    .then(filterError);
});

export const resetPassword = createAsyncAction(ActionTypes.RESET_PASSWORD, function(token, data) {
  return api(`passwords/reset/${token}`, {
    method: 'put',
    body: pick(data, [
      'password'
    ])
  }, this)
    .then(filterError);
});
