import { toPairs } from 'lodash';
import { parse as parseCookieString } from 'cookie';
import constants from './constants';

const HOST = constants.host;
const CSRFTokenUrl = constants.ping;

/**
 * @private
 * The Dcard api wrapper client for handling the csrf token and cookies.
 * Normally you won't be using this function directly.
 */
export const DcardClient = (csrfToken : string = '', cookie : string = '') : Object => ({
  csrfToken,
  cookie,

  updateCookies(cookies : string): DcardClient {
    this.cookie = toPairs({
      ...parseCookieString(this.cookie),
      ...parseCookieString(cookies),
    }).map(c => c.join('=')).join(';');

    return this;
  },

  updateCSRFToken(token : string): DcardClient {
    this.csrfToken = token;

    return this;
  },

  /**
   * @private
   * Initial the client by getting the first cookie and csrk token
   * after the first fetch to the server.
   */
  init: async function init(): Promise <DcardClient> {
    const res = await fetch(`${HOST}/${CSRFTokenUrl}`);
    const responseHeader = res.headers;
    const xcsrfToken = responseHeader.get('x-csrf-token');

    if (!xcsrfToken) {
      throw new Error('No CSRF Token found!');
    }

    this.updateCSRFToken(xcsrfToken);
    this.updateCookies(res.headers.getAll('set-cookie').join(';'));

    return this;
  },
});
