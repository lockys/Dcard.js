import { pick } from 'lodash';
import qs from 'qs';
import { api, filterError, parseJSON } from '../request';

export const listMessageFriend = options => (
  api(`me/messages?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const listMessage = (id, options) => (
  api(`friends/${id}/messages?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const postMessage = data => (
  api(`friends/${data.id}/messages`,
    {
      method: 'post',
      body: pick(data, [
        'content',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);
