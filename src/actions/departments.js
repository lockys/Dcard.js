import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const listDepartment = createAsyncAction(ActionTypes.LIST_DEPARTMENT, function(id) {
  return api(`schools/${id}/departments`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});
