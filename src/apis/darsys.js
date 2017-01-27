import { api, filterError, parseJSON } from '../request';

/**
* "You may also like these posts" based on a post id
* @param {Number} id posd id
* @example
* const id = 225688036;
* listDarsysPosts(id).then((res) => {
*   console.log(res);
* });
*/
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

/**
* @ignore
* unknown
*/
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
