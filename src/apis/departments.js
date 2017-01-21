import { api, filterError, parseJSON } from '../api';

export const listDepartment = id => (
  api(`schools/${id}/departments`)
    .then(filterError)
    .then(parseJSON)
);
