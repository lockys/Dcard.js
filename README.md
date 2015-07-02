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
```
$ npm install dcard
```
Description
===========
Simple data retriever of Dcard for nodeJS  
dcardJS makes you retrieve data from Dcard easily.  

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
 */
dcard.getContentByPostID(328484, function(err, post) {
  if (!err) {
    console.log('Title: ' + post.title);
    console.log('Content: ' + post.content);
    console.log('POST URL: ' + post.url);
  }
});

```
See more Example code in the example folder.

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
