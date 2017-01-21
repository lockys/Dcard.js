import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';
import {pushToast} from './toasts';

export const getDcard = createAsyncAction(ActionTypes.UPDATE_DCARD, function() {
  return api(`dcard`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const acceptDcard = createAsyncAction(ActionTypes.ACCEPT_DCARD, function(firstMessageForm) {
  return api(`dcard/accept`, {
    method: 'post',
    body: firstMessageForm
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const reportDcard = createAsyncAction(ActionTypes.REPORT_DCARD, function(reportForm) {
  return api(`dcard/reports`, {
    method: 'post',
    body: reportForm
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(res => {
      this.dispatch(pushToast({
        content: '檢舉成功！'
      }));

      return res;
    })
    .catch(res => {
      if (res.response.status === 403) {
        this.dispatch(pushToast({
          content: '已檢舉成功！'
        }));
      }

      return res;
    });
});

export const getDcardStatus = createAsyncAction(ActionTypes.GET_DCARD_STATUS, function() {
  return api(`dcard/status`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});
