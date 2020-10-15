/* @flow */
import fetch from 'isomorphic-fetch';
import { merge } from 'lodash';
import constants from './constants';
import { DcardClient } from './dcardClient';

export { default as filterError } from './filterError';
export { default as parseJSON } from './parseJSON';

const HOST = constants.host;
const CLIENT = new DcardClient();
/**
 * @private
 * Setup the fetch request options.
 */
function setupRequestOptions(options: Object = {}): Object {
  const option = merge({
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }, options);

  // only browser has FormData
  if (typeof FormData !== 'undefined' && options.body instanceof FormData) {
    return option;
  }

  const type = typeof options.body;

  if (type === 'object' || type === 'boolean') {
    option.body = JSON.stringify(option.body) || '';
    option.headers['Content-Type'] = 'application/json';
  }

  return option;
}

/**
 * @private
 * The api function that make call to the Dcard server.
 * Normally you won't be using this function directly.
 */
export async function api(url: string, options?: Object, customApiPrefix?: string): Promise<*> {
  let csrfToken = CLIENT.csrfToken || (await CLIENT.init()).csrfToken;

  const headers = {
    Cookie: CLIENT.cookie,
    'x-csrf-token': csrfToken,
  };

  const fetchUrl = customApiPrefix ? `${HOST}/${customApiPrefix}/${url}` : `${HOST}/${constants.apiV1}/${url}`

  console.log(fetchUrl);

  const res = await fetch(
    fetchUrl,
    merge(
      setupRequestOptions(options),
      { headers },
    ),
  );

  csrfToken = res.headers.get('x-csrf-token');

  if (csrfToken) {
    CLIENT.updateCSRFToken(csrfToken);
  }

  CLIENT.updateCookies(res.headers.getAll('set-cookie').join(';'));

  return res;
}
