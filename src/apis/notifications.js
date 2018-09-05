import qs from 'qs';
import { api, filterError, parseJSON } from '../request';

export const listNotification = options => (
  api(`notifications?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const readNotification = id => (
  api(`notifications/${id}/read`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const readAllNotification = () => (
  api('notifications/read',
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const seeNotification = id => (
  api(`notifications/${id}/see`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const seeAllNotification = () => (
  api('notifications/see',
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const getNotificationStatus = () => (
  api('notifications/status')
    .then(filterError)
    .then(parseJSON)
);

export const deleteNotification = id => (
  api(`notifications/${id}`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
    .then(() => ({ id }))
);
