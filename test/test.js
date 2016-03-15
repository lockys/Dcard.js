/* global describe, it */
import { expect } from 'chai';
import nock from 'nock';
import { popularAllPosts, popularAllPostsPage2 } from './nockHttpCall';

import * as Dcard from '../lib/dcard';


describe('get post from forum', function() {
    const { getPostsFromForum } = Dcard;

    nock("https://www.dcard.tw")
        .get("/api/forum/all/1/popular")
        .times(2)
        .reply(200, popularAllPosts);
    nock("https://www.dcard.tw")
        .get("/api/forum/all/2/popular")
        .reply(200, popularAllPostsPage2);

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

    /*
        Auth doens't work with nock, why?
    */

    // it('should work when auth = true', () => {
    //     return getPostsFromForum({
    //         auth: true
    //     }).then(posts => {
    //         expect(posts).to.eql(popularAllPosts);
    //     });
    // });

    // it('should work when auth = true and pass with a new client', (done) => {
    //     const dc = new Dcard.DcardClient();
    //     return getPostsFromForum({
    //         auth: true,
    //         client: dc
    //     }).then(posts => {
    //         expect(posts).to.have.length(20);
    //         done();
    //     });
    // });

    // it('should return a list of posts orderBy likeCount when passing popular', () => {
    //     return getPostsFromForum({
    //         orderBy: "recent"
    //     }).then(posts => {
    //         posts.reduce((cur, next) => {
    //             expect(cur.likeCount).to.be.above(next.likeCount);
    //             return cur;
    //         });
    //     });
    // });

});
