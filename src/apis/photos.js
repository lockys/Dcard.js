import { api, filterError, parseJSON } from '../request';

export const listPhoto = () => (
  api('me/photos')
    .then(filterError)
    .then(parseJSON)
);

export const createPhoto = data => (
  api('photos',
    {
      method: 'post',
      body: data,
    },
  )
    .then(filterError)
    .then(parseJSON)
);
