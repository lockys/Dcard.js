import fs from 'fs';
import mkdirp from 'mkdirp';
import originalFetch from 'isomorphic-fetch';
import { EventEmitter } from 'events';

/* some error handling for browser need to be done... */
// const BROWSER_ENV = (typeof window) !== 'undefined';

export const API_ORIGIN = `https://www.dcard.tw/api`;
export const MEMBER_API = `${API_ORIGIN}/member`;

function mapCookiesToObject(cookies) {
    return cookies.join(';')
        .split(';')
        .map(pair => pair.trim().split('='))
        .reduce( (object, pair) => ({
            ...object,
            [pair[0]]: pair[1]
        }), {});
}
function mapObjectToCookies(object) {
    return Object.keys(object)
        .map(key => {
            if (!key) return '';
            else if (!object[key]) return key;
            else return `${key}=${object[key]}`;
        })
        .join(';');
}

function setCookie(get, set) {
    return mapObjectToCookies({
        ...mapCookiesToObject(get),
        ...mapCookiesToObject(set)
    });
}

// create a new DcardClient which persist the cookie connection.
export const DcardClient = function() {
    this.headers = new Headers();
    this.eventEmitter = new EventEmitter();
    const XSRF_TOKEN_REGEX = /XSRF-TOKEN=([\w-_]+);/;

    this.fetch = (url, options = { "headers": {} }) => {
        this.eventEmitter.emit('beforeFetch');
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
                const cookie = setCookie(
                    this.headers.getAll("cookie"),
                    response.headers.getAll("set-cookie")
                );
                const xXsrfToken = cookie.match(XSRF_TOKEN_REGEX)[1]; // some error handling should be done here
                this.headers.set("x-xsrf-token", xXsrfToken);
                this.headers.set("cookie", cookie);
                this.eventEmitter.emit('afterFetch');
                return response;
            })
            .catch(reason => {
                console.error(reason);
                return reason;
            });
    };
};

// default DcardClient
let dc = new DcardClient();
export { dc as defaultClient };

// set default dcard client
export const setDefaultClient = (client) => {
    dc = client;
};

// get all the forum name available
export const getAllForum = (options = {
    auth: false,
    client: dc
}) => {
    const fetch = options.auth ? options.client.fetch : originalFetch;

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
        client: dc, // DcardClient instance
        ...options
    };
    let { forum, pageFrom, pageTo, orderBy, auth, client } = options;
    pageTo = pageFrom < pageTo ? pageTo : pageFrom;
    orderBy = orderBy === "recent" ? "" : "popular";

    const fetch = auth ? client.fetch : originalFetch;

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
    auth = false,
    client = dc
}) => {
    const fetch = auth ? client.fetch : originalFetch;

    return fetch(`${API_ORIGIN}/post/${postId}`)
        .then(response => response.json());
};

export const getSearchResult = ({
    query = "", // search query (required)
    forumAlias = "all", // search from forum
    school = "", // search by school name
    auth = false,
    client = dc
}) => {
    const fetch = auth ? client.fetch : originalFetch;

    return fetch(`${API_ORIGIN}/search?search=${query}&forum_alias=${forumAlias}&school=${school}`)
        .then(response => response.json())
        .catch(reason => {
            console.error(reason);
        });
};

export const login = ({
    user = "", // username email (required)
    password = "", // user password (required)
    auth = true,
    client = dc
}) => {
    const fetch = auth ? client.fetch : originalFetch;

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
    auth: true,
    client: dc
}) => {
    const fetch = options.auth ? options.client.fetch : originalFetch;

    return fetch(`${MEMBER_API}/status`)
        .then(response => response.json());
};

export const getTodayDcard = (options = {
    auth: true,
    client: dc
}) => {
    const fetch = options.auth ? options.client.fetch : originalFetch;

    return fetch(`${API_ORIGIN}/dcard`)
        .then(response => response.json());
};

export const getNotification = (options = {
    auth: true,
    client: dc
}) => {
    const fetch = options.auth ? options.client.fetch : originalFetch;

    return fetch(`${MEMBER_API}/notification`)
        .then(response => response.json());
};

export const getNotifications = (options = {}) => {
    options = {
        number: 6, // display how many notifications at a time
        lastId: "", // last display notification id to chain
        auth: true,
        client: dc,
        ...options
    };
    const { number, lastId, auth } = options;
    const fetch = auth ? options.client.dc : originalFetch;

    return fetch(`${API_ORIGIN}/notifications?n=${number}&last_id=${lastId}`)
        .then(response => response.json());
};

export const getFriends = (options = {
    auth: true,
    client: dc
}) => {
    const fetch = options.auth ? options.client.fetch : originalFetch;

    return fetch(`${API_ORIGIN}/friends`)
        .then(response => response.json());
};


export const downloadImagesFromPost = ({
    postId = '',
    outDir = './images',
    authorOnly = false
}) => {
    getPostById({ postId })
        .then(content => {
            const group = JSON.stringify(authorOnly ? content.version[content.version.length - 1].content : content)
                .match(/imgur.com\/(\w+)/g)
                .map(uri => uri.match(/imgur.com\/(\w+)/)[1]);

                if (group.length) {
                    return new Promise( (resolve, reject) => {
                        mkdirp(outDir, (err) => {
                            if (err) reject(err);
                            resolve(group);
                        });
                    });
                }
        })
        .then(group => Promise.all(group.map(
            fileName => originalFetch(`http://i.imgur.com/${fileName}.png`)
                .then(img => img.body.pipe(fs.createWriteStream(`${outDir}/${fileName}.png`)))
        )));
};

export const downloadImagesFromForum = (options = {}) => {
    options = {
        forum: "all", // forum name
        pageFrom: 1, // fetch from page
        pageTo: 1, // fetch until page
        orderBy: "popular", // order by "popular" or "recent"
        outDir: './images',
        groupByPosts: false,
        authorOnly: false,
        auth: false, // authentication enable or not
        client: dc, // DcardClient instance
        ...options
    };

    return getPostsFromForum(options)
        .then(posts =>
            Promise.all(
                posts.map(post =>
                    downloadImagesFromPost({
                        postId: post.id,
                        ...options,
                        outDir: options.outDir + (options.groupByPosts ? '/' + post.version.slice(-1)[0].title : '')
                    })
                )
            )
        );
};
