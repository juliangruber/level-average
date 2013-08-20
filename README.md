
# level-average

Calculate rolling averages in a LevelDB.

[![testling badge](https://ci.testling.com/juliangruber/level-average.png)](https://ci.testling.com/juliangruber/level-average)

[![build status](https://secure.travis-ci.org/juliangruber/level-average.png)](http://travis-ci.org/juliangruber/level-average)

## Example

Store and retrieve rating information:

```js
var level = require('level');
var sub = require('level-sublevel');
var Avg = require('level-average');

var db = sub(level(__dirname + '/db'));
var averages = Avg(db);

averages.push('rating', 2).push('rating', 4);

// then, later on:
averages.get('rating', function(err, value) {
  console.log('rating: %s', value);
  // => rating: 3
});
```

## API

### Averages(db)

Create a new averages db. Make sure your db has been given the powers of [level-sublevel](https://github.com/dominictarr/level-sublevel).

### Averages#push(prefix[, id], weight[, fn])

Push `weight` onto the average for `prefix`.

Through `id` you can make some weights overwrite others. Say you let users rate articles in your site, you only would want each user's rating to count one. So, when you use the user's id as `id`, her rating will only count once.

### Averages#get(prefix, fn)

Get the current average for `prefix`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install level-average
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
