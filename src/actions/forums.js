import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const listForum = createAsyncAction(ActionTypes.LIST_FORUM, function(options) {
  return api('forums', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const getForum = createAsyncAction(ActionTypes.UPDATE_FORUM, function(alias) {
  return api(`forums/${alias}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const subscribeForum = createAsyncAction(ActionTypes.SUBSCRIBE_FORUM, function(id) {
  return api(`forums/${id}/subscribe`, {
    method: 'post'
  }, this)
    .then(filterError);
}, id => ({id}));

export const unsubscribeForum = createAsyncAction(ActionTypes.UNSUBSCRIBE_FORUM, function(id) {
  return api(`forums/${id}/subscribe`, {
    method: 'delete'
  }, this)
    .then(filterError);
}, id => ({id}));

export const setReadForum = createAsyncAction(ActionTypes.SET_READ_FORUM, function(id) {
  return api(`forums/${id}/read`, {
    method: 'post'
  }, this)
    .then(filterError);
}, id => ({id}));
