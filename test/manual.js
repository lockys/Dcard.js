import * as Dcard from '../src/dcard';

Dcard.getAllForum()
  .then(res => {
    res.map(forum => forum.alias)
      .forEach(console.log);
  });

// Dcard.getPostsFromForum()
//   .then(res => {
//     console.log(res.slice(0, 10));
//   });
