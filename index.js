var request = require('request');
var url = require('url');
var async = require('async');

var isValidInput = require('./lib/validator').isValidInput;

function DcardJS() {
  this.FORUM_API = 'https://www.dcard.tw/api/forum/';
  this.POST_CONTENT_API = 'https://www.dcard.tw/api/post/all/';
  this.POST_URL = 'https://www.dcard.tw/f/all/p/';
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
  var reqArray = [];
  for (var i = 1; i <= pageNum; i++) {
    var forumPage = forumAPI + '/' + i.toString();
    reqArray.push(forumPage);
  }

  async.map(reqArray, request.get, function(err, results) {
    // results is now an array of stats for each file
    if (err) {
      console.log(err);
      return;
    }

    var postIdArr = [];
    for (var i = 0; i < results.length; i++) {
      var postJson = JSON.parse(results[i].body);
      for (var j = 0; j < postJson.length; j++) {
        var postID = postJson[j].id;
        postIdArr.push(postID);
      }
    }

    callback(null, postIdArr);
  });

};

/**
 * Get Dcard Hot Posts ID by forum name and page number of forum
 * @param {String} forumName: forum name
 * @param {Number} pageNum: page number of forum
 * @return {Array} post ID array Number for a given page number and forum name
 */
DcardJS.prototype.getHotPostIdByForum = function(forumName, pageNum, callback) {

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
 * Get global Dcard Hot Posts ID forum page number
 * @param {Number} pageNum: fpageNum orum page number
 * @return {Array} post ID array Number for a given page number
 */
DcardJS.prototype.getHotPostId = function(pageNum, callback) {

};

/**
 * Get Dcard Posts by given page range and forum.
 * @param {Number} pageNum: pageNum
 * @param {String} forumName: forum name
 * @param {String} getType: NORMAL, HOT, HOT_WITH_FORUM
 * @return {Array} Post object array in ascending order of time post created.
 */
DcardJS.prototype.getFullPostsByPageNumAndForum = function(pageNum, forumName, getType, callback) {
  if (!isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return false;
  }

  getType = getType || 'DEFAULT';
  var d = new DcardJS();
  switch (getType) {
    case 'HOT_WITH_FORUM':
      d.getHotPostIdByForum(forumName, pageNum, getContentByIDcallback);
      break;
    case 'HOT':
      d.getHotPostId(pageNum, getContentByIDcallback);
      break;
    default:
      d.getPostIdByForum(forumName, pageNum, getContentByIDcallback);
  }

  function getContentByIDcallback(err, postIdArr) {
    var reqArray = [];
    for (var i = 0, len = postIdArr.length; i < len; i++) {
      var postAPI = url.resolve(d.POST_CONTENT_API, postIdArr[i].toString());
      reqArray.push(postAPI);
    }

    async.map(reqArray, request.get, function(err, results) {
      // results is now an array of stats for each file
      if (err) {
        console.log(err);
        return;
      }

      var postArr = [];

      for (var i = 0, len = results.length; i < len; i++) {
        var postJson = JSON.parse(results[i].body);
        postArr.push({title: postJson.version[0].title,
                        content: postJson.version[0].content,
                        comment: postJson.comment,
                        rawObject: postJson});
      }

      callback(null, postArr);
    });
  }

};

module.exports = DcardJS;
