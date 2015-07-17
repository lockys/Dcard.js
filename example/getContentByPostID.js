// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('dcard');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} post id, title, content of post, comments of post, post URL
 * @return raw object of post
 */
dcardDataGetter.getContentByPostID(328484, function(err, post) {
  if (!err) {
    console.log('Post id: ' + post.id);
    console.log('Title: ' + post.title);
    console.log('Content: ' + post.content);
    console.log('POST URL: ' + post.url);
    console.log('Raw Contect Obj ' + post.rawObject);
  } else {
    console.log(err);
  }
});
