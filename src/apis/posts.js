import { pick, omit } from 'lodash';
import qs from 'qs';
import { api, filterError, parseJSON } from '../request';
import { listCollection } from './collections';

/**
* List Posts of a forum
* @param {object} options
* @param {String} options.forum vehicle for instance, please refer to docs/forumList.json to get forum name.
* @param {String} options.before List posts before a post id
* @param {String} options.after List posts after a post id
* @param {Boolean} options.popular true | false
* @example
* const options = {
*   forum: 'vehicle',
*   popular: false,
*   before: 225687456,
* };
* listPost(options).then((res) => {
*   console.log(res);
* });
*/
export const listPost = (options) => {
  const url = options.forum ? `forums/${options.forum}/posts` : 'posts';

  return api(`${url}?${qs.stringify(omit(options, 'forum'))}`)
    .then(filterError)
    .then(parseJSON)
    .then((res) => {
      // event article
      if (!options.popular || options.after || options.before) {
        return res;
      }

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
            p.push(post);
          }

          return p;
        },

        [],
      ).concat(angels);
    });
};

/**
* List your posts. login required.
* @param {object} options
* @param {String} options.before List posts before a post id
* @example
* const options = {
*   before: 225687456,
* };
* listMyPost(options).then((res) => {
*   console.log(res);
* });
*/
export const listMyPost = options => (
  api(`me/posts?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

/**
* List your subscriptions. login required.
* @param {object} options
* @param {Boolean} options.popular true | false
* @example
* const options = {
*   popular: true,
* };
* listMySubscription(options).then((res) => {
*   console.log(res);
* });
*/
export const listMySubscription = options => (
  api(`me/subscriptions?${qs.stringify(options)}`)
    .then(filterError)
    .then(parseJSON)
);

/**
* Get content of a specified post id.
* @param {object} options {} is allowed
* @param {Number} id post id
* @example
* const postId = 225688036;
* const options = {};
* getPost(postId, options).then((res) => {
*   console.log(res);
* });
*/
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

/**
* Search posts by specified keyword.
* @param {object} options
* @param {string} options.query search keyword
* @example
* const options = {
*   query: '愛情',
* };
* searchPost(options).then((res) => {
*   console.log(res);
* });
*/
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
