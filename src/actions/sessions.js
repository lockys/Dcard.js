import {ActionTypes} from '../constants';
import {api, internal, filterError, parseJSON} from '../api';
import createAsyncAction from '../utils/createAsyncAction';
import Appier from '../utils/Appier';

const appier = new Appier();

function sendAppierData() {
  return api(`appier/token`, {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(({token}) => {
      if (!token) return;

      appier.send({
        t: 'dmp',
        'dcard_token': token
      });
    });
}

export const createSession = createAsyncAction(ActionTypes.CREATE_SESSION, function(data) {
  return internal('sessions', {
    method: 'post',
    body: data
  }, this)
    .then(filterError)
    .then(res => {
      sendAppierData.call(this);
      return res;
    });
});
