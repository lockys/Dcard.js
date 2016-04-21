'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadImagesFromForum = exports.downloadImagesFromPost = exports.getFriends = exports.getNotifications = exports.getNotification = exports.getTodayDcard = exports.getStatus = exports.login = exports.getSearchResult = exports.getPostById = exports.getPostsFromForum = exports.getAllForum = exports.setDefaultClient = exports.defaultClient = exports.DcardClient = exports.MEMBER_API = exports.API_ORIGIN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* some error handling for browser need to be done... */
// const BROWSER_ENV = (typeof window) !== 'undefined';

var API_ORIGIN = exports.API_ORIGIN = 'https://www.dcard.tw/api';
var MEMBER_API = exports.MEMBER_API = API_ORIGIN + '/member';

function mapCookiesToObject(cookies) {
    return cookies.join(';').split(';').map(function (pair) {
        return pair.trim().split('=');
    }).reduce(function (object, pair) {
        return _extends({}, object, _defineProperty({}, pair[0], pair[1]));
    }, {});
}
function mapObjectToCookies(object) {
    return Object.keys(object).map(function (key) {
        if (!key) return '';else if (!object[key]) return key;else return key + '=' + object[key];
    }).join(';');
}

function setCookie(get, set) {
    return mapObjectToCookies(_extends({}, mapCookiesToObject(get), mapCookiesToObject(set)));
}

// create a new DcardClient which persist the cookie connection.
var DcardClient = exports.DcardClient = function DcardClient() {
    var _this = this;

    this.headers = new Headers();
    this.eventEmitter = new _events.EventEmitter();
    var XSRF_TOKEN_REGEX = /XSRF-TOKEN=([\w-_]+);/;

    this.fetch = function (url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { "headers": {} } : arguments[1];

        _this.eventEmitter.emit('beforeFetch');
        options = _extends({}, options, {
            headers: _extends({}, options.headers, {
                "cookie": _this.headers.getAll("cookie").join(';'),
                "x-xsrf-token": _this.headers.get("x-xsrf-token")
            })
        });

        return (0, _isomorphicFetch2.default)(url, options).then(function (response) {
            var cookie = setCookie(_this.headers.getAll("cookie"), response.headers.getAll("set-cookie"));
            var xXsrfToken = cookie.match(XSRF_TOKEN_REGEX)[1]; // some error handling should be done here
            _this.headers.set("x-xsrf-token", xXsrfToken);
            _this.headers.set("cookie", cookie);
            _this.eventEmitter.emit('afterFetch');
            return response;
        }).catch(function (reason) {
            console.error(reason);
            return reason;
        });
    };
};

// default DcardClient
var dc = new DcardClient();
exports.defaultClient = dc;

// set default dcard client

var setDefaultClient = exports.setDefaultClient = function setDefaultClient(client) {
    exports.defaultClient = dc = client;
};

// get all the forum name available
var getAllForum = exports.getAllForum = function getAllForum() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: false,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + '/forum').then(function (response) {
        return response.json();
    });
};

var getPostsFromForum = exports.getPostsFromForum = function getPostsFromForum() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    options = _extends({
        forum: "all", // forum name
        pageFrom: 1, // fetch from page
        pageTo: 1, // fetch until page
        orderBy: "popular", // order by "popular" or "recent"
        auth: false, // authentication enable or not
        client: dc }, options);
    var _options = options;
    var forum = _options.forum;
    var pageFrom = _options.pageFrom;
    var pageTo = _options.pageTo;
    var orderBy = _options.orderBy;
    var auth = _options.auth;
    var client = _options.client;

    pageTo = pageFrom < pageTo ? pageTo : pageFrom;
    orderBy = orderBy === "recent" ? "" : "popular";

    var fetch = auth ? client.fetch : _isomorphicFetch2.default;

    var reqArray = new Array(pageTo - pageFrom + 1).fill().map(function (cur, i) {
        return i + pageFrom;
    }).map(function (i) {
        return fetch(API_ORIGIN + '/forum/' + forum + '/' + i + '/' + orderBy).then(function (response) {
            return response.json();
        });
    });

    return Promise.all(reqArray).then(function (posts) {
        var _ref;

        return (_ref = []).concat.apply(_ref, _toConsumableArray(posts));
    });
};

var getPostById = exports.getPostById = function getPostById(_ref2) {
    var _ref2$postId = _ref2.postId;
    var postId = _ref2$postId === undefined ? "" : _ref2$postId;
    var _ref2$auth = _ref2.auth;
    var // post id (required)
    auth = _ref2$auth === undefined ? false : _ref2$auth;
    var _ref2$client = _ref2.client;
    var client = _ref2$client === undefined ? dc : _ref2$client;

    var fetch = auth ? client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + '/post/' + postId).then(function (response) {
        return response.json();
    });
};

var getSearchResult = exports.getSearchResult = function getSearchResult(_ref3) {
    var _ref3$query = _ref3.query;
    var query = _ref3$query === undefined ? "" : _ref3$query;
    var _ref3$forumAlias = _ref3.forumAlias;
    var // search query (required)
    forumAlias = _ref3$forumAlias === undefined ? "all" : _ref3$forumAlias;
    var _ref3$school = _ref3.school;
    var // search from forum
    school = _ref3$school === undefined ? "" : _ref3$school;
    var _ref3$auth = _ref3.auth;
    var // search by school name
    auth = _ref3$auth === undefined ? false : _ref3$auth;
    var _ref3$client = _ref3.client;
    var client = _ref3$client === undefined ? dc : _ref3$client;

    var fetch = auth ? client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + '/search?search=' + query + '&forum_alias=' + forumAlias + '&school=' + school).then(function (response) {
        return response.json();
    }).catch(function (reason) {
        console.error(reason);
    });
};

var login = exports.login = function login(_ref4) {
    var _ref4$user = _ref4.user;
    var user = _ref4$user === undefined ? "" : _ref4$user;
    var _ref4$password = _ref4.password;
    var // username email (required)
    password = _ref4$password === undefined ? "" : _ref4$password;
    var _ref4$auth = _ref4.auth;
    var // user password (required)
    auth = _ref4$auth === undefined ? true : _ref4$auth;
    var _ref4$client = _ref4.client;
    var client = _ref4$client === undefined ? dc : _ref4$client;

    var fetch = auth ? client.fetch : _isomorphicFetch2.default;

    return fetch(MEMBER_API + '/login').then(function () {
        return fetch(MEMBER_API + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ user: user, password: password })
        });
    }).catch(function (reason) {
        console.error(reason);
    });
};

var getStatus = exports.getStatus = function getStatus() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: true,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(MEMBER_API + '/status').then(function (response) {
        return response.json();
    });
};

var getTodayDcard = exports.getTodayDcard = function getTodayDcard() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: true,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + '/dcard').then(function (response) {
        return response.json();
    });
};

var getNotification = exports.getNotification = function getNotification() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: true,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(MEMBER_API + '/notification').then(function (response) {
        return response.json();
    });
};

var getNotifications = exports.getNotifications = function getNotifications() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    options = _extends({
        number: 6, // display how many notifications at a time
        lastId: "", // last display notification id to chain
        auth: true,
        client: dc
    }, options);
    var _options2 = options;
    var number = _options2.number;
    var lastId = _options2.lastId;
    var auth = _options2.auth;

    var fetch = auth ? options.client.dc : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + '/notifications?n=' + number + '&last_id=' + lastId).then(function (response) {
        return response.json();
    });
};

var getFriends = exports.getFriends = function getFriends() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: true,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + '/friends').then(function (response) {
        return response.json();
    });
};

var downloadImagesFromPost = exports.downloadImagesFromPost = function downloadImagesFromPost(_ref5) {
    var _ref5$postId = _ref5.postId;
    var postId = _ref5$postId === undefined ? '' : _ref5$postId;
    var _ref5$outDir = _ref5.outDir;
    var outDir = _ref5$outDir === undefined ? './images' : _ref5$outDir;
    var _ref5$authorOnly = _ref5.authorOnly;
    var authorOnly = _ref5$authorOnly === undefined ? false : _ref5$authorOnly;

    getPostById({ postId: postId }).then(function (content) {
        var group = JSON.stringify(authorOnly ? content.version[content.version.length - 1].content : content).match(/imgur.com\/(\w+)/g).map(function (uri) {
            return uri.match(/imgur.com\/(\w+)/)[1];
        });

        if (group.length) {
            return new Promise(function (resolve, reject) {
                (0, _mkdirp2.default)(outDir, function (err) {
                    if (err) reject(err);
                    resolve(group);
                });
            });
        }
    }).then(function (group) {
        return Promise.all(group.map(function (fileName) {
            return (0, _isomorphicFetch2.default)('http://i.imgur.com/' + fileName + '.png').then(function (img) {
                return img.body.pipe(_fs2.default.createWriteStream(outDir + '/' + fileName + '.png'));
            });
        }));
    });
};

var downloadImagesFromForum = exports.downloadImagesFromForum = function downloadImagesFromForum() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    options = _extends({
        forum: "all", // forum name
        pageFrom: 1, // fetch from page
        pageTo: 1, // fetch until page
        orderBy: "popular", // order by "popular" or "recent"
        outDir: './images',
        groupByPosts: false,
        authorOnly: false,
        auth: false, // authentication enable or not
        client: dc }, options);

    return getPostsFromForum(options).then(function (posts) {
        return Promise.all(posts.map(function (post) {
            return downloadImagesFromPost(_extends({
                postId: post.id
            }, options, {
                outDir: options.outDir + (options.groupByPosts ? '/' + post.version.slice(-1)[0].title : '')
            }));
        }));
    });
};