import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import qs from 'qs';
import createAsyncAction from '../utils/createAsyncAction';

export const listSchool = createAsyncAction(ActionTypes.LIST_SCHOOL, function(options) {
  return api('schools?' + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const getSchool = createAsyncAction(ActionTypes.UPDATE_SCHOOL, function(id) {
  return api(`schools/${id}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const findSchoolByDomain = createAsyncAction(ActionTypes.UPDATE_SCHOOL, function(domain) {
  return api(`schools/domain/${domain}`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});
