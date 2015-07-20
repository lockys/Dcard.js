# DcardJS
```
  _____     ______     ______     ______     _____       __     ______
 /\  __-.  /\  ___\   /\  __ \   /\  == \   /\  __-.    /\ \   /\  ___\
 \ \ \/\ \ \ \ \____  \ \  __ \  \ \  __<   \ \ \/\ \  _\_\ \  \ \___  \  
  \ \____-  \ \_____\  \ \_\ \_\  \ \_\ \_\  \ \____- /\_____\  \/\_____\
   \/____/   \/_____/   \/_/\/_/   \/_/ /_/   \/____/ \/_____/   \/_____/

```
Install
======
![npm info](https://nodei.co/npm/dcard.png?downloads=true)

```
$ npm install dcard
```
Description
===========
An Dcard API wrapper for node.
DcardJS helps you retrieve post data from Dcard easily.  

**Supported features:**  
- Get posts ID of Dcard by forum name and page number of a forum  
- Get hot posts ID of Dcard by forum name and page number of forum  
- Get posts title and content of Dcard by a specified ID.
- Get global hot posts ID of Dcard by page number
- Get a list of posts of Dcard by a given page number and forum.  


How to Use?
========
Get Hot Post ID Array
```
var Dcard = require('dcard');
var dcard = new Dcard();

/**
 * Get Dcard Hot Posts ID by forum page number
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */

dcard.getHotPostId(2, function(err, postIdArr) {
  if (!err) {
    console.log('Hot Post id List: ' + postIdArr);
  }
});
```

Get an title content by a Post ID

```
var Dcard = require('dcard');
var dcard = new Dcard();

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} title, content of post.
 * @return {object} raw object of a post.
 */
dcard.getContentByPostID(328484, function(err, post) {
  if (!err) {
    console.log('Title: ' + post.title);
    console.log('Content: ' + post.content);
    console.log('POST URL: ' + post.url);
    console.log('Raw Contect Obj ' + post.rawObject);
  }
});

```
Get Post ID List by forum name

```
var DcardJS = require('dcard');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */

dcardDataGetter.getPostIdByForum ('funny', 4, function(err, postIdArr) {
  if (!err) {
    console.log('Post ID Array: ' + postIdArr);
  } else {
    console.log(err);
  }
});

```
Get List of Posts By Forum name and page number  
If you specified the third param. with **HOT_WITH_FORUM**, it will give you a list of hot posts according to given forum and page number.  
If **HOT** is specified, it will give you a list of global hot posts.  
If **DEFAULT** is specified, it will give you a list of latest posts according to given forum and page number.
```
var DcardJS = require('dcard');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Posts title and content
 * @param {Number} page number
 * @param {String} forum name
 * @param {String} HOT, HOT_WITH_FORUM, DEFAULT
 * @return {Array} List of posts, get raw object with post[i].rawObject
 */

dcardDataGetter.getFullPostsByPageNumAndForum(5, 'sex', 'HOT_WITH_FORUM', function(err, postList) {
  if (!err) {
    console.log('[*]' + postList.length + ' posts');
    for (var i = 0, len = postList.length; i < len; i++) {
      console.log(postList[i].title + ', createdAt: ' + postList[i].rawObject.createdAt + ', like:' + postList[i].rawObject.likeCount);
    }
  }else {
    console.log(err);
  }
});
```
See more sample code snippets in the [example folder](https://github.com/lockys/DcardJS/tree/master/example).

A simple demo prgoram using DcardJS
===================================
[Dcard image helper](https://github.com/lockys/Dcard-Image-helper)

Contribute
==============
Feel free to pull request, open issues or give us suggestions to make this project better :-)

Dcard API list
==============
Please, see the [Wiki page](https://github.com/lockys/Dcard-Parser/wiki)


Collaborators
============
[lockys](https://github.com/lockys), [John-Lin](https://github.com/John-Lin)
