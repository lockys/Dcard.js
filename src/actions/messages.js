import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';
import {pick} from 'lodash';
import qs from 'qs';

export const updateActiveTabIndex = createAction(ActionTypes.UPDATE_ACTIVE_TAB_INDEX);
export const updateMessageFriendUnread = createAction(ActionTypes.UPDATE_MESSAGE_FRIEND_UNREAD);

export function getMessageFriendListKey() {
  return 'MessageFriendKey';
}

export const listMessageFriend = createAsyncAction(ActionTypes.LIST_MESSAGE_FRIEND, function(options) {
  return api('me/messages?' + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getMessageFriendListKey(),
  refresh
}));

export function getMessageListKey(id) {
  return qs.stringify({
    id
  });
}

export const listMessage = createAsyncAction(ActionTypes.LIST_MESSAGE, function(id, options) {
  return api(`friends/${id}/messages?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(id, options, refresh) => ({
  key: getMessageListKey(id),
  refresh
}));

export const postMessage = createAsyncAction(ActionTypes.POST_MESSAGE, function(data) {
  return api(`friends/${data.id}/messages`, {
    method: 'post',
    body: pick(data, [
      'content'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});
