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
$ npm install --save dcard@next
```

Usage
==
### Import
Import the method you need or import the whole package.
```js
// es6 (recommended)
import { getAllForum, getTodayDcard } from 'dcard';
// or import them all
import Dcard from 'dcard';
Dcard.getAllForum();

// es5
var Dcard = require('dcard');
Dcard.getAllForum();
```

### Return Value
All the methods will return a es6 **Promise**,
 use promise specific function to get your asynchronous response. See each method for more information.

```js
import { getAllForum } from 'dcard';

getAllForum()
    .then(response => {
        console.log(response);
    });
```

### `DcardClient`:
A class that you can create a new `DcardClient` for authentication usage. There is also a default client named `defaultClient` which is used in every authentication api calls when client is not specified.
```js
import { DcardClient } from 'dcard';

const dc = new DcardClient();

const newClientOptions = {
    auth: true,
    client: dc
};
```

### Authentication
All methods has two optional arguments: `auth` and `client`. When the api call is required for authentication, `auth` will be set to `true` and `client` will be set to `defaultClient`. Otherwise `auth` will be `false` and `client` will not have any usage.

You can always change the two arguments in any methods whenever you like, when `auth` is set to `true`, it will simply wrap any `fetch` call inside the function to pass the cookie data. Passing another client will give you another `fetch` client with independent cookie data.

You should be note that because of the security issue, all the authentication methods will not worked in browser environment. That is, when `auth` is set to true, the function will only work in server side (node.js) environment.

### `getAllForum()`:
Get all dcard current forum.

### `getPostsFromForum(options)`:
Get posts from specific forum. options and their default values are as follow.

* `forum`: **"all"**. forum name, get from `getAllForum()`.
* `pageFrom`: **1**. fetch from page...
* `pageTo`: **1**. to page.
* `orderBy`: **"popular"**. order by "popular" or "recent".
* `auth`: **false**.
* `client`: **defaultClient**.

### `getPostById(options)`:
Get post content by post id from `getPostsFromForum`, the `options` has only one required argument `postId`.

### `getSearchResult(options)`:
Search Dcard's posts and get the result. the options are as followed.
* `query`: **required**. The search query keyword.
* `forumAlias`: **"all"**. Forum name get from `getAllForum`.
* `school`: _optional_. Search by school name.

### `login(options)`: _auth_
Login to your Dcard's account with the specified DcardClient.
* `user`: **required**. Your email account.
* `password`: **required**. Your password.

### `getStatus()`: _auth_
Get the current status of your account or client.

### `getTodayDcard()`: _auth_
Get your Dcard today.

### `getNotification()`: _auth_
Get your mail message notification.

### `getNotifications(options)`: _auth_
Get your notifications of posts. The options are as followed.
* `number`: **6**. How many notifications get for a time.
* `lastId`: _optional_. Specify last-seen notification id here to continue fetch notifications.

### `getFriends()`: _auth_
Get all your friends list.

---

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
