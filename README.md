dcard.js
==
https://www.npmjs.com/package/dcard  
`dcard.js` is a unofficial API wrapper of [Dcard](https://www.dcard.tw) for developer.  
It supports login, get posts, get card of a account ...etc.

Installation
==
![npm info](https://nodei.co/npm/dcard.png?downloads=true)  

```
$ npm install --save dcard
```

Usage
==
### Import
Import the method you need or import the whole package.
```js
// es6 (recommended)
import { posts, dcard } from 'dcard';

// or import them all
import * as api from 'dcard';

// es5
var api = require('dcard');
```
You can refer to [example](/examples) for the simple example to get started quickly.

Documentations
==
Check out the full [documentation page](/docs), but the doc is still in building.

Contributions
==
Feel free to pull request, open issues or give us suggestions to make this project better :-)

Authors
==
- [lockys](https://github.com/lockys)  
- [John-Lin](https://github.com/John-Lin)
- [Kai Hao](https://github.com/kevin940726)

LICENSE
==
The MIT License (MIT)

Copyright (c) 2016 Hao-Wei Jeng, Che-Wei Lin, Kai Hao

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
