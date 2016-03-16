/* global describe, it, beforeEach */
import { expect } from 'chai';
import nock from 'nock';
import { popularAllPosts, popularAllPostsPage2, recentAllPosts, status } from './nockHttpCall';

import * as Dcard from '../lib/dcard';


describe('get post from forum', () => {
    const { getPostsFromForum } = Dcard;

    beforeEach(() => {
        nock("https://www.dcard.tw")
            .get("/api/forum/all/1/popular")
            .reply(200, popularAllPosts, {
                "set-cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;"
            });
        nock("https://www.dcard.tw")
            .get("/api/forum/all/2/popular")
            .reply(200, popularAllPostsPage2, {
                "set-cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;"
            });
        nock("https://www.dcard.tw")
            .get("/api/forum/all/1/")
            .reply(200, recentAllPosts, {
                "set-cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;"
            });
    });


    it('should get a list of most popular of 3 posts when no arguments specified', () => {
        return getPostsFromForum().then((posts) => {
            expect(posts).to.eql(popularAllPosts);
        });
    });

    it('should get a list of most popular posts in 2 page when pageTo - pageFrom === 1', () => {
        return getPostsFromForum({
            pageFrom: 1,
            pageTo: 2
        }).then(posts => {
            expect(posts).to.eql(popularAllPosts.concat(popularAllPostsPage2));
        });
    });

    it('should work when auth = true', () => {
        return getPostsFromForum({
            auth: true
        }).then(posts => {
            expect(posts).to.eql(popularAllPosts);
        });
    });

    it('should work when auth = true and pass with a new client', () => {
        const dc = new Dcard.DcardClient();
        return getPostsFromForum({
            auth: true,
            client: dc
        }).then(posts => {
            expect(posts).to.eql(popularAllPosts);
        });
    });

    it('should return a list of posts orderBy create time when passing recent', () => {
        return getPostsFromForum({
            orderBy: "recent"
        }).then(posts => {
            expect(posts).to.eql(recentAllPosts);
            posts.reduce((prev, cur) => {
                expect(prev.createdAt).to.be.above(cur.createdAt);
                return prev;
            });
        });
    });

});


describe('login to dcard', () => {
    const { login, getStatus } = Dcard;

    beforeEach(() => {
        nock("https://www.dcard.tw")
            .get("/api/member/login")
            .reply(200, '', {
                "set-cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;"
            });
        nock("https://www.dcard.tw", {
                reqheaders: {
                    "cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;",
                    "x-xsrf-token": "R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .post("/api/member/login", {
                user: "user",
                password: "password"
            })
            .reply(200, '', {
                "set-cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;"
            });
    });

    it('should work', () => {
        return login({
            user: "user",
            password: "password"
        }).then(response => {
            expect(response.status).to.equal(200);
        });
    });

    it('should also can get the status of the user', () => {
        nock("https://www.dcard.tw", {
                reqheaders: {
                    "cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;",
                    "x-xsrf-token": "R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4"
                }
            })
            .get("/api/member/status")
            .reply(200, status, {
                "set-cookie": "connect.sid=s%3AeIPvKFZ9H2b41ycC0NdhuQG72d8AUQyn.k9Cc9PD6%2BOdExbDmirjhZ%2BrRKdybbdjb2dmAzdkPyvI;XSRF-TOKEN=R1tyrtYV-M4SQZbVCQG-H_J_TZ5Tyf87thG4;"
            });

        return login({
            user: "user",
            password: "password"
        }).then(() =>
            getStatus()
        ).then(response => {
            expect(response).to.eql(status);
        });
    });

    /* working on it... */
    // it('should get 403 forbidden when the user is not logged in', () => {
    //     const dc = new DcardClient();
    //
    //     nock("https://www.dcard.tw")
    //         .get("/api/member/status")
    //         .reply(403);
    //
    //     return getStatus({
    //         client: dc
    //     }).then(response => {
    //         console.log(response);
    //         expect(response.status).to.equal(403);
    //     });
    // });
});
