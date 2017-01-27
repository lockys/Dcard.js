import qs from 'qs';
import { omit } from 'lodash';
import { api, filterError, parseJSON } from '../request';

/**
* Search posts by specified keyword.
* @param {object} options
* * @param {Number} options.after provide a number to list comments after the provided number.
* * @param {Boolean} popular true | false
* @param {Number} id post id
* @example
* const postId = 225688036;
* const options = {};
* listComments(postId, options).then((res) => {
*   console.log(res);
* });
*/
export const listComments = (id, options) => (
  api(`posts/${id}/comments?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);
