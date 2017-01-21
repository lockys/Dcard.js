import {ActionTypes} from '../constants';
import {api, filterError} from '../api';
import createAsyncAction from '../utils/createAsyncAction';

export const revokeTokens = createAsyncAction(ActionTypes.REVOKE_TOKENS, function(data) {
  return api(`me/tokens`, {
    method: 'delete'
  }, this)
    .then(filterError);
});
