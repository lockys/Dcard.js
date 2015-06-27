// Demo program for Dcard parser.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var dcardPaser = require('./lib/dard-parser');
dcardPaser = new dcardPaser();
/**
 * Get Dcard Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */
dcardPaser.getPostIdByForum ('sex', 3, function (err, postID) {
    if (!err) {
      console.log('Post id: ' + postID);
    } else {
      console.log(err);
    }
});

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} title, content of post.
 */
dcardPaser.getContentByPostID(328484, function(err, post){
  if (!err) {
    console.log('title: ' + post.title);
    console.log('content: ' + post.content);
  }
});
