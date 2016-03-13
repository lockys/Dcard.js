import originalFetch from 'isomorphic-fetch';

const API_ORIGIN = `https://www.dcard.tw/api`;
const FORUM_API = `${API_ORIGIN}/forum`;
const POST_API = `${API_ORIGIN}/post`;
const SEARCH_API = `${API_ORIGIN}/search`;
const LOGIN_API = `${API_ORIGIN}/member/login`;

const XSRF_TOKEN_REGEX = /XSRF-TOKEN=([\w-]+);/;

const fetchWithAuth = function(originalFetch = fetch) {
    this.headers = new Headers();

    this.fetch = (url, options = { "headers": {} }) => {
        options = {
            ...options,
            headers: {
                ...options.headers,
                "cookie": this.headers.getAll("cookie").join(';'),
                "x-xsrf-token": this.headers.get("x-xsrf-token")
            }
        };

        return originalFetch(url, options)
            .then(response => {
                const cookie = response.headers.getAll("set-cookie");
                const xXsrfToken = cookie[0].match(XSRF_TOKEN_REGEX)[1];
                this.headers.append("cookie", cookie.join(';'));
                this.headers.append("x-xsrf-token", xXsrfToken);
                return response;
            })
            .catch(reason => {
                console.log(reason);
            });
    };
};

const fetch = new fetchWithAuth(originalFetch).fetch;


export const getPostsFromForum = ({
    forum = "all", // forum name
    pageFrom = 1, // fetch from page
    pageTo = 1, // fetch until page
    orderBy = "popular" // order by "popular" or "recent"
}) => {
    pageTo = pageFrom < pageTo ? pageTo : pageFrom;
    orderBy = orderBy === "recent" ? "" : "popular";

    const reqArray = new Array(pageTo - pageFrom + 1)
        .fill()
        .map( (cur, i) => i + pageFrom )
        .map(i =>
            fetch(`${FORUM_API}/${forum}/${i}/${orderBy}`)
                .then(response => response.json())
        );

    return Promise.all(reqArray)
        .then(posts => [].concat(...posts));
};

export const getPostById = (postId = "") => {
    return fetch(`${POST_API}/${postId}`)
        .then(response => response.json());
};

export const getSearchResult = ({
    query = "", // search query
    forumAlias = "all", // search from forum
    school = "" // search by school name
}) => {
    return fetch(`${SEARCH_API}?search=${query}&forum_alias=${forumAlias}&school=${school}`)
        .then(response => response.json())
        .catch(reason => {
            console.error(reason);
        });
};

export const login = ({
    user = "",
    password = ""
}) => {
    return fetch(LOGIN_API)
    .then(() =>
        fetch(LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({ user, password })
        })
    )
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(reason => {
        console.error(reason);
    });
};
