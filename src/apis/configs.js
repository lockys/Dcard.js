import { api, filterError, parseJSON } from '../request';

export const listConfigs = () => (
  api('me/configs')
    .then(filterError)
    .then(parseJSON)
    .then(data => (
      Object.keys(data).map(key => ({
        id: key,
        value: JSON.stringify(data[key]),
      }))
    ))
);

export const getConfig = key => (
  api(`me/configs/${key}`)
    .then(filterError)
    .then(parseJSON)
    .then(value => ({
      id: key,
      value,
    }))
);

export const setConfig = (key, value) => (
  api(`me/configs/${key}`,
    {
      method: 'put',
      body: value,
    },
  )
    .then(filterError)
    .then(parseJSON)
    .then(v => ({
      id: key,
      value: v,
    }))
);

export const deleteConfig = key => (
  api(`me/configs/${key}`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
    .then(parseJSON)
    .then(() => ({
      id: key,
    }))
);
