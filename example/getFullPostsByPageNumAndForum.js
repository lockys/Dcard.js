// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('../index');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} title, content of post.
 */

dcardDataGetter.getFullPostsByPageNumAndForum(5, 'sex', 'HOT_WITH_FORUM', function(err, postList) {
  if (!err) {
    console.log('[*]' + postList.length + ' posts');
    for (var i = 0, len = postList.length; i < len; i++) {
      console.log(postList[i].title + ', createdAt: ' + postList[i].rawObject.createdAt + ', like:' + postList[i].rawObject.likeCount);
    }
  }else {
    console.log(err);
  }
});
