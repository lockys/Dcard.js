import fetch from 'isomorphic-fetch';
import {merge} from 'lodash';
import {updateCSRFToken} from '../actions/app';

function setupRequestOptions(options) {
  options = merge({
    method: 'get',
    headers: {
      Accept: 'application/json'
    }
  }, options);

  // only browser has FormData
  if (typeof FormData !== 'undefined' && options.body instanceof FormData) {
    return options;
  }

  const type = typeof options.body;
  if (type === 'object' || type === 'boolean') {
    options.body = JSON.stringify(options.body) || '';
    options.headers['Content-Type'] = 'application/json';
  }

  return options;
}

export function api(url, options, store) {
  if (typeof window !== 'undefined') {
    return internal(url, options, store);
  }

  const {app} = store.getState();
  options = setupRequestOptions(options);

  if (app.token) {
    options.headers.Authorization = 'Bearer ' + app.token;
  }

  return fetch(app.api.host + 'v2/' + url, options);
}

export function internal(url, options, store) {
  const {app} = store.getState();
  options = setupRequestOptions(options);
  options.headers['X-CSRF-Token'] = app.csrfToken;
  options.credentials = 'include';

  return fetch('/_api/' + url, options)
    .then(res => {
      const csrfToken = res.headers.get('X-CSRF-Token');

      if (csrfToken) {
        store.dispatch(updateCSRFToken(csrfToken));
      }

      return res;
    });
}



// WEBPACK FOOTER //
// ./src/api/request.js