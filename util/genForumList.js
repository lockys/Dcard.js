const api = require('../lib/dcard');
const fs = require('fs');

api.forums.listForum().then((res) => {
  console.log(res);
  let forums = [];
  for (ele in res) {
    let forum = {
      alias: res[ele].alias,
      name: res[ele].name,
      subcategories: res[ele].subcategories,
    };
    forums.push(forum);
  }

  const forumList = JSON.stringify(forums, null, 4);
  fs.writeFile('./asset/forumList.json', forumList, 'utf-8', function (err) {
    console.log(err);
  });
});
