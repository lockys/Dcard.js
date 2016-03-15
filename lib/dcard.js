"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNotifications = exports.getNotification = exports.getTodayDcard = exports.getStatus = exports.login = exports.getSearchResult = exports.getPostById = exports.getPostsFromForum = exports.getAllForum = exports.DcardClient = exports.MEMBER_API = exports.API_ORIGIN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var API_ORIGIN = exports.API_ORIGIN = "https://www.dcard.tw/api";
var MEMBER_API = exports.MEMBER_API = API_ORIGIN + "/member";

var DcardClient = exports.DcardClient = function DcardClient() {
    var _this = this;

    this.headers = new Headers();
    var XSRF_TOKEN_REGEX = /XSRF-TOKEN=([\w-]+);/;

    this.fetch = function (url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { "headers": {} } : arguments[1];

        options = _extends({}, options, {
            headers: _extends({}, options.headers, {
                "cookie": _this.headers.getAll("cookie").join(';'),
                "x-xsrf-token": _this.headers.get("x-xsrf-token")
            }),
            "credentials": "include"
        });

        return (0, _isomorphicFetch2.default)(url, options).then(function (response) {
            var cookie = response.headers.getAll("set-cookie").join(';');
            var xXsrfToken = cookie.match(XSRF_TOKEN_REGEX)[1];
            _this.headers.append("cookie", cookie);
            _this.headers.append("x-xsrf-token", xXsrfToken);
            return response;
        }).catch(function (reason) {
            console.log(reason);
        });
    };
};

var dc = new DcardClient();

var getAllForum = exports.getAllForum = function getAllForum() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: false,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + "/forum").then(function (response) {
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
        return fetch(API_ORIGIN + "/forum/" + forum + "/" + i + "/" + orderBy).then(function (response) {
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

    return fetch(API_ORIGIN + "/post/" + postId).then(function (response) {
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

    return fetch(API_ORIGIN + "/search?search=" + query + "&forum_alias=" + forumAlias + "&school=" + school).then(function (response) {
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

    return fetch(MEMBER_API + "/login").then(function () {
        return fetch(MEMBER_API + "/login", {
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

    return fetch(MEMBER_API + "/status").then(function (response) {
        return response.json();
    });
};

var getTodayDcard = exports.getTodayDcard = function getTodayDcard() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: true,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(API_ORIGIN + "/dcard").then(function (response) {
        return response.json();
    });
};

var getNotification = exports.getNotification = function getNotification() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        auth: true,
        client: dc
    } : arguments[0];

    var fetch = options.auth ? options.client.fetch : _isomorphicFetch2.default;

    return fetch(MEMBER_API + "/notification").then(function (response) {
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

    return fetch(API_ORIGIN + "/notifications?n=" + number + "&last_id=" + lastId).then(function (response) {
        return response.json();
    });
};