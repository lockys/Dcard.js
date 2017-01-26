import qs from 'qs';
import { omit } from 'lodash';
import { api, filterError, parseJSON } from '../request';

export const getTrendingTags = (options) => {
  if (options.path && options.path.indexOf('/f') < 0) {
    return Promise.resolve(() => []);
  }

  if (options.forum) {
    return api(`topix/${options.forum}/topics`)
      .then(filterError)
      .then(parseJSON);
  }

  return api(`topix/topics?${qs.stringify(omit(options, 'path'))}`)
    .then(filterError)
    .then(parseJSON);
};
