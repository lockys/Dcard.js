const api = require('../lib/dcard');
/**
* These functions are open API without login.
* See docs/forumList.json to get forum alias
*/
const optiton = {
  forum: 'vehicle',
  popular: false,
  before: 227994176,
};

api.posts.listPost(optiton).then((res) => {
  console.log(res);
});

const postId = 227994176;
api.comments.listComments(postId, {}).then((res) => {
  console.log(res);
});
