dcard.js
==
https://www.npmjs.com/package/dcard  
Simple a Dcard API wrapper for NodeJS.  
dcard.js helps you retrieve post data from Dcard easily.  
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
// es6
import { getPostIdByForum } from 'dcard';
// es5
var getPostIdByForum = require('dcard').getPostIdByForum;

getPostIdByForum({
    forum: "all",
    pageFrom: "1",
    pageTo: "1",
    orderBy: "popular"
}).then(posts => {
    console.log(posts);
});
```

**2. Get full information of a post by a post ID**

```javascript
import { getPostById } from 'dcard';

getPostById(id).then(content => {
    console.log(content);
})
```

**3. Search title of posts with keyword**
```javascript
import { getSearchResult } from 'dcard';

getSearchResult({
    query: "閃光",
    forumAlias: "all",
    school: ""
}).then(posts => {
    console.log(posts);
})
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
[lockys](https://github.com/lockys), [John-Lin](https://github.com/John-Lin),
[Kai Hao](https://github.com/kevin940726)

LICENSE
==
The MIT License (MIT)

Copyright (c) 2015 Hao-Weo Jeng, Che-Wei Lin

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
