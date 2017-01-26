import { pick } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const createEmail = (id, data) => (
  api(`members/${id}/emails`,
    {
      method: 'post',
      body: pick(data, [
        'email',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const listEmail = () => (
  api('me/emails')
    .then(filterError)
    .then(parseJSON)
);

export const resendEmail = data => (
  api('emails/resend',
    {
      method: 'post',
      body: pick(data, [
        'email',
      ]),
    },
  )
    .then(filterError)
);
