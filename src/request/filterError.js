import { noop } from 'lodash';

class ResponseError extends Error {
  constructor(res, body) {
    super();

    this.name = 'ResponseError';
    this.message = res.statusText;
    this.response = res;
    this.body = body;
  }
}

export default function filterError(res) {
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
