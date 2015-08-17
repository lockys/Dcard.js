// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('dcard');
var dcard = new DcardJS();

/**
 * Get Dcard Posts title and content
 * @param {Number} page number
 * @param {String} forum name
 * @param {String} HOT, HOT_WITH_FORUM, DEFAULT
 * @return {Array} List of posts, get raw object with post[i].rawObject
 */

dcard.getFullPostsByPageNumAndForum(1, 'funny', 'HOT_WITH_FORUM', function(err, postList) {
  if (!err) {
    console.log('[*]' + postList.length + ' posts');
    for (var i = 0, len = postList.length; i < len; i++) {
      console.log(postList[i].title + ', createdAt: ' + postList[i].rawObject.createdAt + ', like:' + postList[i].rawObject.likeCount);
    }
  }else {
    console.log(err);
  }
});
