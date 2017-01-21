import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const listConfigs = createAsyncAction(ActionTypes.LIST_CONFIGS, function() {
  return api('me/configs', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(data => {
      return Object.keys(data).map(key => ({
        id: key,
        value: JSON.stringify(data[key])
      }));
    });
});

export const getConfig = createAsyncAction(ActionTypes.UPDATE_CONFIG, function(key) {
  return api(`me/configs/${key}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(value => ({
      id: key,
      value
    }));
});

export const setConfig = createAsyncAction(ActionTypes.UPDATE_CONFIG, function(key, value) {
  return api(`me/configs/${key}`, {
    method: 'put',
    body: value
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(value => ({
      id: key,
      value
    }));
});

export const deleteConfig = createAsyncAction(ActionTypes.DELETE_CONFIG, function(key) {
  return api(`me/configs/${key}`, {
    method: 'delete'
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(() => ({
      id: key
    }));
});
