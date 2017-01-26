import { pick } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const listCountries = () => (
  api('phones/countries')
    .then(filterError)
    .then(parseJSON)
);

export const sendValidationCode = data => (
  api('phones/sms',
    {
      method: 'post',
      body: pick(data, [
        'phone',
        'countryCode',
        'memberId',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const validate = data => (
  api('phones/validate',
    {
      method: 'post',
      body: pick(data, [
        'code',
        'phone',
        'countryCode',
        'memberId',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);
