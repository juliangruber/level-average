var MemDB = require('memdb');
var SubLevel = require('level-sublevel');
var Avg = require('..');
var test = require('tape');

test('push', function(t) {
  t.plan(2);
  var db = SubLevel(MemDB());
  var avg = Avg(db);

  avg.push('rating', 2).push('rating', 4);

  var got = false;
  avg.reduced.on('reduce', function(key, value) {
    value = JSON.parse(value);
    if (value.mean == 3 && !got) {
      got = true;
      avg.get('rating', function(err, value) {
        t.error(err);
        t.equal(value, 3);
      });
    }
  });
});