var request = require('request');
var url = require('url');
var events = require('events');
var isValidInput = require('./lib/helper').isValidInput;

function DcardJS() {
  this.FORUM_API = 'https://www.dcard.tw/api/forum/';
  this.POST_CONTENT_API = 'https://www.dcard.tw/api/post/all/';
  this.POST_URL = 'https://www.dcard.tw/f/all/p/';
  this.POST_PER_PAGE = 20;
}

/**
 * Get Dcard Posts ID by forum name and page number of a forum
 * @param {String} forumName: forum name
 * @param {Number} pageNum: page number of a forum
 * @return {Array} Post ID array for a given page number
 */
DcardJS.prototype.getPostIdByForum = function(forumName, pageNum, callback) {

  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var forumAPI = url.resolve(this.FORUM_API, forumName);

  var forumPage = forumAPI + '/' + pageNum.toString();
  request(forumPage, correspondPosts);

  function correspondPosts(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (body === '[]') {
        // if body is empty (Ugly ways)
        callback(new Error('Page not found'), {});
      }

      var sortedPostId = [];
      var postJson = JSON.parse(body);
      (function syncPostID(x) {
        if (x < postJson.length) {
          var postID = postJson[x].id;
          sortedPostId.push(parseInt(postID));
          syncPostID(x + 1);
        }
      })(0);

      callback(null, {pageNum: pageNum, postIdList: sortedPostId});
    }
  }
};

/**
 * Get Dcard Hot Posts ID by forum name and page number of forum
 * @param {String} forumName: forum name
 * @param {Number} pageNum: page number of forum
 * @return {Array} post ID array Number for a given page number and forum name
 */
DcardJS.prototype.getHotPostIdByForum = function(forumName, pageNum, callback) {

  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var hotPath = forumName + '/' + pageNum.toString() + '/popular';
  var hotPostAPI = url.resolve(this.FORUM_API, hotPath);

  request(hotPostAPI, correspondPosts);

  // console.log(forumAPI);
  function correspondPosts(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (body === '[]') {
        // if body is empty (Ugly ways)
        callback(new Error('Page not found'), {});
      }

      var postJson = JSON.parse(body);
      var sortedPostId = [];

      (function syncPostID(x) {
        if (x < postJson.length) {
          var postID = postJson[x].id;
          sortedPostId.push(postID);
          syncPostID(x + 1);
        }
      })(0);

      callback(null, {pageNum: pageNum, postIdList: sortedPostId});
    }
  }
};

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} title, content of post, comments of post, post URL, and raw object of post
 */
DcardJS.prototype.getContentByPostID = function(postID, callback) {

  if (!isValidInput(postID)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var postAPI = url.resolve(this.POST_CONTENT_API, postID.toString());
  var postURL = url.resolve(this.POST_URL, postID.toString());
  request(postAPI, function(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (body === '[]') {
        callback(new Error('Post not found'), {});
      }

      var contentJson = JSON.parse(body);
      callback(null, {title: contentJson.version[0].title,
                      content: contentJson.version[0].content,
                      comment: contentJson.comment,
                      url: postURL,
                      rawObject: contentJson});
    }
  });
};

/**
 * Get Dcard Posts by given page range and forum.
 * @param {Number} start: the page number to start
 * @param {Number} end: the ending page number
 * @param {String} forumName: forum name
 * @param {String} getType: NORMAL, HOT, HOT_WITH_FORUM
 * @return {Array} Post object array in ascending order of time post created.
 */
DcardJS.prototype.getPostsByPageRangeAndForum = function(start, end, forumName, getType, callback) {

  if (!isValidInput(start) || !isValidInput(end)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  getType = getType || 'DEFAULT';
  var TOTAL_POST_CNT = 0;
  var TOTAL_POST_NUM = 0;
  var RANGE = end - start + 1;
  var postList = [];
  var eventEmitter = new events.EventEmitter();

  eventEmitter.on('post-cnt', plusPostCnt);

  var d = new DcardJS();
  for (var i = start; i <= end; i++) {
    switch (getType) {
      case 'HOT_WITH_FORUM':
        d.getHotPostIdByForum(forumName, i, getContentByIDcallback);
        break;
      case 'HOT':
        d.getHotPostId(i, getContentByIDcallback);
        break;
      default:
        d.getPostIdByForum(forumName, i, getContentByIDcallback);
    }
  }

  function getContentByIDcallback(err, pageInfo) {
    var idList = pageInfo.postIdList;
    // if id list is undefined, directly add 19 count, there are 20 post in a page. (mean a page is not exiting.)
    if (typeof idList !== 'undefined' && !err && idList.length > 0) {
      TOTAL_POST_NUM += idList.length;
    } else {
      return;
    }

    for (var i = 0, len = idList.length; i < len; i++) {
      d.getContentByPostID(idList[i], appendPost);
    }
  }

  function appendPost(err, post) {
    postList.push(post.rawObject);
    eventEmitter.emit('post-cnt');
  }

  function plusPostCnt() {
    TOTAL_POST_CNT++;
    if (TOTAL_POST_CNT === TOTAL_POST_NUM) {
      // All Post Get
      // Sorted for a given diffrent getType
      postList.sort(function(a, b) {
        switch (getType) {
          case 'NORMAL':
            return (new Date(a.version[0].createdAt) - new Date(b.version[0].createdAt));
          default:
            return a.likeCount - b.likeCount;
        }
      });

      callback(null, postList);
    }
  }
};

/**
 * Get global Dcard Hot Posts ID forum page number
 * @param {Number} pageNum: fpageNum orum page number
 * @return {Array} post ID array Number for a given page number
 */
DcardJS.prototype.getHotPostId = function(pageNum, callback) {

  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var hotPath = 'all/' + pageNum.toString() + '/popular';
  var hotPostAPI = url.resolve(this.FORUM_API, hotPath);

  request(hotPostAPI, correspondPosts);

  function correspondPosts(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (body === '[]') {
        // if body is empty (Ugly ways)
        callback(new Error('Page not found'), {});
      }

      var postJson = JSON.parse(body);
      var sortedPostId = [];

      (function syncPostID(x) {
        if (x < postJson.length) {
          var postID = postJson[x].id;
          sortedPostId.push(postID);
          syncPostID(x + 1);
        }
      })(0);

      callback(null, {pageNum: pageNum, postIdList: sortedPostId});
    }
  }
};

module.exports = DcardJS;
