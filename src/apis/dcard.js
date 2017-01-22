import { api, filterError, parseJSON } from '../request';

export const getDcard = () => (
  api('dcard')
    .then(filterError)
    .then(parseJSON)
);

export const acceptDcard = firstMessageForm => (
  api('dcard/accept',
    {
      method: 'post',
      body: firstMessageForm,
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const reportDcard = reportForm => (
  api('dcard/reports',
    {
      method: 'post',
      body: reportForm,
    },
  )
    .then(filterError)
    .then(parseJSON)
    .catch(res => res.response.status === 403)
);

export const getDcardStatus = () => (
  api('dcard/status')
    .then(filterError)
    .then(parseJSON)
);
