// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('../index');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */

dcardDataGetter.getPostIdByForum ('funny', 4, function(err, postInfo) {
  if (!err) {
    console.log('Post id List: ' + postInfo.postIdList);
  } else {
    console.log(err);
  }
});