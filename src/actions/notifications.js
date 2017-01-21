import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import qs from 'qs';
import createAsyncAction from '../utils/createAsyncAction';

export function getNotificationListKey() {
  return 'notifications';
}

export const listNotification = createAsyncAction(ActionTypes.LIST_NOTIFICATION, function(options) {
  return api(`notifications?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getNotificationListKey(),
  refresh
}));

export const readNotification = (id) => (dispatch, getState) => {
  dispatch({
    type: ActionTypes.READ_NOTIFICATION,
    payload: {id}
  });

  return api(`notifications/${id}/read`, {
    method: 'post'
  }, {dispatch, getState})
    .then(filterError);
};

export const readAllNotification = createAsyncAction(ActionTypes.READ_ALL_NOTIFICATION, function() {
  return api('notifications/read', {
    method: 'post'
  }, this)
    .then(filterError);
});

export const seeNotification = (id) => (dispatch, getState) => {
  dispatch({
    type: ActionTypes.SEE_NOTIFICATION,
    payload: {id}
  });

  return api(`notifications/${id}/see`, {
    method: 'post'
  }, {dispatch, getState})
    .then(filterError);
};

export const seeAllNotification = createAsyncAction(ActionTypes.SEE_ALL_NOTIFICATION, function() {
  return api('notifications/see', {
    method: 'post'
  }, this)
    .then(filterError);
});

export const getNotificationStatus = createAsyncAction(ActionTypes.GET_NOTIFICATION_STATUS, function() {
  return api('notifications/status', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});
