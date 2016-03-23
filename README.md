dcard.js
==
**Current State**  
dcard.js is now being re-implemented in ES6 by our collaborator, [@kevin940726](https://github.com/kevin940726) on [`refactor-branch`](https://github.com/lockys/dcard.js/tree/refactor-branch).  
It includes new features such as login, get today's card ... etc.  
if you want to install this version of `dcard.js`
```sh
$ npm i dcard@next
```

https://www.npmjs.com/package/dcard  
A simple Dcard API wrapper for NodeJS.  
dcard.js helps you retrieve data of posts from Dcard easily.  
`dcard.js` is **alpha** for now.  
if you meet some errors, please update to latest version and file an issue.    
Sorry for inconvenience.

Install
==
![npm info](https://nodei.co/npm/dcard.png?downloads=true)  

```
$ npm install dcard
```
Features
==
- Get an array of posts information of Dcard by forum name and page number of a forum  
- Get an array of hot posts information ID of Dcard by forum name and page number of forum  
- Get posts title and content of Dcard by a specified ID.
- Get an array of global hot posts information of Dcard by page number
- Get an array of posts content of Dcard by a given page number and forum.  
- Search keyword in a specified forum.

How to Use?
==
**1. Get an array of information of hot posts by given page number**

```javascript
var Dcard = require('dcard');
var dcard = new Dcard();

/**
 * Get Dcard Hot Posts ID by forum page number
 * @param {Number} forum page number
 * @return {Arr} arr[index].id, arr[index].likeCount, arr[index].comment, arr[index].gender, arr[index].department, arr[index].title, arr[index].content, arr[index].school, arr[index].createdAt, arr[index].updatedAt, arr[index].forumName, arr[index].rawObject(original object from Dcard)
 */

dcard.getHotPostId(2, function(err, postArr) {
  if (!err) {
    for (var i = 0, len = postArr.length; i < len; i++) {
      console.log('[Title] ' + postArr[i].title + ', [gender] ' + postArr[i].gender + ', [school] ' + postArr[i].school + ', [department] ' + postArr[i].department);
    }
  } else {
    console.log(err);
  }
});
```

**2. Get full information of a post by a post ID**

```javascript
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
**3. Get an array of information of posts by forum name and given page number**

```javascript
var DcardJS = require('dcard');
var dcard = new DcardJS();

/**
 * Get Dcard Posts ID by forum name and forum page number
 * @param {String} forum name
 * @param {Number} forum page number
 * @return {Arr} arr[index].id, arr[index].likeCount, arr[index].comment, arr[index].gender, arr[index].department, arr[index].title, arr[index].content, arr[index].school, arr[index].createdAt, arr[index].updatedAt, arr[index].forumName, arr[index].rawObject(original object from Dcard)
 */

dcard.getPostIdByForum ('funny', 4, function(err, postArr) {
  if (!err) {
    for (var i = 0, len = postArr.length; i < len; i++) {
      console.log('[Title] ' + postArr[i].title + ', [gender] ' + postArr[i].gender + ', [school] ' + postArr[i].school + ', [department] ' + postArr[i].department);
    }
  } else {
    console.log(err);
  }
});

```

**4. Search title of posts with keyword**
```javascript
var Dcard = require('dcard');
var dcard = new Dcard();

/**
 * Search Dcard Posts
 * @param {String} keyword: query keyword
 * @param {String} forumName: forum name
 * @param {String} school: author's school
 * @return {Array} Post object array in ascending order of time post created.
 */
dcard.search('閃光', 'all', '清華大學', function(err, postObj) {
  if (!err) {
    // You can use JSON.parse(postObj) to deal with it.
    // check out the postObj with
    // https://www.dcard.tw/api/search?search=閃光&forum_alias=funny&school=清華大學
    console.log(postObj);
  } else {
    console.log(err);
  }
});
```

See more sample code snippets in the [example folder](https://github.com/lockys/DcardJS/tree/master/example).

Simple demo prgorams using dcard.js
==
- [Dcard-Image-Downloader](https://github.com/lockys/Dcard-Image-Downloader)  
  Get images in post of Dcard easily.
- [Dcard-Post-Dumper](https://github.com/lockys/Dcard-Post-Dumper)  
  Dump all post from Dcard into <post-id>.json.

Contribute
==
Feel free to pull request, open issues or give us suggestions to make this project better :-)

Dcard API list
==
Please, see the [Wiki page](https://github.com/lockys/Dcard-Parser/wiki)


Collaborators
==
[lockys](https://github.com/lockys), [John-Lin](https://github.com/John-Lin), [Kai Hao](https://github.com/kevin940726)

LICENSE
==
The MIT License (MIT)

Copyright (c) 2016 Hao-Weo Jeng, Che-Wei Lin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
