import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import qs from 'qs';
import {omit} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const listCollection = createAsyncAction(ActionTypes.LIST_COLLECTION, function(options) {
  return api(`collections?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const listCollectionEntry = createAsyncAction(ActionTypes.LIST_COLLECTION_ENTRY, function(options) {
  if (!options.id) {
    return;
  }

  return api(`collections/${options.id}/posts?` + qs.stringify(omit(options, ['id'])), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: 'default',
  refresh
}));

export const removeCollectionEntry = createAsyncAction(ActionTypes.REMOVE_COLLECTION_ENTRY, function(id, postId) {
  return api(`collections/${id}/posts/${postId}`, {
    method: 'delete'
  }, this)
    .then(filterError)
    .then(() => ({postId}));
});
