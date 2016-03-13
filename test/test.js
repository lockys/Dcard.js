import { expect } from 'chai';

import { getPostsFromForum, getPostById, getSearchResult } from '../lib/dcard'

// some testing test code.

describe('get post from forum', () => {

    it ('should get a list of 20 posts when no arguments specified', () =>
        getPostsFromForum({
            // no arguments
        }).then((posts) => {
            expect(posts).to.have.length(20);
        })
    );

    it ('should get a list of 40 posts when pageTo - pageFrom === 1', () =>
        getPostsFromForum({
            pageFrom: 1,
            pageTo: 2
        }).then(posts => {
            expect(posts).to.have.length(40)
        })
    );

});
