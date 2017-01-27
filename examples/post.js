/**
* These functions are open API without login.
* See docs/forumList.json to get forum alias
*/
const postOpt = {
  forum: 'vehicle',
  popular: false,
  before: 225687456,
};
api.posts.listPost(postOpt).then((res) => {
  console.log(res);
});

const postId = 225681815;
const options = {};
api.comments.listComments(postId, options).then((res) => {
  console.log(res);
});
