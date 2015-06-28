// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('../index');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Hot Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */

dcardDataGetter.getHotPostIdByForum('sex', 1, function(err, postInfo) {
  if (!err) {
    console.log('Hot Post id List by forum: ' + postInfo.postIdList + ' at Page ' + postInfo.pageNum);
  } else {
    console.log(err);
  }
});
