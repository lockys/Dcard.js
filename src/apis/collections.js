import qs from 'qs';
import { omit } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const listCollection = options => (
  api(`collections?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const listCollectionEntry = (options) => {
  if (!options.id) {
    throw new Error('No id specified');
  }

  return api(`collections/${options.id}/posts?${qs.stringify(omit(options, ['id']))}`)
    .then(filterError)
    .then(parseJSON);
};

export const removeCollectionEntry = (id, postId) => (
  api(`collections/${id}/posts/${postId}`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
    .then(() => ({ postId }))
);
