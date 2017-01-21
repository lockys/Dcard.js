import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const listPhoto = createAsyncAction(ActionTypes.LIST_PHOTO, function() {
  return api('me/photos', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const createPhoto = createAsyncAction(ActionTypes.UPDATE_PHOTO, function(data) {
  return api('photos', {
    method: 'post',
    body: data
  }, this)
    .then(filterError)
    .then(parseJSON);
});
