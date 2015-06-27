// Demo program for Dcard parser.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardPaser = require('./lib/dcard');
dcardPaser = new DcardPaser();
/**
 * Get Dcard Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */
dcardPaser.getPostIdByForum ('sex', 3, function(err, postID) {
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
dcardPaser.getContentByPostID(328484, function(err, post) {
  if (!err) {
    // console.log(post);
    console.log('Title: ' + post.title);
    console.log('Content: ' + post.content);
    console.log('URL:' + post.url);

  }
});

/**
 * Get Dcard Hot Posts ID by forum page number
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */
dcardPaser.getHotPostId(1, function(err, postID) {
  if (!err) {
    console.log('Hot Post id: ' + postID);
  } else {
    console.log(err);
  }
});

/**
 * Get Dcard Hot Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */

dcardPaser.getHotPostIdByForum('funny', 1, function(err, postID) {
  if (!err) {
    console.log('Hot Post id by forum: ' + postID);
  } else {
    console.log(err);
  }
});
