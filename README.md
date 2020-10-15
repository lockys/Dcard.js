# Dcard.js

https://www.npmjs.com/package/dcard  
`Dcard.js` 是一個給 `Node.js` 開發者的非官方 [Dcard](https://www.dcard.tw) 套件，本套件支援登入、取得文章、抽卡 ... 等諸多功能

[English README](README-en.md)

# 安裝

[![npm version](https://badge.fury.io/js/dcard.svg)](https://badge.fury.io/js/dcard)
```
$ npm install --save dcard
```

# 開始使用

### Import

您可以僅 import 您需要的功能或者 import 整個套件

```js
// es6 (建議)
import { posts, dcard } from "dcard";

// or (import 所有 api)
import * as api from "dcard";

// es5
var api = require("dcard");
```

你可以到 [example](/examples) 看一些簡單的使用範例

# 文件

[完整文件](/docs)  
我們正在完善化我們的文件，如果您有興趣，歡迎加入一同協作！

# 如何貢獻

歡迎大家發 PR 或 Issues，讓本專案更加的完整好用 :)

# 作者

* [Calvin Cheng](https://github.com/lockys) - 專案發起人
* [John-Lin](https://github.com/John-Lin) - 專案發起人
* [Kai Hao](https://github.com/kevin940726) - 感謝他改善了整體架構，讓專案功能更加完整

# LICENSE

The MIT License (MIT)

Copyright (c) 2020 Hao-Wei Jeng, Che-Wei Lin, Kai Hao

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
