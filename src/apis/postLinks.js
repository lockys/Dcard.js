import { api, filterError, parseJSON } from '../request';

export const listPostLinks = id => (
  api(`posts/${id}/links`)
    .then(filterError)
    .then(parseJSON)
    .then(res => Object.values(res))
);
