/* @flow */
import fetch from 'isomorphic-fetch';
import { merge, toPairs } from 'lodash';
import { parse as parseCookieString } from 'cookie';
import _filterError from './filterError';
import _parseJSON from './parseJSON';

/* Because flow currently doesn't support the following syntax:
 * export filterError from './filterError',
 * so we did some workaround here. It should be changed soon.
 * Ref: https://github.com/facebook/flow/issues/940
 */
export const filterError = _filterError;
export const parseJSON = _parseJSON;

const HOST = 'https://www.dcard.tw';

/**
 * @ignore
 * Setup the fetch request options.
 *
 * @private
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
 * @ignore
 * The Dcard api wrapper client for handling the csrf token and cookies.
 * Normally you won't be using this function directly.
 */
export const DcardClient = (csrfToken: string = '', cookie: string = ''): Object => ({
  csrfToken,
  cookie,

  /**
   * @ignore
   * Update the client cookie.
   *
   * @private
   */
  updateCookies(cookies: string): DcardClient {
    this.cookie = toPairs({
      ...parseCookieString(this.cookie),
      ...parseCookieString(cookies),
    })
      .map(c => c.join('='))
      .join(';');

    return this;
  },

  /**
   * @ignore
   * Update the csrf token.
   *
   * @private
   */
  updateCSRFToken(token: string): DcardClient {
    this.csrfToken = token;

    return this;
  },

  /**
   * @ignore
   * Initial the client by getting the first cookie and csrk token
   * after the first fetch to the server.
   *
   * @private
   */
  init: async function init(): Promise<DcardClient> {
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

/**
 * @ignore
 * The default Dcard api client used implicitly.
 * Normally you won't be using this function directly.
 */
export const DEFAULT_CLIENT: DcardClient = DcardClient();

/**
 * @ignore
 * The api function that make call to the Dcard server.
 * Normally you won't be using this function directly.
 */
export async function api(url: string, options?: Object): Promise<*> {
  const res = await fetch(
    `${HOST}/_api/${url}`,
    merge(
      setupRequestOptions(options),
      {
        headers: {
          'X-CSRF-Token': DEFAULT_CLIENT.csrfToken || (await DEFAULT_CLIENT.init()).csrfToken,
          cookie: DEFAULT_CLIENT.cookie,
        },
      },
    ),
  );

  const csrfToken = res.headers.get('X-CSRF-Token');

  if (csrfToken) {
    DEFAULT_CLIENT.updateCSRFToken(csrfToken);
  }

  DEFAULT_CLIENT.updateCookies(res.headers.getAll('set-cookie').join(';'));

  return res;
}
