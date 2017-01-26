const api = require('../lib/dcard');
const fs = require('fs');
/**
* Login into Dcard using email and password.
* The Accessibiliy function here should be required to login in.
*/
api.sessions.createSession({ email: process.env.EMAIL, password: process.env.PWD }).then((res) => {

  // get today's dcard of the account you login in.
  api.dcard.getDcard().then((res) => {
    console.log(res);
  });

  // sent invitation to others.
  const message = { firstMessage: 'Hello!' };
  api.dcard.acceptDcard(message).then((res) => {
    console.log(res);
  });

  // the current status of your Dcard now.
  api.dcard.getDcardStatus(message).then((res) => {
    console.log(res);
  });
});

/**
* These functions are open API without login.
* See asset/forumList.json to get forum alias
*/
const postOpt = {
  forum: 'vehicle',
  popular: false,
  before: 225687456,
};
api.posts.listPost(postOpt).then((res) => {
  console.log(res);
});
