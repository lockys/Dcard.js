import { pick, omit } from 'lodash';
import qs from 'qs';
import { api, filterError, parseJSON } from '../api';
import { listCollection } from './collections';

export const listPost = (options) => {
  const url = options.forum ? `forums/${options.forum}/posts` : 'posts';

  return api(`${url}?${qs.stringify(omit(options, 'forum'))}`)
    .then(filterError)
    .then(parseJSON)
    .then((res) => {
      // event article
      if (!options.popular || options.after || options.before) return res;

      let angels = [];
      return res.reduce(
        (posts, post, idx) => {
          let p = posts.slice();

          if (idx === 9 && angels.length) {
            p = p.concat(angels);
            angels = [];
          } else if (post.pinned && post.department === 'dcardadangel') {
            angels.push(post);
          } else {
            p = p.push(post);
          }

          return p;
        },
        [],
      ).concat(angels);
    });
};

export const listMyPost = options => (
  api(`me/posts?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const listMySubscription = options => (
  api(`me/subscriptions?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const getPost = (id, options) => (
  api(`posts/${id}?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const createPost = data => (
  api(data.replyId ? `posts/${data.replyId}/replies` : `forums/${data.forum}/posts`,
    {
      method: 'post',
      body: pick(data, [
        'title',
        'content',
        'anonymous',
        'withNickname',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const updatePost = (id, data) => (
  api(`posts/${id}`,
    {
      method: 'put',
      body: pick(data, [
        'title',
        'content',
      ]),
    },
  )
    .then(filterError)
    .then(parseJSON)
);

export const destroyPost = id => (
  api(`posts/${id}`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
    .then(() => ({ id: +id }))
);

export const likePost = id => (
  api(`posts/${id}/like`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const unlikePost = id => (
  api(`posts/${id}/like`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
);

async function getCollection() {
  const collections = await listCollection();
  return collections[0];
}

export async function collectPost(id) {
  const collection = await getCollection();
  return api(`collections/${collection.get('id')}/posts`,
    {
      method: 'post',
      body: {
        postId: +id,
      },
    },
  )
    .then(filterError);
}

export async function uncollectPost(id) {
  const collection = getCollection();
  return api(`collections/${collection.get('id')}/posts/${id}`,
    {
      method: 'delete',
    },
  )
    .then(filterError);
}

export const subscribePost = id => (
  api(`posts/${id}/subscribe`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);

export const unsubscribePost = id => (
  api(`posts/${id}/subscribe`,
    {
      method: 'delete',
    },
  )
    .then(filterError)
);

export const reportPost = (id, data) => (
  api(`posts/${id}/reports`,
    {
      method: 'post',
      body: data,
    },
  )
    .then(filterError)
    .then(parseJSON)
    .catch(res => res.response.status === 403)
);

export const searchPost = options => (
  api(`search/posts?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

export const listTrendingPost = options => (
  api(`topix/${options.tags}/posts?${qs.stringify(omit(options, 'tags'))}`)
    .then(filterError)
    .then(parseJSON)
);

export const setReadPercentage = id => (
  api(`posts/${id}/readPercentage/100`,
    {
      method: 'post',
    },
  )
    .then(filterError)
);
