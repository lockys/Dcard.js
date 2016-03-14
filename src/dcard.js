import originalFetch from 'isomorphic-fetch';

const API_ORIGIN = `https://www.dcard.tw/api`;
const MEMBER_API = `${API_ORIGIN}/member`;

const DcardClient = function(originalFetch = originalFetch) {
    this.headers = new Headers();
    const XSRF_TOKEN_REGEX = /XSRF-TOKEN=([\w-]+);/;

    this.fetch = (url, options = { "headers": {} }) => {
        options = {
            ...options,
            headers: {
                ...options.headers,
                "cookie": this.headers.getAll("cookie").join(';'),
                "x-xsrf-token": this.headers.get("x-xsrf-token")
            },
            "credentials": "include"
        };

        return originalFetch(url, options)
            .then(response => {
                const cookie = response.headers.getAll("set-cookie").join(';');
                const xXsrfToken = cookie.match(XSRF_TOKEN_REGEX)[1];
                this.headers.append("cookie", cookie);
                this.headers.append("x-xsrf-token", xXsrfToken);
                return response;
            })
            .catch(reason => {
                console.log(reason);
            });
    };
};

export const fetchWithAuth = new DcardClient(originalFetch).fetch;


export const getAllForum = (options = {
    auth: false
}) => {
    const fetch = options.auth ? fetchWithAuth : originalFetch;

    return fetch(`${API_ORIGIN}/forum`)
        .then(response => response.json());
};

export const getPostsFromForum = (options = {}) => {
    options = {
        forum: "all", // forum name
        pageFrom: 1, // fetch from page
        pageTo: 1, // fetch until page
        orderBy: "popular", // order by "popular" or "recent"
        auth: false, // authentication enable or not
        ...options
    };
    let { forum, pageFrom, pageTo, orderBy, auth } = options;
    pageTo = pageFrom < pageTo ? pageTo : pageFrom;
    orderBy = orderBy === "recent" ? "" : "popular";

    const fetch = auth ? fetchWithAuth : originalFetch;

    const reqArray = new Array(pageTo - pageFrom + 1)
        .fill()
        .map( (cur, i) => i + pageFrom )
        .map(i =>
            fetch(`${API_ORIGIN}/forum/${forum}/${i}/${orderBy}`)
                .then(response => response.json())
        );

    return Promise.all(reqArray)
        .then(posts => [].concat(...posts));
};

export const getPostById = ({
    postId = "", // post id (required)
    auth = false
}) => {
    const fetch = auth ? fetchWithAuth : originalFetch;

    return fetch(`${API_ORIGIN}/post/${postId}`)
        .then(response => response.json());
};

export const getSearchResult = ({
    query = "", // search query (required)
    forumAlias = "all", // search from forum
    school = "", // search by school name
    auth = false
}) => {
    const fetch = auth ? fetchWithAuth : originalFetch;

    return fetch(`${API_ORIGIN}/search?search=${query}&forum_alias=${forumAlias}&school=${school}`)
        .then(response => response.json())
        .catch(reason => {
            console.error(reason);
        });
};

export const login = ({
    user = "", // username email (required)
    password = "", // user password (required)
    auth = true
}) => {
    const fetch = auth ? fetchWithAuth : originalFetch;

    return fetch(`${MEMBER_API}/login`)
        .then(() =>
            fetch(`${MEMBER_API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify({ user, password })
            })
        )
        .catch(reason => {
            console.error(reason);
        });
};

export const getStatus = (options = {
    auth: true
}) => {
    const fetch = options.auth ? fetchWithAuth : originalFetch;

    return fetch(`${MEMBER_API}/status`)
        .then(response => response.json());
};

export const getTodayDcard = (options = {
    auth: true
}) => {
    const fetch = options.auth ? fetchWithAuth : originalFetch;

    return fetch(`${API_ORIGIN}/dcard`)
        .then(response => response.json());
};

export const getNotification = (options = {
    auth: true
}) => {
    const fetch = options.auth ? fetchWithAuth : originalFetch;

    return fetch(`${MEMBER_API}/notification`)
        .then(response => response.json());
};

export const getNotifications = (options = {}) => {
    options = {
        number: 6, // display how many notifications at a time
        lastId: "", // last display notification id to chain
        auth: true,
        ...options
    };
    const { number, lastId, auth } = options;
    const fetch = auth ? fetchWithAuth : originalFetch;

    return fetch(`${API_ORIGIN}/notifications?n=${number}&last_id=${lastId}`)
        .then(response => response.json());
};
