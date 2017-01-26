/* @flow */
/**
 * Parse the response body to json.
 *
 * @private
 */
const parseJSON = (res: Response): Promise<Object> => res.json();

export default parseJSON;
