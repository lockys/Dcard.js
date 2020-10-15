import { api, filterError, parseJSON } from '../request';
/**
 * Get today's Dcard.
 * @example
 * getDcard().then((res) => {
 *  console.log(res);
 * });
 * @returns {json}
 */
export const getDcard = () => (
  api('dcard')
    .then(filterError)
    .then(parseJSON)
);

/**
 * Send invitation to today's Dcard.
 * @param {object} firstMessageForm
 * @param {string} firstMessageForm.firstMessage The message that you want to say.
 * @returns {json}
 * @example
 * const message = { firstMessage: 'Hello!' };
 * acceptDcard(message).then((res) => {
 *   console.log(res);
 * });
 */
export const acceptDcard = firstMessageForm => (
  api('dcard/accept',
    {
      method: 'post',
      body: firstMessageForm,
    },
  )
    .then(filterError)
    .then(parseJSON)
);

/**
 * Reort Dcard.
 * @param {Object} reportForm
 * @param {String} reportForm.reason {reason: 'profileEmpty | profileSexual | photoNotReal | photoNotClear | photoNudity | photoOthers'}
 * @returns {json}
 */
export const reportDcard = reportForm => (
  api('dcard/reports',
    {
      method: 'post',
      body: reportForm,
    },
  )
    .then(filterError)
    .then(parseJSON)
    .catch(res => res.response.status === 403)
);

/**
 * Get dcard's status
 * @returns {json}
 */
export const getDcardStatus = () => (
  api('dcard/status')
    .then(filterError)
    .then(parseJSON)
);
