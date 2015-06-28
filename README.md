# DcardJS
```
  _____     ______     ______     ______     _____       __     ______
 /\  __-.  /\  ___\   /\  __ \   /\  == \   /\  __-.    /\ \   /\  ___\
 \ \ \/\ \ \ \ \____  \ \  __ \  \ \  __<   \ \ \/\ \  _\_\ \  \ \___  \  
  \ \____-  \ \_____\  \ \_\ \_\  \ \_\ \_\  \ \____- /\_____\  \/\_____\
   \/____/   \/_____/   \/_/\/_/   \/_/ /_/   \/____/ \/_____/   \/_____/

```
Usage
======
```
$ npm install dcardjs
```
Description
===========
Simple data retriever of Dcard for nodeJS  
Alpha edition @ 2015/06/25  
Support:  
Get Dcard Posts ID by forum name and page number of a forum  
Get Dcard Hot Posts ID by forum name and page number of forum  
Get Dcard Posts title and content  
Get global Dcard Hot Posts ID forum page number
Get Dcard Posts by given page number and forum.  


Example:
========
Get Hot Post ID Arr
```
// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('../index');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Hot Posts ID by forum page number
 * @param {Number} forum page number
 * @return {Number} post ID Number
 */

dcardDataGetter.getHotPostId(2, function(err, postIdArr) {
  if (!err) {
    console.log('Hot Post id List: ' + postIdArr);
  } else {
    console.log(err);
  }
});
```
Get content by a Post ID
```
// Demo program for Dcard data retriever.
// Author: John-Lin(https://github.com/John-Lin), lockys(https://github.com/lockys)
// For all forum name refer to:
// https://github.com/lockys/0card/blob/master/dacrdAPI.md#forum-list
var DcardJS = require('../index');
var dcardDataGetter = new DcardJS();

/**
 * Get Dcard Posts title and content
 * @param {Number} post id
 * @return {String} title, content of post.
 */
dcardDataGetter.getContentByPostID(328484, function(err, post) {
  if (!err) {
    console.log('Title: ' + post.title);
    console.log('Content: ' + post.content);
    console.log('POST URL: ' + post.url);
  } else {
    console.log(err);
  }
});

```
See more Example code in the example folder.

Dcard API list
==============
Please, see the [Wiki page](https://github.com/lockys/Dcard-Parser/wiki)


Contributors
============
[lockys](https://github.com/lockys)、
[John-Lin](https://github.com/John-Lin)
