import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const listDarsysPosts = createAsyncAction(ActionTypes.LIST_DARSYS_POSTS, function(id) {
  if (typeof window === 'undefined') {
    return {'uuid':'', posts:[]};
  }

  return api(`darsys/${id}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

id => ({
  id
}));

export const sendDarsysEvent = createAsyncAction(ActionTypes.SEND_DARSYS_EVENT, function(body) {
  return api(`darsys/bilanx`, {
    method: 'post',
    body
  }, this)
    .then(filterError)
    .then(parseJSON);
});
