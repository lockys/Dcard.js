import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import {pick} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const getMyFacebook = createAsyncAction(ActionTypes.GET_MY_FACEBOOK, function() {
  return api('me/facebook', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const connectFacebook = createAsyncAction(ActionTypes.CONNECT_FACEBOOK, function(data) {
  return api('facebook', {
    method: 'post',
    body: pick(data, [
      'token'
    ])
  }, this)
    .then(filterError);
});

export const disconnectFacebook = createAsyncAction(ActionTypes.DISCONNECT_FACEBOOK, function(id) {
  return api(`members/${id}/facebook`, {
    method: 'delete'
  }, this)
    .then(filterError);
});
