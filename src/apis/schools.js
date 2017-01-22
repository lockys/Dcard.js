import qs from 'qs';
import { api, filterError, parseJSON } from '../request';

export const listSchool = options => (
  api(`schools?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const getSchool = id => (
  api(`schools/${id}`)
    .then(filterError)
    .then(parseJSON)
);

export const findSchoolByDomain = domain => (
  api(`schools/domain/${domain}`)
    .then(filterError)
    .then(parseJSON)
);
