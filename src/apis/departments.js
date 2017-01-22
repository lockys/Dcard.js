import { api, filterError, parseJSON } from '../request';

export const listDepartment = id => (
  api(`schools/${id}/departments`)
    .then(filterError)
    .then(parseJSON)
);
