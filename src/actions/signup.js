import {ActionTypes} from '../constants';
import {api, internal, filterError, parseJSON} from '../api';
import {pick} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const signup = createAsyncAction(ActionTypes.SIGNUP, function(data) {
  return api('members', {
    method: 'post',
    body: pick(data, [
      'email',
      'password'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const facebookSign = createAsyncAction(ActionTypes.FACEBOOK_SIGN, function(data) {
  return internal('facebook/token', {
    method: 'post',
    body: pick(data, [
      'token'
    ])
  }, this)
    .then(filterError);
});
