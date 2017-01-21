import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import qs from 'qs';
import {omit} from 'lodash';
import createAsyncAction from '../utils/createAsyncAction';

export const getTrendingTags = createAsyncAction(ActionTypes.GET_TRENDING_TAGS, function(options) {
  if (options.path && !~options.path.indexOf('/f')) {
    return Promise.resolve(() => []);
  }

  if (options.forum) {
    return api(`topix/${options.forum}/topics`, {
      method: 'get'
    }, this)
      .then(filterError)
      .then(parseJSON);
  }

  return api(`topix/topics?` + qs.stringify(omit(options, 'path')), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
});
