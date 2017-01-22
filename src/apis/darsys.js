import { api, filterError, parseJSON } from '../request';

export const listDarsysPosts = (id) => {
  if (typeof window === 'undefined') {
    return {
      uuid: '',
      posts: [],
    };
  }

  return api(`darsys/${id}`)
    .then(filterError)
    .then(parseJSON);
};

export const sendDarsysEvent = body => (
  api('darsys/bilanx',
    {
      method: 'post',
      body,
    },
  )
    .then(filterError)
    .then(parseJSON)
);
