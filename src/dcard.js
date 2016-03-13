import fetch from 'isomorphic-fetch';

const API_ORIGIN = `https://www.dcard.tw/api`;
const FORUM_API = `${API_ORIGIN}/forum`;
const POST_API = `${API_ORIGIN}/post`;
const SEARCH_API = `${API_ORIGIN}/search`;

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
            console.log(reason);
        });
};

getPostsFromForum({}).then(posts => {
    console.log(posts[0].length);
})
