module.exports = DcardJS;

var request = require('request');
var url = require('url');
var async = require('async');

var validator = require('./lib/validator');

function DcardJS() {
  this.FORUM_API = 'https://www.dcard.tw/api/forum/';
  this.POST_CONTENT_API = 'https://www.dcard.tw/api/post/all/';
  this.POST_URL = 'https://www.dcard.tw/f/all/p/';
  this.SEARCH_URL = 'https://www.dcard.tw/api/search';
}

/**
 * Get Dcard Posts ID by forum name and page number of a forum
 * @param {String} forumName: forum name
 * @param {Number} pageNum: page number of a forum
 * @return {Array} Post ID array for a given page number
 */
DcardJS.prototype.getPostIdByForum = function(forumName, pageNum, callback) {

  if (!validator.isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return;
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

    var postArr = [];
    for (var i = 0, resultsLen = results.length; i < resultsLen; i++) {
      var postJson = JSON.parse(results[i].body);
      for (var j = 0, postLen = postJson.length; j < postLen; j++) {
        var post = {  id: postJson[j].id,
                      likeCount: postJson[j].likeCount,
                      comment: postJson[j].comment,
                      title: postJson[j].version[0].title,
                      content: postJson[j].version[0].content,
                      gender: postJson[j].member.gender,
                      school: postJson[j].member.school,
                      department: postJson[j].member.department,
                      forumName: postJson[j].forumName,
                      createdAt: postJson[j].createdAt,
                      updatedAt: postJson[j].updatedAt,
                      rawObject: postJson[j],
                    };
        postArr.push(post);
      }
    }

    callback(null, postArr);
  });

};

/**
 * Get Dcard Hot Posts ID by forum name and page number of forum
 * @param {String} forumName: forum name
 * @param {Number} pageNum: page number of forum
 * @return {Array} post ID array Number for a given page number and forum name
 */
DcardJS.prototype.getHotPostIdByForum = function(forumName, pageNum, callback) {

  if (!validator.isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return;
  }

  // Prepare for request URLs
  var reqURLArray = [];
  for (var i = 1; i <= pageNum; i++) {
    var hotPath = forumName + '/' + i.toString() + '/popular';
    var hotPostAPI = url.resolve(this.FORUM_API, hotPath);
    reqURLArray.push(hotPostAPI);
  }

  async.map(reqURLArray, request.get, function(err, results) {
    if (err) {
      console.log(err);
    }

    var postArr = [];
    for (var i = 0, resultsLen = results.length; i < resultsLen; i++) {
      var postJson = JSON.parse(results[i].body);
      for (var j = 0, postLen = postJson.length; j < postLen; j++) {
        var post = {  id: postJson[j].id,
                      likeCount: postJson[j].likeCount,
                      comment: postJson[j].comment,
                      title: postJson[j].version[0].title,
                      content: postJson[j].version[0].content,
                      gender: postJson[j].member.gender,
                      school: postJson[j].member.school,
                      department: postJson[j].member.department,
                      forumName: postJson[j].forumName,
                      createdAt: postJson[j].createdAt,
                      updatedAt: postJson[j].updatedAt,
                      rawObject: postJson[j],
                    };
        postArr.push(post);
      }
    }

    callback(null, postArr);
  });

};

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} post id, title, content of post, comments of post, post URL
 * @return raw object of post
 */
DcardJS.prototype.getContentByPostID = function(postID, callback) {

  if (!validator.isValidInput(postID)) {
    callback(new Error('Page number must be positive integer.'));
    return;
  }

  var postAPI = url.resolve(this.POST_CONTENT_API, postID.toString());
  var postURL = url.resolve(this.POST_URL, postID.toString());
  request(postAPI, function(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (body === '[]') {
        callback(new Error('Post not found'), {});
      }

      var contentJson = JSON.parse(body);
      callback(null, {id: postID,
                      title: contentJson.version[0].title,
                      content: contentJson.version[0].content,
                      comment: contentJson.comment,
                      url: postURL,
                      rawObject: contentJson,
                     });
    }
  });
};

/**
 * Get global Dcard Hot Posts ID forum page number
 * @param {Number} pageNum: fpageNum orum page number
 * @return {Array} post ID array Number for a given page number
 */
DcardJS.prototype.getHotPostId = function(pageNum, callback) {

  if (!validator.isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return;
  }

  // Prepare for request URLs
  var reqURLArray = [];
  for (var i = 1; i <= pageNum; i++) {
    var hotPath = 'all/' + i.toString() + '/popular';
    var hotPostAPI = url.resolve(this.FORUM_API, hotPath);
    reqURLArray.push(hotPostAPI);
  }

  async.map(reqURLArray, request.get, function(err, results) {
    if (err) {
      console.log(err);
    }

    var postArr = [];
    for (var i = 0, resultsLen = results.length; i < resultsLen; i++) {
      var postJson = JSON.parse(results[i].body);
      for (var j = 0, postLen = postJson.length; j < postLen; j++) {
        var post = {  id: postJson[j].id,
                      likeCount: postJson[j].likeCount,
                      comment: postJson[j].comment,
                      title: postJson[j].version[0].title,
                      content: postJson[j].version[0].content,
                      gender: postJson[j].member.gender,
                      school: postJson[j].member.school,
                      department: postJson[j].member.department,
                      forumName: postJson[j].forumName,
                      createdAt: postJson[j].createdAt,
                      updatedAt: postJson[j].updatedAt,
                      rawObject: postJson[j],
                    };
        postArr.push(post);
      }
    }

    callback(null, postArr);
  });
};

/**
 * !Evaluting to be depreciated.
 * Get Dcard Posts by given page range and forum.
 * @param {Number} pageNum: pageNum
 * @param {String} forumName: forum name
 * @param {String} getType: DEFAULT, HOT, HOT_WITH_FORUM
 * @return {Array} Post object array in ascending order of time post created.
 */
DcardJS.prototype.getFullPostsByPageNumAndForum = function(pageNum, forumName, getType, callback) {
  if (!validator.isValidInput(pageNum)) {
    callback(new Error('Page number must be positive integer.'));
    return;
  }

  if (!validator.isValidType(getType)) {
    callback(new Error('Please specify a valid getType string.[\'DEFAULT\', \'HOT\', \'HOT_WITH_FORUM\']'));
    return;
  }

  var d = new DcardJS();
  switch (getType) {
    case 'HOT_WITH_FORUM':
      d.getHotPostIdByForum(forumName, pageNum, getContentByIDcallback);
      break;
    case 'HOT':
      d.getHotPostId(pageNum, getContentByIDcallback);
      break;
    case 'DEFAULT':
      d.getPostIdByForum(forumName, pageNum, getContentByIDcallback);
      break;
    default:
      break;
  }

  function getContentByIDcallback(err, postArr) {
    var reqArray = [];

    for (var i = 0, len = postArr.length; i < len; i++) {
      var postAPI = url.resolve(d.POST_CONTENT_API, (postArr[i].id).toString());
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
                        rawObject: postJson,
                      }
                      );
      }

      callback(null, postArr);
    });
  }

};

/**
 * Search Dcard Posts
 * @param {String} keyword: query keyword
 * @param {String} forumName: forum name
 * @param {String} school: author's school
 * @return {Array} Post object array in ascending order of time post created.
 */
DcardJS.prototype.search = function(keyword, forumName, school, callback) {
  if (!keyword) {
    callback(new Error('Please specify a keyword to search'));
    return;
  }

  var query = {search: keyword};
  if (forumName) {
    query.forum_alias = forumName;
  }
  if (school) {
    query.school = school;
  }

  request({method: 'GET', url: this.SEARCH_URL, qs: query, json: true}, function(error, response, body) {
    if (typeof response !== 'undefined' && !error && response.statusCode == 200) {
      if (!body || !body.length) {
        callback(new Error('Post not found'), {});
      }

      callback(null, body);
    }
  });
};
