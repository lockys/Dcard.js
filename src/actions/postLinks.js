import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const listPostLinks = createAsyncAction(ActionTypes.LIST_POST_LINK, function(id) {
  return api(`posts/${id}/links`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(res => Object.keys(res).map(key => res[key]));
});
