import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import qs from 'qs';
import createAsyncAction from '../utils/createAsyncAction';

export function getFriendsListKey() {
  return 'friends';
}

export const listFriends = createAsyncAction(ActionTypes.LIST_FRIENDS, function(options) {
  return api(`me/friends?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getFriendsListKey(),
  refresh
}));

export const updateFriend = createAsyncAction(ActionTypes.UPDATE_FRIEND, function(id) {
  return api(`friends/${id}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const deleteFriend = createAsyncAction(ActionTypes.DELETE_FRIEND, function(id) {
  return api(`friends/${id}`, {
    method: 'delete'
  }, this)
    .then(filterError)
    .then(() => ({id}));
});
