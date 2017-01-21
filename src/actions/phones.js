import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import {pick} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const listCountries = createAsyncAction(ActionTypes.LIST_COUNTRIES, function(data) {
  return api('phones/countries', {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const sendValidationCode = createAsyncAction(ActionTypes.SMS_VALIDATING, function(data) {
  return api('phones/sms', {
    method: 'post',
    body: pick(data, [
      'phone',
      'countryCode',
      'memberId'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const validate = createAsyncAction(ActionTypes.VALIDATE_PHONE, function(data) {
  return api('phones/validate', {
    method: 'post',
    body: pick(data, [
      'code',
      'phone',
      'countryCode',
      'memberId'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});
