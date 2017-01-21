import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import {pick} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const createEmail = createAsyncAction(ActionTypes.UPDATE_EMAIL, function(id, data) {
  return api(`members/${id}/emails`, {
    method: 'post',
    body: pick(data, [
      'email'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const listEmail = createAsyncAction(ActionTypes.LIST_EMAIL, function() {
  return api('me/emails', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const resendEmail = createAsyncAction(ActionTypes.RESEND_EMAIL, function(data) {
  return api('emails/resend', {
    method: 'post',
    body: pick(data, [
      'email'
    ])
  }, this)
    .then(filterError);
});
