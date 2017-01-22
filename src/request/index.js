import fetch from 'isomorphic-fetch';
import { merge, toPairs } from 'lodash';
import { parse as parseCookieString } from 'cookie';

export filterError from './filterError';
export parseJSON from './parseJSON';

const HOST = 'https://www.dcard.tw';

function setupRequestOptions(options = {}) {
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

const DcardClient = (csrfToken = '', cookie = '') => ({
  csrfToken,
  cookie,

  updateCookies(cookies) {
    this.cookie = toPairs({
      ...parseCookieString(this.cookie),
      ...parseCookieString(cookies),
    })
      .map(c => c.join('='))
      .join(';');

    return this;
  },

  updateCSRFToken(token) {
    this.csrfToken = token;

    return this;
  },

  init: async function init() {
    const res = await fetch(HOST);
    const body = await res.text();

    const regex = /"csrfToken":"([\w-]+)"/;
    const matches = body.match(regex);

    if (!matches) {
      throw new Error('No CSRF Token found!');
    }

    this.csrfToken = matches[1];
    this.cookie = res.headers.getAll('set-cookie').join(';');

    return this;
  },
});

export const defaultClient = DcardClient();

export async function api(url, options) {
  const res = await fetch(
    `${HOST}/_api/${url}`,
    merge(
      setupRequestOptions(options),
      {
        headers: {
          'X-CSRF-Token': defaultClient.csrfToken || (await defaultClient.init()).csrfToken,
          cookie: defaultClient.cookie,
        },
      },
    ),
  );

  const csrfToken = res.headers.get('X-CSRF-Token');

  if (csrfToken) {
    defaultClient.updateCSRFToken(csrfToken);
  }

  defaultClient.updateCookies(res.headers.getAll('set-cookie').join(';'));

  return res;
}
