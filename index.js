var request = require('request');
var url = require('url');

function DcardJS() {
  this.FORUM_API = 'https://www.dcard.tw/api/forum/';
  this.POST_CONTENT_API = 'https://www.dcard.tw/api/post/all/';
  this.POST_URL = 'https://www.dcard.tw/f/all/p/';
}

/**
 * Get Dcard Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */
DcardJS.prototype.getPostIdByForum = function(forumName, pageNum, callback) {

  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var forumAPI = url.resolve(this.FORUM_API, forumName);

  for (var i = 1; i <= pageNum; i++) {
    var forumPage = forumAPI + '/' + i.toString();
    request(forumPage, correspondPosts);

    //console.log('Sent request to -> ' + forumPage);
  }

  // console.log(forumAPI);
  function correspondPosts(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (body === '[]') {
        // if body is empty (Ugly ways)
        callback(new Error('Page not found'), {});
      }

      var postJson = JSON.parse(body);
      for (var j = 0, postLen = postJson.length; j < postLen; j++) {
        var postID = postJson[j].id;
        callback(null, postID);

        //console.log(postJson[j].id);
      }
    }
  }
};

/**
 * Get Dcard Hot Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */
DcardJS.prototype.getHotPostIdByForum = function(forumName, pageNum, callback) {

  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var hotPath = forumName + '/' + pageNum.toString() + '/popular';
  var hotPostAPI = url.resolve(this.FORUM_API, hotPath);

  for (var i = 1; i <= pageNum; i++) {
    request(hotPostAPI, correspondPosts);

    //console.log('Sent request to -> ' + forumPage);
  }

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

      callback(null, {postIdList: sortedPostId});
    }
  }
};

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} title, content of post, comments of post, post URL
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
                      url: postURL});
    }
  });
};

/**
 * Get Dcard Hot Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */
DcardJS.prototype.getHotPostId = function(pageNum, callback) {

  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  var hotPath = 'all/' + pageNum.toString() + '/popular';
  var hotPostAPI = url.resolve(this.FORUM_API, hotPath);

  for (var i = 1; i <= pageNum; i++) {
    request(hotPostAPI, correspondPosts);

    // console.log('Sent request to -> ' + hotPostAPI);
  }

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

      callback(null, {postIdList: sortedPostId});
    }
  }
};

function isValidInput(pageNum) {
  if (pageNum !== parseInt(pageNum, 10)) {
    return false;
  }

  return true;
}

module.exports = DcardJS;
