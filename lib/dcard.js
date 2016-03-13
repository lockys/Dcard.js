"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = exports.getSearchResult = exports.getPostById = exports.getPostsFromForum = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var API_ORIGIN = "https://www.dcard.tw/api";
var FORUM_API = API_ORIGIN + "/forum";
var POST_API = API_ORIGIN + "/post";
var SEARCH_API = API_ORIGIN + "/search";
var LOGIN_API = API_ORIGIN + "/member/login";

var XSRF_TOKEN_REGEX = /XSRF-TOKEN=([\w-]+);/;

var fetchWithAuth = function fetchWithAuth() {
    var _this = this;

    var originalFetch = arguments.length <= 0 || arguments[0] === undefined ? fetch : arguments[0];

    this.headers = new Headers();

    this.fetch = function (url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? { "headers": {} } : arguments[1];

        options = _extends({}, options, {
            headers: _extends({}, options.headers, {
                "cookie": _this.headers.getAll("cookie").join(';'),
                "x-xsrf-token": _this.headers.get("x-xsrf-token")
            })
        });

        return originalFetch(url, options).then(function (response) {
            var cookie = response.headers.getAll("set-cookie");
            var xXsrfToken = cookie[0].match(XSRF_TOKEN_REGEX)[1];
            _this.headers.append("cookie", cookie.join(';'));
            _this.headers.append("x-xsrf-token", xXsrfToken);
            return response;
        }).catch(function (reason) {
            console.log(reason);
        });
    };
};

var fetch = new fetchWithAuth(_isomorphicFetch2.default).fetch;

var getPostsFromForum = exports.getPostsFromForum = function getPostsFromForum(_ref) // order by "popular" or "recent"
{
    var _ref$forum = _ref.forum;
    var forum = _ref$forum === undefined ? "all" : _ref$forum;
    var _ref$pageFrom = _ref.pageFrom;
    var // forum name
    pageFrom = _ref$pageFrom === undefined ? 1 : _ref$pageFrom;
    var _ref$pageTo = _ref.pageTo;
    var // fetch from page
    pageTo = _ref$pageTo === undefined ? 1 : _ref$pageTo;
    var _ref$orderBy = _ref.orderBy;
    var // fetch until page
    orderBy = _ref$orderBy === undefined ? "popular" : _ref$orderBy;

    pageTo = pageFrom < pageTo ? pageTo : pageFrom;
    orderBy = orderBy === "recent" ? "" : "popular";

    var reqArray = new Array(pageTo - pageFrom + 1).fill().map(function (cur, i) {
        return i + pageFrom;
    }).map(function (i) {
        return fetch(FORUM_API + "/" + forum + "/" + i + "/" + orderBy).then(function (response) {
            return response.json();
        });
    });

    return Promise.all(reqArray).then(function (posts) {
        var _ref2;

        return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(posts));
    });
};

var getPostById = exports.getPostById = function getPostById() {
    var postId = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    return fetch(POST_API + "/" + postId).then(function (response) {
        return response.json();
    });
};

var getSearchResult = exports.getSearchResult = function getSearchResult(_ref3) // search by school name
{
    var _ref3$query = _ref3.query;
    var query = _ref3$query === undefined ? "" : _ref3$query;
    var _ref3$forumAlias = _ref3.forumAlias;
    var // search query
    forumAlias = _ref3$forumAlias === undefined ? "all" : _ref3$forumAlias;
    var _ref3$school = _ref3.school;
    var // search from forum
    school = _ref3$school === undefined ? "" : _ref3$school;

    return fetch(SEARCH_API + "?search=" + query + "&forum_alias=" + forumAlias + "&school=" + school).then(function (response) {
        return response.json();
    }).catch(function (reason) {
        console.error(reason);
    });
};

var login = exports.login = function login(_ref4) {
    var _ref4$user = _ref4.user;
    var user = _ref4$user === undefined ? "" : _ref4$user;
    var _ref4$password = _ref4.password;
    var password = _ref4$password === undefined ? "" : _ref4$password;

    return fetch(LOGIN_API).then(function () {
        return fetch(LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ user: user, password: password })
        });
    }).then(function (response) {
        console.log(response);
        return response;
    }).catch(function (reason) {
        console.error(reason);
    });
};