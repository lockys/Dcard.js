import fetch from 'isomorphic-fetch';
import { merge } from 'lodash';
// import { updateCSRFToken } from '../actions/app';

const HOST = 'https://www.dcard.tw';

function setupRequestOptions(options = {}) {
  const option = merge({
    method: 'get',
    headers: {
      Accept: 'application/json',
    },
  }, options);

  // only browser has FormData
  // if (typeof FormData !== 'undefined' && options.body instanceof FormData) {
  //   return option;
  // }

  const type = typeof options.body;
  if (type === 'object' || type === 'boolean') {
    option.body = JSON.stringify(option.body) || '';
    option.headers['Content-Type'] = 'application/json';
  }

  return option;
}

export function internal(url, options) {
  const option = setupRequestOptions(options);
  // option.headers['X-CSRF-Token'] = app.csrfToken;
  option.credentials = 'include';

  return fetch(`/_api/${url}`, options)
    .then((res) => {
      const csrfToken = res.headers.get('X-CSRF-Token');

      if (csrfToken) {
        // store.dispatch(updateCSRFToken(csrfToken));
      }

      return res;
    });
}


export function api(url, options = {}) {
  const option = setupRequestOptions(options);

  // if (app.token) {
  //   options.headers.Authorization = 'Bearer ' + app.token;
  // }

  return fetch(`${HOST}/v2/${url}`, option);
}
