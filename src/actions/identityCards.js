import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const createIdentityCardPhoto = createAsyncAction(ActionTypes.UPDATE_IDENTITY_CARD_PHOTO, function(data) {
  return api('me/identityCards', {
    method: 'post',
    body: data
  }, this)
    .then(filterError)
    .then(parseJSON);
});
