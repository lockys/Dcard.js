/* @flow */
/**
 * @private
 * Parse the response body to json.
 */
const parseJSON = (res: Response): Promise<Object> => res.json();

export default parseJSON;
