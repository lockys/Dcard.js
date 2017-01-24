/* @flow */
import { noop } from 'lodash';

class ResponseError extends Error {
  response: Response;
  body: ?Object;

  constructor(res: Response, body?: Object) {
    super();

    this.name = 'ResponseError';
    this.message = res.statusText;
    this.response = res;
    this.body = body;
  }
}

/**
 * The function to filter out the errors.
 *
 * @private
 */
export default function filterError(res: Response): Promise<Response> | Response {
  if (res.status < 200 || res.status > 300) {
    const contentType = res.headers.get('Content-Type');

    if (contentType.indexOf('json') < 0) {
      return Promise.reject(new ResponseError(res));
    }

    return res.json()
      .then(json => json, noop)
      .then(json => Promise.reject(new ResponseError(res, json)));
  }

  return res;
}
