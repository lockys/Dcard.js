import {ActionTypes} from '../constants';
import {api, filterError, parseJSON} from '../api';
import {createAction} from 'redux-actions';
import createAsyncAction from '../utils/createAsyncAction';
import {listCollection} from './collections';
import {pick, omit} from 'lodash';
import {pushToast} from './toasts';
import qs from 'qs';

export function getPostListKey(options) {
  return qs.stringify(pick(options, ['forum', 'popular', 'query', 'tags']));
}

export function getMyPostListKey() {
  return 'myposts';
}

export function getMySubscriptionKey(options) {
  return getPostListKey({
    forum: 'mysubscriptions',
    ...options
  });
}

export const listPost = createAsyncAction(ActionTypes.LIST_POST, function(options) {
  let url = options.forum ? `forums/${options.forum}/posts` : 'posts';

  return api(url + '?' + qs.stringify(omit(options, 'forum')), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(res => {
      // event article
      if (!options.popular || options.after || options.before) return res;

      let angels = [];
      return res.reduce((posts, post, idx) => {
        if (idx === 9 && angels.length) {
          posts = posts.concat(angels);
          angels = [];
        } else if (post.pinned && post.department === 'dcardadangel') {
          angels.push(post);
        } else {
          posts.push(post);
        }

        return posts;
      }, []).concat(angels);
    });
},

(options, refresh) => ({
  key: getPostListKey(options),
  refresh
}));

export const listMyPost = createAsyncAction(ActionTypes.LIST_MY_POST, function(options) {
  return api('me/posts?' + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getMyPostListKey(),
  refresh
}));

export const listMySubscription = createAsyncAction(ActionTypes.LIST_POST, function(options) {
  return api('me/subscriptions?' + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getMySubscriptionKey(options),
  refresh
}));

export const getPost = createAsyncAction(ActionTypes.UPDATE_POST, function(id, options) {
  return api(`posts/${id}?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(id) => ({
  id: +id
}));

export const createPost = createAsyncAction(ActionTypes.UPDATE_POST, function(data) {
  const endpoint = data.replyId ? `posts/${data.replyId}/replies` : `forums/${data.forum}/posts`;

  return api(endpoint, {
    method: 'post',
    body: pick(data, [
      'title',
      'content',
      'anonymous',
      'withNickname'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const updatePost = createAsyncAction(ActionTypes.UPDATE_POST, function(id, data) {
  return api(`posts/${id}`, {
    method: 'put',
    body: pick(data, [
      'title',
      'content'
    ])
  }, this)
    .then(filterError)
    .then(parseJSON);
});

export const destroyPost = createAsyncAction(ActionTypes.DESTROY_POST, function(id) {
  return api(`posts/${id}`, {
    method: 'delete'
  }, this)
    .then(filterError)
    .then(() => ({id: +id}));
});

export const likePost = createAsyncAction(ActionTypes.LIKE_POST, function(id) {
  return api(`posts/${id}/like`, {
    method: 'post'
  }, this)
    .then(filterError);
}, id => ({id: +id}));

export const unlikePost = createAsyncAction(ActionTypes.UNLIKE_POST, function(id) {
  return api(`posts/${id}/like`, {
    method: 'delete'
  }, this)
    .then(filterError);
}, id => ({id: +id}));

function getCollection(store) {
  const {collections} = store.getState();
  if (collections.store.count()) return Promise.resolve(collections.store.first());

  return store.dispatch(listCollection()).then(() => {
    return store.getState().collections.store.first();
  });
}

export const collectPost = createAsyncAction(ActionTypes.COLLECT_POST, function(id) {
  return getCollection(this).then(collection => {
    return api(`collections/${collection.get('id')}/posts`, {
      method: 'post',
      body: {
        postId: +id
      }
    }, this)
      .then(filterError);
  }).then(res => {
    this.dispatch(pushToast({
      content: '收藏成功！'
    }));

    return res;
  });
}, id => ({id: +id}));

export const uncollectPost = createAsyncAction(ActionTypes.UNCOLLECT_POST, function(id) {
  return getCollection(this).then(collection => {
    return api(`collections/${collection.get('id')}/posts/${id}`, {
      method: 'delete'
    }, this)
      .then(filterError);
  }).then(res => {
    this.dispatch(pushToast({
      content: '取消收藏成功！'
    }));

    return res;
  });
}, id => ({id: +id}));

export const subscribePost = createAsyncAction(ActionTypes.SUBSCRIBE_POST, function(id, isComment) {
  return api(`posts/${id}/subscribe`, {
    method: 'post'
  }, this)
    .then(filterError)
    .then(res => {
      if (!isComment) {
        this.dispatch(pushToast({
          content: '追蹤成功！'
        }));
      }

      return res;
    });
}, id => ({id: +id}));

export const unsubscribePost = createAsyncAction(ActionTypes.UNSUBSCRIBE_POST, function(id) {
  return api(`posts/${id}/subscribe`, {
    method: 'delete'
  }, this)
    .then(filterError)
    .then(res => {
      this.dispatch(pushToast({
        content: '取消追蹤成功！'
      }));

      return res;
    });
}, id => ({id: +id}));

export const reportPost = createAsyncAction(ActionTypes.REPORT_POST, function(id, data) {
  return api(`posts/${id}/reports`, {
    method: 'post',
    body: data
  }, this)
    .then(filterError)
    .then(parseJSON)
    .then(res => {
      this.dispatch(pushToast({
        content: '文章檢舉成功！'
      }));

      return res;
    })
    .catch(res => {
      if (res.response.status === 403) {
        this.dispatch(pushToast({
          content: '已檢舉成功！'
        }));
      }

      return res;
    });
});

export const searchPost = createAsyncAction(ActionTypes.LIST_POST, function(options) {
  return api(`search/posts?` + qs.stringify(options), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getPostListKey(options),
  refresh
}));

export const listTrendingPost = createAsyncAction(ActionTypes.LIST_POST, function(options) {
  return api(`topix/${options.tags}/posts?` + qs.stringify(omit(options, 'tags')), {
    method: 'get'
  }, this)
    .then(filterError)
    .then(parseJSON);
},

(options, refresh) => ({
  key: getPostListKey(options),
  refresh
}));

export const setReadPercentage = createAsyncAction(ActionTypes.SET_READ_PERCENTAGE, function(id) {
  return api(`posts/${id}/readPercentage/100`, {
    method: 'post'
  }, this)
    .then(filterError);
}, id => ({id: +id}));

export const updatePreviousPostPaginationLocationAndParams = createAction(ActionTypes.UPDATE_PREVIOUS_POST_PAGINATION_LOCATION_AND_PARAMS);
